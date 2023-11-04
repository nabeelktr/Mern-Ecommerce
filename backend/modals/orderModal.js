import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    userId: {
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
    }

},
    {
        timeStamp: true
    }
)

const Order = mongoose.model('Order',orderSchema);

export default Order;
