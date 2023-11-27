import React from "react";
import AdminNav from "../../components/admin/AdminNav";
import { useSelector } from "react-redux";
import AllChats from "../../chat/AllChats";
import Messages from "../../chat/conversation/Messages";



const Chat = () => {

  const chatId = useSelector((state) => state.chatId.chatId)

  return (
    <>
      <AdminNav />
      <div className="flex fixed">
          <AllChats isAdmin={true} />
          {chatId ? <Messages isAdmin={true} /> : ''}
      </div>
    </>
  );
};

export default Chat;
