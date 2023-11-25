import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ChatElement from "./Chatelement";
import Axios from "../axiosInterceptors/userAxios";
import AxiosAdmin from "../axiosInterceptors/axios";

const Chats = ({isAdmin}) => {
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
    <div className="h-screen w-[1/6]">
      <Box
        sx={{
          position: "relative",
          height: "100%",
          backgroundColor: "#F8FAFF",
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
        
      >
        <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
          <Stack
            alignItems={"center"}
            justifyContent="space-between"
            direction="row"
          >
            <Typography variant="h5">Chats</Typography>
          </Stack>

          <Stack
            sx={{
              flexGrow: 1,
              overflow: "scroll",
              height: "100%",
              paddingBottom: "50px",
            }}
          >
            <Stack spacing={2.4}>
              <Typography variant="subtitle2" sx={{ color: "#676667" }}>
                All Chats
              </Typography>
              {chats && chats.map((chat, i) => (
                <ChatElement chat={chat} isAdmin={isAdmin} key={i} />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

export default Chats;
