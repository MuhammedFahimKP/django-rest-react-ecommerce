import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderFetchResponse } from "../@types";
import { ApiClientCanceledError, ApiClientError } from "../services/api-client";
import { getAllOrders } from "../thunks/orderThunks";

interface State {
  error: null | string;
  orders: OrderFetchResponse[] | [];
  loading: boolean;
}

const initialState: State = {
  error: null,
  orders: [],
  loading: false,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    cancelOrder(
      state: State,
      action: PayloadAction<{
        id: string;
        expected_delivery: string;
        status: string;
      }>
    ) {
      state.orders.forEach((item) => {
        if (item.id === action.payload.id && item.status === "Placed") {
          item.status = "Cancelled";
          item.expected_delivery = action.payload.expected_delivery;
        }
      });
    },
  },
  extraReducers(builder: any) {
    builder.addCase(
      getAllOrders.rejected,
      (
        state: State,
        action: PayloadAction<
          ApiClientError | ApiClientCanceledError<any> | undefined
        >
      ) => {
        if (action.payload instanceof ApiClientCanceledError) return state;

        if (action.payload?.message) {
          state.error = action.payload.message;
          state.loading = false;
        }
      }
    );

    builder.addCase(getAllOrders.pending, (state: State) => {
      state.loading = true;
    });

    builder.addCase(
      getAllOrders.fulfilled,
      (state: State, action: PayloadAction<OrderFetchResponse[]>) => {
        state.loading = false;
        state.error = state.error === null ? state.error : null;
        state.orders = action.payload;
      }
    );
  },
});

export default orderSlice.reducer;

export const { cancelOrder } = orderSlice.actions;
