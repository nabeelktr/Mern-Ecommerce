import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    orderId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Order'
    },
    chatId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Chat'
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  });

  export const MessageRequest = mongoose.model("MessageRequest", messageSchema)
