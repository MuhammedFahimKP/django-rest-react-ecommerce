import {PayloadAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { CartItem } from "../types"
import apiClient from "../services/api-client"
import { dispatch } from "."




type State = {
    total:number,
    cart_items:CartItem[] | []
}

const initialState:State = {
    total:0,
    cart_items:[]

}




const getCartItems = createAsyncThunk('getCartItems',async () => {
    const res = await apiClient.get('shop/cart/')
    return res.data
}) 

const addToCart = createAsyncThunk('addToCart',async () => {
    const res = await apiClient.post('shop/cart/')
    return res.data
})

const updateCartItem = createAsyncThunk('updateCartItem',async ({id,quantity} : {id:string,quantity:number}) => {
    const item  = await apiClient.patch(`shop/cart/${id}/`,{quantity})
    dispatch(getCartItems())
    return item.data

})

const deletCartItem = createAsyncThunk('deleteCartItem',async (id:string) => {
    const item = await apiClient.delete(`shop/cart/${id}/`)
    dispatch(getCartItems())
    return item.data
})



const cartSlice =  createSlice({
    name : 'cart',
    initialState,
    reducers:{},
    extraReducers:(builder:any) => {


        builder.addCase(getCartItems.fulfilled,(state:State,action:PayloadAction<State>) => {
            state.cart_items = action.payload.cart_items
            state.total = action.payload.total 
            

           
        }),

        builder.addCase(addToCart.fulfilled , (state:State,action:PayloadAction<CartItem>) => {
            state.cart_items = [...state.cart_items,action.payload]


        })

        // builder.addCase(updateCartItem.fulfilled,(state:State,action:PayloadAction<{updated:CartItem,all:State}>) => {
            
        //     state.cart_items = action.payload.all.cart_items
        //     state.total = action.payload.all.total

        // })

        





        
        


    }

})




export  const  {}   = cartSlice.actions
export  {getCartItems,updateCartItem,addToCart,deletCartItem}

export default cartSlice.reducer
