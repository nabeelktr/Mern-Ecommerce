import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderId: false,
    username: '',
}

export const orderIdSlice = createSlice({
    name: 'orderId',
    initialState,
    reducers:{
        setOrderId : (state,action)=>{
            state.orderId = action.payload.orderId;
            state.username = action.payload.username;
        },
    }
})

export const {setOrderId} = orderIdSlice.actions
export default orderIdSlice.reducer