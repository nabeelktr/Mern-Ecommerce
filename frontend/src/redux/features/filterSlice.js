import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    refresh: 0,

}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers:{
        setRefresh : (state,action)=>{
            state.refresh += 1;
        },
    }
})

export const {setRefresh} = filterSlice.actions
export default filterSlice.reducer