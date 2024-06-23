import { createSlice } from "@reduxjs/toolkit";

interface State {
  addressSelected: boolean;
  itemsSelected: boolean;
}

const initialState: State = {
  addressSelected: false,
  itemsSelected: false,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setAddressSelected(state: State) {
      state.addressSelected = true;
    },

    setItemsSelected(state: State) {
      state.itemsSelected = true;
    },

    removeCheckoutSelections(state: State) {
      state = {
        addressSelected: false,
        itemsSelected: false,
      };
    },
  },
});

export const {
  setAddressSelected,
  setItemsSelected,
  removeCheckoutSelections,
} = checkoutSlice.actions;

export default checkoutSlice;
