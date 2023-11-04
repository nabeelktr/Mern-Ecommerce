import AsyncHandler from 'express-async-handler'

import Order from '../modals/orderModal.js';
import Cart from '../modals/CartModal.js';


const placeOrder = AsyncHandler(async(req,res) => {
    const orderDetails = req.body.orderDetails
    const order = await Order.create({
        userId: req.user._id,
        items: orderDetails.items,
        totalPrice: orderDetails.totalPrice,
        totalOfferPrice: orderDetails.totalOfferPrice,
        shippingAddress: orderDetails.shippingAddress,
        paymentMethod: req.body.paymentMode,
        createdAt: Date.now(),
    });
    
    if (order) {
        await Cart.deleteOne({ _id: orderDetails.cartId });
        res.status(201).json({msg: 'Order Placed'})
    }else{
        res.status(402)
        throw new Error('order placing error')
    }
});

export { placeOrder }
