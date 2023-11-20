import mongoose from "mongoose";
import shortid from "shortid";

const orderSchema = mongoose.Schema({
    orderId: {
        type: String,
        default: shortid.generate, 
        unique: true,
    },
    userId: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    items: {
        type: Array,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    totalOfferPrice: {
        type: Number,
        required: true,
    },
    shippingAddress: {
        type: Object,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    razorpay_payment_id: {
        type: String,
    },
    updatedAt: {
        type: Date,
    }

},
    {
        timeStamp: true
    }
)

const Order = mongoose.model('Order',orderSchema);

export default Order;
