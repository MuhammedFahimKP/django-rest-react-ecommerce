import {PayloadAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { CartItem } from "../types"
import apiClient from "../services/api-client"


type State = {
    totalprice:number,
    items:CartItem[] | []
}

const initialState:State = {
    totalprice:0,
    items:[]

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
    const res  = await apiClient.patch(`shop/cart/${id}`,{quantity})
    return res.data
})



const cartSlice =  createSlice({
    name : 'cart',
    initialState,
    reducers:{},
    extraReducers:(builder:any) => {


        builder.addCase(getCartItems.fulfilled,(state:State,action:PayloadAction<CartItem[]>) => {
            state.items = action.payload 
            
            if (action.payload.length > 0) {
                for(const item of action.payload ) {
                    state.totalprice+=item.sub_total
                }
    
            }
           
        }),

        builder.addCase(addToCart.fulfilled , (state:State,action:PayloadAction<CartItem>) => {
            state.items = [...state.items,action.payload]

        })

        builder.addCase(updateCartItem.fulfilled,(state:State,action:PayloadAction<CartItem>) => {
            const newItems = state.items.map((item:CartItem) => {
              if (  item.id === action.payload.id && action.payload.quantity >  0) {
                item.quantity = action.payload.quantity 

              } 

              return item
            })

            state.items = newItems
        })

        





        
        

    }

})




export  const  {}   = cartSlice.actions
export  {getCartItems,updateCartItem,addToCart}

export default cartSlice.reducer
