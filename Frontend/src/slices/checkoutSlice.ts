import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PaymentOptions } from "../@types";

type ChangeSelection = "ADDRESS" | "PAYMENT";
interface State {
  show: { payment_show: boolean; address_show: boolean; items_show: boolean };

  order: {
    order_id: string;
    address_id: string;
    payment_type: PaymentOptions | "";
    payment_id: string;
  };
}

const initialState: State = {
  show: {
    payment_show: false,
    address_show: true,
    items_show: false,
  },
  order: {
    order_id: "",
    address_id: "",
    payment_type: "",
    payment_id: "",
  },
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    changeSelection(state: State, action: PayloadAction<ChangeSelection>) {
      if (action.payload == "ADDRESS") {
        state.show.address_show = true;
      }

      if (action.payload === "PAYMENT") {
        state.show.payment_show = true;
      }
    },

    updateSelection(
      state: State,
      action: PayloadAction<{
        update: ChangeSelection;
        value: string | PaymentOptions;
      }>
    ) {
      if (action.payload.update === "ADDRESS") {
        state.order.address_id = action.payload.value;
        state.show.address_show = false;
      }

      if (action.payload.update === "PAYMENT") {
        if (
          action.payload.value === "COD" ||
          action.payload.value === "RAZOR PAY"
        ) {
          state.order.payment_type === action.payload.value;
          state.show.payment_show === false;
        }
      }
    },

    addressSelected(state: State, action: PayloadAction<string>) {
      (state.show.address_show = false),
        (state.show.payment_show = true),
        (state.order.address_id = action.payload);
    },

    paymentOptionSelected(state: State, action: PayloadAction<PaymentOptions>) {
      state.show.payment_show = false;
      state.show.items_show = true;
      state.order.payment_type = action.payload;
    },

    checkout(
      state: State,
      action: PayloadAction<{ order_id: string; payment_id?: string }>
    ) {
      state.order.order_id = action.payload.order_id;
      action.payload?.payment_id &&
        (state.order.payment_id = action.payload.payment_id);
    },

    removeOrderid(state: State) {
      state.order.order_id = "";
      state.order.payment_id = "";
    },

    unCheckoutItems(state: State) {
      state = initialState;
    },
  },
});

export const {
  changeSelection,
  updateSelection,
  addressSelected,
  removeOrderid,
  paymentOptionSelected,
  checkout,
  unCheckoutItems,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
