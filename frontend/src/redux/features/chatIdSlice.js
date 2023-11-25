import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chatId: false,
}

export const chatIdSlice = createSlice({
    name: 'chatId',
    initialState,
    reducers:{
        setChatId : (state,action)=>{
            state.chatId = action.payload.chatId;
        },
    }
})

export const {setChatId} = chatIdSlice.actions
export default chatIdSlice.reducer