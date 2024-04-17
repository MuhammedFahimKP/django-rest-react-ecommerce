import {createSlice} from "@reduxjs/toolkit"



interface State{
    cartAlert:{
        showAlert:boolean;
    }
}



const initialState:State={
    
    cartAlert:{
        showAlert:false
    }
    
}


const alertSlice = createSlice({
    name:'alert',
    initialState,
    reducers:{
        showCartAlert(state:State){
            if (state.cartAlert.showAlert === true) return  
            state.cartAlert.showAlert = true
        },   
        dismissCartAlert(state:State){
            if (state.cartAlert.showAlert === false) return 
            state.cartAlert.showAlert = false
        }
    }
})

export const {showCartAlert ,dismissCartAlert} = alertSlice.actions

export default alertSlice.reducer