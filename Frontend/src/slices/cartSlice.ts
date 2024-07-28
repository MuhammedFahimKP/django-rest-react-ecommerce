import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItem, CartResponse } from "../@types";
import { type ApiClientError } from "../services/api-client";
import {
  addToCart,
  deletCartItem,
  updateCartItem,
  getCartItems,
} from "../thunks";

interface State extends CartResponse {
  checkoutable: boolean;
  loading: boolean;
  error: null | string;
}

const initialState: State = {
  total: 0,
  cart_items: [],
  itemErrors: {},
  checkoutable: false,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeCartItem(state: State, action: PayloadAction<string>) {
      const index = state.cart_items.findIndex(
        (item) => item.id === action.payload
      );

      state.total -= state.cart_items[index].subtotal;
      state.cart_items.splice(index, 1);
    },
    clearCart(state: State) {
      state.cart_items = [];
      state.checkoutable = false;
      state.total = 0;
    },

    checkouted(state: State) {
      state.checkoutable = true;
    },

    uncheckouted(state: State) {
      if (state.checkoutable === true) {
        state.checkoutable = false;
        console.log(state.checkoutable);
      }
    },

    updateCartItemQuantity(
      state: State,
      action: PayloadAction<{
        id: string;
        quantity: number;
        type: "INCRE" | "DECRE";
      }>
    ) {
      state.cart_items.forEach((item: CartItem) => {
        if (item.id === action.payload.id) {
          action.payload.type === "INCRE" &&
            (item.quantity += action.payload.quantity);

          action.payload.type === "DECRE" &&
            item.quantity != 0 &&
            (item.quantity -= action.payload.quantity);
        }
      });
    },

    setItemError(state: State, action: PayloadAction<typeof state.itemErrors>) {
      state.itemErrors = { ...state.itemErrors, ...action.payload };
    },

    removeItemError(state: State) {
      state.itemErrors = {};
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(
      getCartItems.fulfilled,
      (state: State, action: PayloadAction<CartResponse>) => {
        state.cart_items = action.payload?.cart_items
          ? action.payload.cart_items
          : state.cart_items;

        state.total = action.payload?.total
          ? action.payload.total
          : state.total;

        state.loading = false;

        state.error = state.error ? null : state.error;
      }
    ),
      builder.addCase(getCartItems.pending, (state: State) => {
        state.loading = true;
      });
    builder.addCase(
      getCartItems.rejected,
      (state: State, action: PayloadAction<ApiClientError | undefined>) => {
        if (action.payload?.message) {
          state.error = action.payload.message;
          state.loading = false;
        }
      }
    );

    builder.addCase(
      addToCart.fulfilled,

      (state: State, action: PayloadAction<CartItem>) => {
        state.cart_items = [...state.cart_items, action.payload];
      }
    );

    builder.addCase(
      updateCartItem.fulfilled,
      (state: State, action: PayloadAction<CartItem>) => {
        state.cart_items.forEach((item: CartItem) => {
          if (item.id === action.payload.id) {
            state.total -= item.subtotal;
            state.total += action.payload.subtotal;
            item.quantity = action.payload.quantity;
            item.subtotal = action.payload.subtotal;
            item.stock = action.payload.stock;
          }
        });
      }
    );
  },
});

export const {
  checkouted,
  uncheckouted,
  clearCart,
  removeCartItem,
  updateCartItemQuantity,
} = cartSlice.actions;
export { getCartItems, updateCartItem, addToCart, deletCartItem };

export default cartSlice.reducer;
