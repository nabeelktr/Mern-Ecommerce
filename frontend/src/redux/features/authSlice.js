import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        userLogin : (state,action)=>{
            state.isLoggedIn = true;
        },
        signOut:(state,action)=>{
            state.isLoggedIn = false;
        }
    }
})

export const {userLogin,signOut} = authSlice.actions
export default authSlice.reducer