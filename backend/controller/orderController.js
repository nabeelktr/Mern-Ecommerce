import AsyncHandler from 'express-async-handler'

import Order from '../modals/orderModal.js';
import Cart from '../modals/CartModal.js';
import Product from '../modals/productModal.js';


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
})

export { placeOrder, getOrders, changeOrderStatus, getUserOrders }
