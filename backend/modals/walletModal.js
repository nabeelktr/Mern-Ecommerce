import mongoose from "mongoose";

const walletSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    balance: {
        type: Number,
    },
    transactions: {
        type: Array,
    },
})

const Wallet = mongoose.model('Wallet', walletSchema);

export default Wallet;