import type { AdminBrand, PaginatedResponseData } from "../../@types";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getAllBrand } from "../../thunks";
import {
  ApiClientCanceledError,
  ApiClientError,
} from "../../services/api-client";

interface State {
  currentPage: number;
  limit: number;
  pages: number;
  pageChange: boolean;
  isLoading: boolean;
  data: AdminBrand[] | [];
  error: null | string;
}

const initialState: State = {
  currentPage: 1,
  limit: 8,
  pages: 0,
  pageChange: false,
  isLoading: false,

  data: [],
  error: null,
};

const brandSlice = createSlice({
  name: "adminBrand",
  initialState,
  reducers: {
    setIntialPage: (state: State, action: PayloadAction<number>) => {
      state.data = [];

      if (state.pageChange === false) {
        state.currentPage = 1;
        state.limit = action.payload;
      }
    },

    next: (state: State) => {
      state.pageChange = true;
      state.currentPage =
        state.currentPage <= state.pages ? state.currentPage + 1 : 1;
    },

    prev: (state: State) => {
      state.pageChange = true;
      state.currentPage = [0, 1].includes(state.currentPage)
        ? state.pages
        : state.currentPage - 1;
    },
  },

  extraReducers: (builder: any) => {
    builder.addCase(
      getAllBrand.fulfilled,
      (
        state: State,
        action: PayloadAction<PaginatedResponseData<AdminBrand>>
      ) => {
        if (state.error !== null) {
          state.error = null;
        }
        state.pages = Math.ceil(action.payload.count / state.limit);
        state.data = action.payload.results;

        if (action.payload.results.length === 0) {
          state.currentPage = 0;
        }
      }
    );

    builder.addCase(
      getAllBrand.pending,
      (state: State, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );

    builder.addCase(
      getAllBrand.rejected,
      (
        state: State,
        action: PayloadAction<ApiClientError | ApiClientCanceledError<any>>
      ) => {
        state.currentPage = 0;
        if (action.payload instanceof ApiClientCanceledError) {
        } else {
          state.error = action.payload.message;
        }
      }
    );
  },
});

export const { setIntialPage, next, prev } = brandSlice.actions;
export default brandSlice.reducer;
