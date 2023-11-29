import AsyncHandler from 'express-async-handler'
import crypto from "crypto";
import Order from '../modals/orderModal.js';
import Cart from '../modals/cartModal.js';
import Product from '../modals/productModal.js';
import { instance } from '../config/razorPay.js';
import Coupon from '../modals/couponModal.js';
import Wallet from '../modals/walletModal.js';


const placeOrder = AsyncHandler(async (req, res) => {
    const orderDetails = req.body.orderDetails;
    if (req.body.paymentMode === 'Wallet') {
        const wallet = await Wallet.findOne({ userId: req.user._id });

        if (orderDetails.totalOfferPrice <= wallet.balance) {
            wallet.balance -= orderDetails.totalOfferPrice;
            wallet.transactions.push({
                date: Date.now(),
                status: 'Debited',
                amount: orderDetails.totalOfferPrice,
            })
            await wallet.save();
        } else {
            res.status(403)
            throw new Error('Not enough amount')
        }
    }
    try {
        await updateProductQty(orderDetails, req.user._id);
    } catch {
        res.status(403);
        throw new Error('out of stock');
    }
    if (req.body.wallet) { updateWallet(req.body.wallet, req.user._id); }

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
        coupon: orderDetails.coupon,
        wallet: req.body.wallet,
    });

    if (order) {
        await Cart.deleteOne({ _id: orderDetails.cartId });
        res.status(201).json({ msg: 'Order Placed' })
    } else {
        res.status(402)
        throw new Error('order placing error')
    }
});

const updateWallet = async (walletAmount, userId) => {
    const wallet = await Wallet.findOne({ userId: userId })
    wallet.balance -= walletAmount;
    wallet.transactions.push({
        date: Date.now(),
        status: 'Debited',
        amount: walletAmount,
    })
    await wallet.save();
};

const updateProductQty = async (orderDetails, userId) => {

    try {
        for (const item of orderDetails.items) {
            const product = await Product.findById(item.productId);
            if (product) {
                const variant = product.variants.find((v) => v.size === item.size);
                if (variant && variant.qty >= item.qty) {
                    variant.qty -= item.qty;
                } else {
                    throw new Error(`Variant not found or quantity is insufficient for size ${item.size}`);
                }
                await product.save();
            } else {
                throw new Error(`Product not found for the id ${item.productId}`);
            }
        }

        if (orderDetails.coupon) {
            const updated = await Coupon.findByIdAndUpdate(orderDetails.coupon.couponId, {
                $addToSet: { usedBy: userId }
            }, { new: true });
        }

    } catch (error) {
        console.error(error);
        throw new Error('Failed to update product quantity');
    }
};

const getOrders = AsyncHandler(async (req, res) => {
    const orders = await Order.find().sort({ createdAt: -1 });
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
        updatedAt: Date.now(),
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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderDetails, wallet } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest("hex");
    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        try {
            await updateProductQty(orderDetails, req.user._id);

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
                coupon: orderDetails.coupon,
                wallet: wallet,
            });
            if (req.body.wallet) { updateWallet(wallet, req.user._id); }
            await Cart.deleteOne({ _id: orderDetails.cartId });
        } catch {
            res.status(403).json({
                razorpay_payment_id,
                error: 'Insufficient quantity for one or more items',
            });
            throw new Error('Insufficient quantity for one or more items')
        }
        res.status(201).json({ razorpay_payment_id });

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
    const { id, userID } = req.body;
    const userId = userID || req.user._id;
    if (id) {
        const order = await Order.findById(id);
        if (order.paymentMethod === 'RazorPay' || order.paymentMethod === 'Wallet') {
            const transaction = {
                date: Date.now(),
                status: 'Credited',
                amount: order.wallet ? (order.totalOfferPrice + order.wallet) : order.totalOfferPrice,
            }
            const wallet = await Wallet.findOne({ userId: userId });
            if (wallet) {
                wallet.balance = wallet.balance + (order.wallet ? (order.totalOfferPrice + order.wallet) : order.totalOfferPrice),
                    wallet.transactions.push(transaction);
                await wallet.save()
            }
            else {
                await Wallet.create({
                    userId: userId,
                    balance: order.wallet ? (order.totalOfferPrice + order.wallet) : order.totalOfferPrice,
                    transactions: transaction,
                })
            }
        }
        await IncProductQty(order);
        order.status = 'Cancelled';
        await order.save();
        res.status(201).json({ success: true });
    } else {
        res.status(402);
        throw new Error('invalid error');
    }
});

const IncProductQty = async (orderDetails) => {

    try {
        for (const item of orderDetails.items) {
            const product = await Product.findById(item.productId);
            if (product) {
                const variant = product.variants.find((v) => v.size === item.size);
                if (variant) {
                    variant.qty += item.qty;
                } else {
                    throw new Error(`Variant not found for the size ${item.size}`);
                }
                await product.save();
            } else {
                throw new Error(`Product not found for the id ${item.productId}`);
            }
        }
    } catch (error) {
        throw new Error('Failed to update product quantity');
    }
};

const getUserOrder = AsyncHandler(async (req, res) => {
    if (req.params.id) {
        const order = await Order.findById(req.params.id);
        res.status(201).json(order)
    } else {
        res.status(402)
        throw new Error('invalid error')
    }
})



export { placeOrder, getOrders, changeOrderStatus, getUserOrders, checkout, paymentVerification, salesReport, checkCoupon, cancelOrder, getUserOrder }
