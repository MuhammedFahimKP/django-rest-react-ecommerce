import { createAsyncThunk } from "@reduxjs/toolkit";
import type { DynamicObj } from "../@types";
import apiClient from "../services/api-client";
import { cancelOrder } from "../slices/orderSlice";

const ORDER_URL = "orders/";

const getAllOrders = createAsyncThunk(
  "fetchALLOrders",
  async (
    { params }: { params?: DynamicObj; signal: AbortSignal },
    thunkAPI
  ) => {
    try {
      const res = await apiClient.get(ORDER_URL, {
        params: params,
        signal: thunkAPI.signal,
      });

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const cancelOrderThunk = createAsyncThunk(
  "cancelOrder",
  async ({ id }: { id: string }, thunkAPI) => {
    try {
      const res = await apiClient.patch<{
        expected_delivery: string;
        status: string;
      }>(ORDER_URL, {
        id,
      });
      return thunkAPI.dispatch(
        cancelOrder({
          id,
          status: res.data.status,
          expected_delivery: res.data.expected_delivery,
        })
      );
    } catch (err) {}
  }
);

export { getAllOrders, cancelOrderThunk };
