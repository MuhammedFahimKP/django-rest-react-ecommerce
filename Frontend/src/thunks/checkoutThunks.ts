import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../services/api-client";

import { unCheckoutItems } from "../slices/checkoutSlice";

const CHEKOUT_URL = "checkout/order/";

const removeOrderItem = createAsyncThunk(
  "removeOrderItem",
  async ({ id }: { id: string }, thunkAPI) => {
    try {
      const res = await apiClient.delete(CHEKOUT_URL + id);

      if (res.status == 204) {
        thunkAPI.dispatch(unCheckoutItems());
      }
    } catch (err) {
      thunkAPI.rejectWithValue(err);
    }
  }
);

export { removeOrderItem };
