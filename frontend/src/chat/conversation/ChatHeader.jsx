import { PhoneIcon, VideoCameraIcon } from '@heroicons/react/24/solid';
import { Avatar, Badge, Box, Divider, IconButton, Stack, Typography, styled } from '@mui/material';

const StyledBadge = styled(Badge)(() => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px `,
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



const ChatHeader = ({name, orderId}) => {
  return (
    <>
      <Box
        p={2}

        sx={{
          backgroundColor: "#F8FAFF",
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Stack
          alignItems={"center"}
          direction={"row"}
          sx={{ width: "100%", height: "100%" }}
          justifyContent="space-between"
        >
          <Stack
            spacing={2}
            direction="row"
          >
            <Box>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot"
              >
                <Avatar
                  src='https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg'
                />
              </StyledBadge>
            </Box>
            <Stack spacing={0.2}>
              <Typography variant="subtitle2">
                {name}
              </Typography>
              <Typography variant="caption">{orderId}</Typography>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            alignItems="center"
            spacing={3}
          >


            <Divider orientation="vertical" flexItem />
            <IconButton
              id="conversation-positioned-button"
              aria-controls={ undefined }
              aria-haspopup="true"
              aria-expanded={ undefined}
            >
              {/* <CaretDown /> */}
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      
    </>
  )
}

export default ChatHeader