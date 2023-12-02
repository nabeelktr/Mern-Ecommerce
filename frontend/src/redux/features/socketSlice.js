import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { base_URL } from "../../utils/constants";

const initialState = {
  socket: null,
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action) => {
      const { payload } = action;
        console.log(payload);
      if (state.socket?.connected) {
        state.socket.close();
      }
      state.socket = io(base_URL);
      state.socket.emit("online", payload);
    },
    socketEnd: (state, action) => {
      if (state.socket && state.socket.connected) {
        state.socket.emit("end", action.payload);
        state.socket.close(); 
      }
    },
  },
});

export const { setSocket, socketEnd } = socketSlice.actions;
export default socketSlice.reducer;
