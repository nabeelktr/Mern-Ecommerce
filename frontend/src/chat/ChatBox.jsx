import { Badge, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChatId } from "../redux/features/chatIdSlice";
import { setOrderId } from "../redux/features/orderIdSlice";
import { toast } from "sonner";

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const ChatBox = ({ chat, isAdmin, socket }) => {
console.log(chat);
  const [isOnline, setisOnline] = useState(false);
  const dispatch = useDispatch();
  const handleOrderId = () => {
    dispatch(setChatId({ chatId: chat.chatId }));
    dispatch(
      setOrderId({ orderId: chat.orderId.orderId, username: chat.userId.name })
    );
  };

  const fetchdata = () => {
    socket.emit("isOnline", chat.userId?._id);
  };


  useEffect(() => {
    fetchdata();

    socket.on("check", (data) => {
      if (data.data === chat.userId._id) setisOnline(data.isOnline);
    });
  }, []);

  return (
    <div
      className="rounded-lg bg-white md:p-2 p-1 cursor-pointer md:w-[25rem] "
      onClick={handleOrderId}
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-row space-x-2">
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant={isOnline ? "dot" : "standard"}
          >
            <img
              src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
              className="md:h-14 h-12 md:w-14 w-12 relative"
            />
          </StyledBadge>
        </div>
        <div className="space-x-1 flex-1 border-b ml-2">
          <span className="md:text-sm text-[0.7rem] font-semibold">
            {isAdmin ? chat.userId?.name : "Seller"}
          </span>
          <div className="truncate text-[0.6rem] md:text-xs pb-2">
            <span className="">Order ID:</span> {chat.orderId?.orderId}
          </div>
        </div>

        <div className="items-center space-y-2 pb-4 justify-between font-medium flex flex-col border-b">
          <span
            sx={{ fontWeight: 400 }}
            className="text-[0.6rem] md:text-xs font-light"
          >
            12:10
          </span>

          <Badge className="unread-count" color="primary" badgeContent={"3"} />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
