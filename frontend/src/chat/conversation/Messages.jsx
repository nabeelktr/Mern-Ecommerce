import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ChatHead from "./ChatHead";
import SendBox from "./SendBox";



const Messages = ({ isAdmin }) => {
    const [messages, setmessages] = useState([]);
  const chatId = useSelector((state) => state.chatId.chatId);
  const user = useSelector((state) => state.orderId)
  const socket = useSelector((state) => state.socket.socket);

  const scrollBoxRef = useRef();

  const handleSubmit = (input) => {
    
    socket.emit("new_chat", {
      sender: isAdmin ? "admin" : "user",
      text: input,
      chatId: chatId,
    });

  };

  const fetchdata = async () => {
    socket.emit('history', chatId);
    socket.on('updatedMessage', (info) => {
      if(info.id === chatId){
        setmessages(info.datas.messages)
      }
    })
  };

  useEffect(() => {
    fetchdata();
  }, [chatId]);

  useEffect(() => {
    if (scrollBoxRef.current) {
      scrollBoxRef.current.scrollTop = scrollBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (

    <div className="md:w-[50rem] w-[100vw] border-r">
    <div  className="h-[100vh]">
      <ChatHead name={isAdmin ? user.username : 'Seller'}  orderId={user.orderId} />
      <div className=" flex-grow overflow-scroll no-scrollbar bg-[#F0F4FA]" ref={scrollBoxRef} 
      style={{ height: `${isAdmin ? '73vh' : 'calc(71vh)' }`, backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")' }} >
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