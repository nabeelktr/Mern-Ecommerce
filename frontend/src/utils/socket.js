import  io  from "socket.io-client";
import { base_URL } from "./constants";

let socket;

const connectSocket = () => {
    socket = io(base_URL)
};

export {socket, connectSocket}