import mongoose from "mongoose";

const wishListSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }
})

const WishList = mongoose.model('WishList', wishListSchema);

export default WishList
