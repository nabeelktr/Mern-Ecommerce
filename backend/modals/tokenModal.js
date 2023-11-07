import mongoose from "mongoose";

const userTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 10 * 86400,
    }
})

const RefreshToken = mongoose.model('RefreshToken', userTokenSchema);

export default RefreshToken;