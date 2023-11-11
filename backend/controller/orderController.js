import AsyncHandler from 'express-async-handler'
import crypto from "crypto";
import Order from '../modals/orderModal.js';
import Cart from '../modals/CartModal.js';
import Product from '../modals/productModal.js';
import { instance } from '../config/razorPay.js';


const placeOrder = AsyncHandler(async(req,res) => {
    const orderDetails = req.body.orderDetails;
    updateProductQty(orderDetails);
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
        res.status(201).json({msg: 'Order Placed'})
    }else{
        res.status(402)
        throw new Error('order placing error')
    }
});

const updateProductQty = async(orderDetails) => {
    for (const item of orderDetails.items){
    const product = await Product.findById(item.productId)
    if (product){
        const variant = product.variants.find((v) => v.size === item.size);
        if (variant){
            variant.qty -= item.qty;
        }else{
            throw new Error(`variant not found for the size ${item.qty}`)
        }
        await product.save();
    }else{
        throw new Error(`product not found for the id ${item.productId}`)
    }
  }
};

const getOrders = AsyncHandler(async(req,res) => {
    const orders = await Order.find();
    if(orders){
        res.status(201).json(orders);
    }else{
        res.status(404)
        throw new Error('No orders found')
    }
});

const getUserOrders = AsyncHandler(async(req,res) => {
    const orders = await Order.find({userId: req.user._id}).sort({createdAt: -1});
    if(orders){
        res.status(201).json(orders);
    }else{
        res.status(404)
        throw new Error('No orders found')
    }
});

const changeOrderStatus = AsyncHandler(async(req,res) => {
    const resp = await Order.findByIdAndUpdate(req.body.orderId, {
        status: req.body.option,
    });
    if(resp){
        res.status(201).json({msg: 'status updtd'})
    }else{
        res.status(404)
        throw new Error('invalid error')
    }
});

const checkout = AsyncHandler(async(req,res) => {
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
      updateProductQty(orderDetails);
      await Cart.deleteOne({ _id: orderDetails.cartId });
        
    
  
      res.status(201)
      .json({razorpay_payment_id})
    } else {
      res.status(400).json({
        success: false,
      });
    }
  });

export { placeOrder, getOrders, changeOrderStatus, getUserOrders, checkout, paymentVerification }
