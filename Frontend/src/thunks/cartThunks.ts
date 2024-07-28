import { createAsyncThunk } from "@reduxjs/toolkit";

import apiClient from "../services/api-client";
import type { CartResponse } from "../@types";
import { removeCartItem } from "../slices/cartSlice";

const getCartItems = createAsyncThunk<CartResponse, void>(
  "getCartItems",
  async (_, thunkAPI) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      const res = await apiClient.get<CartResponse>("shop/cart/");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const addToCart = createAsyncThunk("addToCart", async () => {
  const res = await apiClient.post("shop/cart/");
  return res.data;
});

const updateCartItem = createAsyncThunk(
  "updateCartItem",
  async ({ id, quantity }: { id: string; quantity: number }) => {
    const item = await apiClient.patch(`shop/cart/${id}/`, { quantity });
    return item.data;
  }
);

const deletCartItem = createAsyncThunk(
  "deleteCartItem",
  async (id: string, thunkAPI) => {
    thunkAPI.dispatch(removeCartItem(id));
    const item = await apiClient.delete(`shop/cart/${id}/`);
    return item.data;
  }
);

export { getCartItems, updateCartItem, deletCartItem, addToCart };
