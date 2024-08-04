import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../services/api-client";
import type { WishlistItem } from "../@types";
import { removeWishlistItem } from "../slices/wishlistSlice";

const wishlistUrl = "shop/wishlist/";

const getWishlist = createAsyncThunk<WishlistItem[] | [], void>(
  "getWishlist",
  async (_, thunkAPI) => {
    try {
      const res = await apiClient.get(wishlistUrl);
      return res.data;
    } catch (err) {
      thunkAPI.rejectWithValue(err);
    }
  }
);

const deleteWishlistItem = createAsyncThunk(
  "deleteWishlist",
  async (id: string, thunkAPI) => {
    const deleteReq = await apiClient.delete(wishlistUrl + `${id}/`);
    deleteReq.status === 204 && thunkAPI.dispatch(removeWishlistItem(id));
    return deleteReq.data;
  }
);

export { getWishlist, deleteWishlistItem };
