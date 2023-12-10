
import { Server } from "socket.io";
import { Chat } from "../modals/chatModal.js";


let onlineUsers = [];
const socket = (httpServer) => {

    const io = new Server(httpServer, {
        pingTimeout: 60000,
        cors: {
            origin: process.env.CORS_ORIGIN,
            credentials: true,
        },
    });

    io.on("connection", async (socket) => {
        console.log(JSON.stringify(socket.handshake.query));
        console.log(`User connected ${socket.id}`);


        socket.on('new_chat', async (data) => {
            const datas = await Chat.findByIdAndUpdate(data.chatId,
                {
                    $push: { messages: { sender: data.sender, text: data.text } },
                },
                { new: true }
            )
            const info = {id: data.chatId, datas}
            io.emit('updatedMessage', info);
            //io.emit('notification', info)
            
        })

        socket.on('history', async (id) => {
            const datas = await Chat.findById(id)
            const info = {id, datas}
            io.emit( 'updatedMessage', info)
        })

        socket.on('online', (id) => {
            onlineUsers.push(
                id
                //socketId: socket.id,
            )
        })

        socket.on('isOnline', (data) => {
            const isOnline = onlineUsers.includes(data)
            const info = {isOnline, data}
            io.emit('check', info)
        })
       

        socket.on("end", (data) => {
            const info = {inOnline: false, data}
            onlineUsers = onlineUsers.filter((user) => user !== data);
            io.emit('check', info)
            console.log("closing connection");
            socket.disconnect(0);
        });
    });
}


export default socket;
