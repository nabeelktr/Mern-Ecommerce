import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    userId: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        userLogin : (state,action)=>{
            state.isLoggedIn = true;
            state.userId = action.payload;
        },
        signOut:(state,action)=>{
            state.isLoggedIn = false;
            state.userId = null;
        }
    }
})

export const {userLogin,signOut} = authSlice.actions
export default authSlice.reducer