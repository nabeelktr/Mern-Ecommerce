import React from "react";
import AdminNav from "../../components/admin/AdminNav";
import Conversation from "../../chat/conversation/Conversation";
import Chats from "../../chat/Chats";
import { useSelector } from "react-redux";



const Chat = () => {

  const chatId = useSelector((state) => state.chatId.chatId)

  return (
    <>
      <AdminNav />
      <div className="flex fixed">
          <Chats isAdmin={true} />
          {chatId ? <Conversation isAdmin={true} /> : ''}
      </div>
    </>
  );
};

export default Chat;
