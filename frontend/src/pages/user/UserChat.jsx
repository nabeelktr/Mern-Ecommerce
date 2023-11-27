import React from "react";
import Navbar from "../../components/user/Navbar";

import { useSelector } from "react-redux";
import AllChats from "../../chat/AllChats";
import Messages from "../../chat/conversation/Messages";

const UserChat = () => {
  const chatId = useSelector((state) => state.chatId.chatId)
  return (
    <>
      <Navbar />
      <div className="flex fixed mt-20 h-[51rem]">
        <AllChats />
        {chatId && 
        <Messages />
        }
      </div>
    </>
  );
};

export default UserChat;
