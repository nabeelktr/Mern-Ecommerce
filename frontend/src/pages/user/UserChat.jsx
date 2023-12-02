import React, { useEffect } from "react";
import Navbar from "../../components/user/Navbar";

import { useDispatch, useSelector } from "react-redux";
import AllChats from "../../chat/AllChats";
import Messages from "../../chat/conversation/Messages";
import { Toaster } from "sonner";
import { setSocket, socketEnd } from "../../redux/features/socketSlice";



const UserChat = () => {
  const chatId = useSelector((state) => state.chatId.chatId);
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSocket(userId));
  },[])
  return (
    <>
      <Toaster position="top-right" />
      <Navbar />
      <div className="flex fixed mt-[9vh]">
        <AllChats />
        {chatId && <Messages />}
      </div>
    </>
  );
};

export default UserChat;
