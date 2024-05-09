import { createAsyncThunk, createSlice,PayloadAction } from "@reduxjs/toolkit";
import type { Whishlist } from "../types";
import apiClient from "../services/api-client";


interface State{
    
    items:Whishlist[]

}


const addToWhishList = createAsyncThunk('whishlist', async () => {
    const  res = apiClient.post('shop/whishlist/')
    return res  
})

const initialState:State  = {
    items:[]    
}

const whishListSlice = createSlice({
    name:'whishlist',
    initialState,
    reducers:{},
    extraReducers(builder:any) {
        
        builder.addCase(addToWhishList.fulfilled, (state:State,action:PayloadAction<Whishlist>) => {
            state.items = [...state.items,action.payload]

        })

        
    },
    

})


export default whishListSlice.reducer