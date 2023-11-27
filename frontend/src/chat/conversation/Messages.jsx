import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {  io } from "socket.io-client";
import { base_URL } from "../../utils/constants";
import { useSelector } from "react-redux";
import AxiosAdmin from "../../axiosInterceptors/axios";
import Axios from "../../axiosInterceptors/userAxios";
import ChatHead from "./ChatHead";
import SendBox from "./SendBox";

const Messages = ({ isAdmin }) => {
    const [messages, setmessages] = useState([]);
  const chatId = useSelector((state) => state.chatId.chatId);
  const user = useSelector((state) => state.orderId)
  const [socket, setsocket] = useState();
  const scrollBoxRef = useRef();

  const handleSubmit = (input) => {
    socket.emit("new_chat", {
      sender: isAdmin ? "admin" : "user",
      text: input,
      chatId: chatId,
    });

    socket.on("chat_history", (data) => {
      if (data._id === chatId) {
        setmessages(data.messages);
      }
    });
  };

  const fetchdata = async () => {
    if (isAdmin) {
      const { data } = await AxiosAdmin.get(`/chat/history/${chatId}`);
      setmessages(data.messages);

    } else {
      const { data } = await Axios.get(`/chat/history/${chatId}`);
      setmessages(data.messages);

    }
  };

  useEffect(() => {
    const socket = io(base_URL);
    socket.emit("join_room", { chatId });
    setsocket(socket);
    fetchdata();
    return () => socket.disconnect();
  }, [chatId]);

  useEffect(() => {
    if (scrollBoxRef.current) {
      scrollBoxRef.current.scrollTop = scrollBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (

    <div className="md:w-[50rem] w-[100vw] border-r">
    <div  >
      <ChatHead name={isAdmin ? user.username : 'Seller'}  orderId={user.orderId} />
      <div className=" flex-grow overflow-scroll no-scrollbar bg-[#F0F4FA]" ref={scrollBoxRef} 
      style={{ height: `${isAdmin ? 'calc(85vh - 5rem)' : 'calc(81vh - 5rem)' }`, backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")' }} >
      {messages &&
            (isAdmin
              ? messages.map((msg, i) =>
                  msg.sender === "user" ? (
                    <TextMsg incoming={true} message={msg.text} key={i} />
                  ) : (
                    <TextMsg incoming={false} message={msg.text} key={i} />
                  )
                )
              : messages.map((msg, i) =>
                  msg.sender === "admin" ? (
                    <TextMsg incoming={true} message={msg.text} key={i} />
                  ) : (
                    <TextMsg incoming={false} message={msg.text} key={i} />
                  )
                ))}
      </div>
      <SendBox handleSubmit={handleSubmit} />
    </div>
    </div>
  )
}

const TextMsg = ({ incoming, message }) => {
    return (
      <Stack
        direction="row"
        justifyContent={incoming ? "start" : "end"}
        padding={0.6}
      >
        <Box
          px={1}
          pr={incoming ? 1.5 : 4}
          pl={incoming ? 4 : 1.5}
          py={1}
          sx={{
            backgroundColor: incoming ? "#fff" : "#DCF8C6",
            borderRadius: 1.5,
            width: "max-content",
          }}
        >
          <Typography variant="body2" color={ "black"}>
            {message}
          </Typography>
        </Box>
      </Stack>
    );
  };
  

export default Messages