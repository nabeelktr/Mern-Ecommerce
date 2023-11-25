import React from "react";
import Navbar from "../../components/user/Navbar";
import Chats from "../../chat/Chats";
import Conversation from "../../chat/conversation/Conversation";
import { useSelector } from "react-redux";

const UserChat = () => {
  const chatId = useSelector((state) => state.chatId.chatId)
  return (
    <>
      <Navbar />
      <div className="flex fixed mt-20 h-[51rem]">
        <Chats />
        {chatId && 
        <Conversation />
        }
      </div>
    </>
  );
};

export default UserChat;
