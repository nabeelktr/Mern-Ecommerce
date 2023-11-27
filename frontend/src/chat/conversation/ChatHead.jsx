import { ArrowLeftIcon, BackspaceIcon, ChevronLeftIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { Badge, styled } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';
import { setChatId } from '../../redux/features/chatIdSlice';

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

const ChatHead = ({name, orderId}) => {
  const dispatch = useDispatch()
  return (
    <div className='bg-white h-[3.5rem] md:h-[5rem] shadow-sm'>
        <div className='items-center flex flex-row w-[100%] h-[100%] justify-between'>
            <div className='flex flex-row space-x-6'>
                <div className='pl-2'> 
                <StyledBadge
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot"
              >
                <img src='https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg' className='md:h-12 h-9 md:w-12 w-9'/>
                </StyledBadge>
                </div>
                <div className='flex flex-col justify-center'>
                    <span className='font-semibold text-sm'>{name}</span>
                    <span className='font-light text-xs md:text-sm'>{orderId}</span>
                </div>
            </div>
            <div className='p-4 flex'>
                <PhoneIcon className='h-5 w-5 text-gray-900 mr-4'/>
                <ChevronLeftIcon className='h-5 w-5 text-gray-900 block md:hidden' onClick={() => dispatch(setChatId(false))} />
            </div>
        </div>
    </div>
  )
}

export default ChatHead