import React, { useEffect } from "react";
import AdminNav from "../../components/admin/AdminNav";
import { useDispatch, useSelector } from "react-redux";
import AllChats from "../../chat/AllChats";
import Messages from "../../chat/conversation/Messages";
import { Toaster } from "sonner";
import { setSocket } from "../../redux/features/socketSlice";






const Chat = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const chatId = useSelector((state) => state.chatId.chatId)
  const setsocket =  () => {
     dispatch(setSocket(userId));
  }
  useEffect(() => {
    setsocket()
  },[dispatch])
  return (
    <>
      <Toaster position="top-right" />
      <AdminNav />
      <div className="flex fixed h-[100vh]">
          <AllChats isAdmin={true} />
          {chatId && <Messages isAdmin={true} />}
      </div>
    </>
  );
};

export default Chat;
