import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AdminProductSearchQuery } from "../../@types";

const initialState: AdminProductSearchQuery = {
  brand: "",
  category: "",
  name: "",
};

const adminProductSearchSlice = createSlice({
  name: "adminPrdtSearchQuery",
  initialState,
  reducers: {
    setBrand(state: AdminProductSearchQuery, action: PayloadAction<string>) {
      state.brand = action.payload;
    },
    setCategory(state: AdminProductSearchQuery, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setName(state: AdminProductSearchQuery, action: PayloadAction<string>) {
      state.name = action.payload;
    },
  },
});

export const { setBrand, setCategory, setName } =
  adminProductSearchSlice.actions;
export default adminProductSearchSlice.reducer;
