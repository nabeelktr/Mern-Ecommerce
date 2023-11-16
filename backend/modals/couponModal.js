import mongoose from "mongoose";

const couponSchema = mongoose.Schema({
    couponCode: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    percentage: {
        type: Number,
        required: true,
    },
    expiry: {
        type: Date,
        required: true,
    },
    minRate: {
        type: Number,
        required: true,
    },
    maxRate: {
        type: Number,
        required: true,
    },
    usedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
}
)
couponSchema.index({ expiry: 1 }, { expireAfterSeconds: 0 });

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;
