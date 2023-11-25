import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import {
  Box,
  TextField,
  styled,
} from "@mui/material";
import React, { useState } from "react";

const StyledInput = styled(TextField)(() => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px !important",
    paddingBottom: "12px !important",
  },
}));

const ChatInput = () => {
  const [value, setValue] = useState();

  return (
    <StyledInput
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      fullWidth
      placeholder="Write a message..."
      variant="filled"
    />
  );
};

const Footer = ({handleSubmit}) => {
  const [input, setinput] = useState('')
  const [value, setValue] = useState();
  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "transparent !important",
      }}
    >
      <Box
        p={2}
        sx={{
          backgroundColor: "#F8FAFF",
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div>
          <div className="flex gap-5 items-center mb-[4rem] ">
            <input type="text" className="h-10 border  p-3 text-sm w-[52rem]" placeholder="Write a message..." 
            value={input}
            onChange={(e) => setinput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(input);
                setinput('');
              }
            }}
            />
            <PaperAirplaneIcon 
            onClick={() => {
              handleSubmit(input)
              setinput('')
            }}
            className="w-8 h-8 text-teal-600 cursor-pointer" />
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default Footer;
