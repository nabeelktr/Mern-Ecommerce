import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    orderId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Order',
    },
    messages: [
        {
            sender: {
                type: String,
            },
            text: {
                type: String,
            },
            createdAt: {
                type: Date,
                default: Date.now(),
            },
        }
    ]
});

export const Chat = mongoose.model('Chat', chatSchema)
