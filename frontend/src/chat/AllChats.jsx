import { useEffect, useState } from "react";
import Axios from "../axiosInterceptors/userAxios";
import AxiosAdmin from "../axiosInterceptors/axios";
import ChatBox from "./ChatBox";
import { useSelector } from "react-redux";

const AllChats = ({isAdmin}) => {
    const chatId = useSelector((state) => state.chatId.chatId);
    const [chats, setChats] = useState([]);

  const fetchdata = async () => {
    if(isAdmin){
      const { data } = await AxiosAdmin.get("/chat/connections");
    setChats(data);
    }else{
    const { data } = await Axios.get("/chat/connections");
    setChats(data);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <div className="h-screen w-[100vw] md:w-[27rem] font-poppins shadow-lg  md:block" hidden={chatId}>
      <div className="box h-screen ">
        <div className="md:p-3 p-1 h-[100vh]">
          <div className="items-center flex justify-center flex-row text-sm md:text-lg">
            Chats
          </div>
          <div className="flex-grow overflow-y-scroll h-[100%] no-scrollbar" >
            <div className="space-y-3">
              <div className="text-[#676667] border-b md:text-sm text-xs pb-2 md:pb-4">All chats</div>
              {chats &&
                chats.map((chat, i) => (
                  <ChatBox chat={chat} isAdmin={isAdmin} key={i} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllChats;
