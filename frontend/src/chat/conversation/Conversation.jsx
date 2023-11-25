import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import Footer from "./Footer";
import { Socket, io } from "socket.io-client";
import { base_URL } from "../../utils/constants";
import { useSelector } from "react-redux";
import AxiosAdmin from "../../axiosInterceptors/axios";
import Axios from "../../axiosInterceptors/userAxios";

const TextMsg = ({ incoming, message }) => {
  return (
    <Stack
      direction="row"
      justifyContent={incoming ? "start" : "end"}
      padding={0.5}
    >
      <Box
        px={1.5}
        py={1.5}
        sx={{
          backgroundColor: incoming ? "#fff" : "#008EFF",
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Typography variant="body2" color={incoming ? "black" : "#fff"}>
          {message}
        </Typography>
      </Box>
    </Stack>
  );
};

const Conversation = ({ isAdmin }) => {
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
    <div className="w-[50%]">
      <div  >
        <ChatHeader name={isAdmin ? user.username : 'Seller'}  orderId={user.orderId} />
        <Box
          height={600}
          ref={scrollBoxRef}
          sx={{
            position: "relative",
            flexGrow: 1,
            overflow: "scroll",
            backgroundColor: "#F0F4FA",
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
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
        </Box>

        <Footer handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Conversation;
