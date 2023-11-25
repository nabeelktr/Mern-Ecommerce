
import { Box, Badge, Stack, Avatar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { setChatId } from "../redux/features/chatIdSlice";
import { setOrderId } from "../redux/features/orderIdSlice";


const truncateText = (string, n) => {
  return string?.length > n ? `${string?.slice(0, n)}...` : string;
};

const StyledChatBox = styled(Box)(() => ({
  "&:hover": {
    cursor: "pointer",
  },
}));

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

const ChatElement = ({chat, isAdmin}) => {
  const dispatch = useDispatch();
 const handleOrderId = () => {
  dispatch(setChatId({chatId: chat.chatId}))
  dispatch(setOrderId({orderId: chat.orderId.orderId, username: chat.userId.name}))
 }
  return (
    <StyledChatBox
      onClick={handleOrderId}
      sx={{
        borderRadius: 1,
        backgroundColor: '#fff'
      }}
      p={2}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={2}>
          {" "}

            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar  src='https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg' />
            </StyledBadge>



          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{isAdmin ?  chat.userId.name : 'Seller' }</Typography>
            <Typography variant="caption"><span className="">Order ID:</span> {truncateText(chat.orderId.orderId, 20)}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems={"center"}>
          <Typography sx={{ fontWeight: 600 }} variant="caption">
            12:10
          </Typography>
          <Badge
            className="unread-count"
            color="primary"
            badgeContent={'3'}
          />
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

export default ChatElement;