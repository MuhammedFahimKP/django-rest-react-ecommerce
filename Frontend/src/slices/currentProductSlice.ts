import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductForm } from "../@types";

interface State extends ProductForm {
  id: string;
}

const initialState: State = {
  id: "",
  name: "",
  img: "",
  brand: "",
  categoery: "",
  discription: "",
  is_active: false,
};

const currentProductSlice = createSlice({
  name: "currentProduct",
  initialState,
  reducers: {
    setProduct(state: State, action: PayloadAction<State>) {
      state = action.payload;
    },

    setImage(state: State, action: PayloadAction<string>) {
      state.img = action.payload;
    },
  },
});

export const { setProduct, setImage } = currentProductSlice.actions;
export default currentProductSlice.reducer;
