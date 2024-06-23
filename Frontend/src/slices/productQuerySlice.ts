import { createSlice ,PayloadAction } from "@reduxjs/toolkit";

interface State  {
    brand:string[],
    categoery:string[],
    color:string[],
    name:string,
    size:string[], 
}


const initialState : State = {
    brand:[],
    categoery:[],
    color:[],
    name: '',
    size : [],
    
}



const productQuerySlice = createSlice({
    name:'productQuerySlice',
    initialState,
    reducers: {


        setBrand(state:State,action:PayloadAction<string>) {
            state.brand.push(action.payload)
        } ,

    

        setCategory(state:State,action:PayloadAction<string>) {
            state.categoery.push(action.payload)
        },

        setColor(state:State,action:PayloadAction<string>){
            state.color.push(action.payload)
        },


        setSize(state:State,action:PayloadAction<string>){
          state.size.push(action.payload)   
        },

    

        removeAllFilters(state:State) {
            state = {...initialState,name:state.name}
        }



    }
})

export const {setCategory,setBrand} = productQuerySlice.actions
export default productQuerySlice