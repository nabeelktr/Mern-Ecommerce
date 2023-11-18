import AsyncHandler from 'express-async-handler'
import crypto from "crypto";
import Order from '../modals/orderModal.js';
import Cart from '../modals/CartModal.js';
import Product from '../modals/productModal.js';
import { instance } from '../config/razorPay.js';
import Coupon from '../modals/couponModal.js';
import Wallet from '../modals/walletModal.js';


const placeOrder = AsyncHandler(async (req, res) => {
    const orderDetails = req.body.orderDetails;
    updateProductQty(orderDetails, req.user._id);
    const order = await Order.create({
        userName: req.user.name,
        userId: req.user._id,
        items: orderDetails.items,
        totalPrice: orderDetails.totalPrice,
        totalOfferPrice: orderDetails.totalOfferPrice,
        shippingAddress: orderDetails.shippingAddress,
        paymentMethod: req.body.paymentMode,
        createdAt: Date.now(),
        status: 'Pending',
    });

    if (order) {
        await Cart.deleteOne({ _id: orderDetails.cartId });
        res.status(201).json({ msg: 'Order Placed' })
    } else {
        res.status(402)
        throw new Error('order placing error')
    }
});

const updateProductQty = async (orderDetails, userId) => {
    if (orderDetails.coupon) {

        const updated = await Coupon.findByIdAndUpdate(orderDetails.coupon, {
            $addToSet: { usedBy: userId }
        }, { new: true });

    }
    for (const item of orderDetails.items) {
        const product = await Product.findById(item.productId)
        if (product) {
            const variant = product.variants.find((v) => v.size === item.size);
            if (variant) {
                variant.qty -= item.qty;
            } else {
                throw new Error(`variant not found for the size ${item.qty}`)
            }
            await product.save();
        } else {
            throw new Error(`product not found for the id ${item.productId}`)
        }
    }
};

const getOrders = AsyncHandler(async (req, res) => {
    const orders = await Order.find();
    if (orders) {
        res.status(201).json(orders);
    } else {
        res.status(404)
        throw new Error('No orders found')
    }
});

const getUserOrders = AsyncHandler(async (req, res) => {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    if (orders) {
        res.status(201).json(orders);
    } else {
        res.status(404)
        throw new Error('No orders found')
    }
});

const changeOrderStatus = AsyncHandler(async (req, res) => {
    const resp = await Order.findByIdAndUpdate(req.body?.orderId, {
        status: req.body.option,
    });
    if (resp) {
        res.status(201).json({ msg: 'status updtd' })
    } else {
        res.status(404)
        throw new Error('invalid error')
    }
});

const checkout = AsyncHandler(async (req, res) => {
    const options = {
        amount: Number(req.body.price * 100),
        currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.status(201).json({
        success: true,
        order,
    })
});

const paymentVerification = AsyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderDetails } =
        req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;


    if (isAuthentic) {


        await Order.create({
            userName: req.user.name,
            userId: req.user._id,
            items: orderDetails.items,
            totalPrice: orderDetails.totalPrice,
            totalOfferPrice: orderDetails.totalOfferPrice,
            shippingAddress: orderDetails.shippingAddress,
            paymentMethod: 'RazorPay',
            createdAt: Date.now(),
            status: 'Pending',
            razorpay_payment_id,

        });
        updateProductQty(orderDetails, req.user._id);
        await Cart.deleteOne({ _id: orderDetails.cartId });



        res.status(201)
            .json({ razorpay_payment_id })
    } else {
        res.status(400).json({
            success: false,
        });
    }
});

const salesReport = AsyncHandler(async (req, res) => {
    const { startDate, endDate } = req.body.report;
    const firstDate = new Date(startDate);
    const lastDate = new Date(endDate);
    lastDate.setDate(lastDate.getDate() + 1);
    const orders = await Order.aggregate([
        {
            $match: {
                status: 'Delivered',
                createdAt: {
                    $gte: firstDate,
                    $lt: lastDate,
                },
            }
        },
    ]);

    if (orders) {
        res.status(201).json(orders)
    } else {
        res.status(402)
        throw new Error('invalid error')
    }
});

const checkCoupon = AsyncHandler(async (req, res) => {
    const { code } = req.body.values;
    const { price } = req.body;
    const coupon = await Coupon.aggregate([
        {
            $match: {
                couponCode: code,
                usedBy: { $ne: req.user._id },
                minRate: { $lte: price },
                maxRate: { $gte: price }
            }
        }
    ])

    if (coupon.length) {
        res.status(201).json(coupon)
    } else {
        res.status(402)
        throw new Error('coupon error')
    }
});

const cancelOrder = AsyncHandler(async (req, res) => {
    const { id } = req.body;
    const userId = req.user._id;
    if (id) {
        const order = await Order.findById(id);
        if (order.paymentMethod === 'RazorPay') {
            const transaction = {
                date: Date.now(),
                status: 'Credited',
                amount: order.totalOfferPrice,
            }
            const wallet = await Wallet.findOne({ userId: userId });
            if (wallet) {
                wallet.balance = wallet.balance + order.totalOfferPrice;
                wallet.transactions.push(transaction);
                await wallet.save()
            }
            else {
                await Wallet.create({
                    userId: userId,
                    balance: order.totalOfferPrice,
                    transactions: transaction,
                })
            }
        }
        order.status = 'Cancelled';
        await order.save();
        res.status(201).json({success: true});
    } else {
        res.status(402);
        throw new Error('invalid error');
    }
});



export { placeOrder, getOrders, changeOrderStatus, getUserOrders, checkout, paymentVerification, salesReport, checkCoupon, cancelOrder }
