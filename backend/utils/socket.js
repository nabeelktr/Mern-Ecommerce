
import { Server } from "socket.io";
import User from "../modals/userModal.js";
import { Chat } from "../modals/chatModal.js";



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
        const user_id = socket.handshake.query["user_id"];

        console.log(`User connected ${socket.id}`);

        if (user_id != null && Boolean(user_id)) {
            try {
                User.findByIdAndUpdate(user_id, {
                    socket_id: socket.id,
                    status: "Online",
                });
            } catch (e) {
                console.log(e);
            }
        }

        socket.on('new_chat', async (data) => {
            const datas = await Chat.findByIdAndUpdate(data.chatId,
                {
                    $push: { messages: { sender: data.sender, text: data.text } },
                },
                { new: true }
            )
            const info = {id: data.chatId, datas}
            io.emit('updatedMessage', info);
            
        })

        socket.on('history', async (id) => {
            const datas = await Chat.findById(id)
            const info = {id, datas}
            io.emit( 'updatedMessage', info)
        })

       

        socket.on("end", async (data) => {
            if (data.user_id) {
                await User.findByIdAndUpdate(data.user_id, { status: "Offline" });
            }
            console.log("closing connection");
            socket.disconnect(0);
        });
    });
}


export default socket;
