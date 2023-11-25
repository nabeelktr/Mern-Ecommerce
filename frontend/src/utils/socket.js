import  io  from "socket.io-client";
import { base_URL } from "./constants";

let socket;

const connectSocket = (user_id) => {
    socket = io(base_URL, {
        query: `user_id=${user_id}`
    })
};

export {socket, connectSocket}