import AsyncHandler from 'express-async-handler'
import { MessageRequest } from '../modals/messageModal.js'
import User from '../modals/userModal.js';
import { Chat } from '../modals/chatModal.js';



const getConnections = AsyncHandler(async (req, res) => {
    const isAdmin = await User.findOne({ _id: req.user._id }).select('admin')
    let connection;
    if (isAdmin.admin) {
        connection = await MessageRequest.find()
            .populate({ path: 'userId', select: 'name' })
            .populate({ path: 'orderId', select: 'orderId' })
            .sort({ createdAt: -1 })
    } else {
        connection = await MessageRequest.find({ userId: req.user._id })
            .populate({ path: 'userId', select: 'name' })
            .populate({ path: 'orderId', select: 'orderId' })
            .sort({ createdAt: -1 })
    }
    res.status(201).json(connection.length ? {connection, userId: req.user._id} : false)
});

const createConnection = AsyncHandler(async (req, res) => {
    const isConnection = await MessageRequest.find({ userId: req.user._id, orderId: req.body.id })
    if (!isConnection.length) {
        const data = await Chat.create({
            userId: req.user._id,
            orderId: req.body.id,
            messages: [
                {
                    sender: 'user',
                    text: `Hi Seller`
                }
            ]
        });

        await MessageRequest.create({
            userId: req.user._id,
            orderId: req.body.id,
            chatId: data._id,
        })
    }
    res.status(201).json({ succes: true })
});

const getChatHistory = AsyncHandler(async (req, res) => {
    const chats = await Chat.findById(req.params.id)
    res.status(201).json(chats);
})

export { getConnections, createConnection, getChatHistory }