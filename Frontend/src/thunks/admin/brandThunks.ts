import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient, { ApiCLientRequestConfig } from "../../services/api-client";
import type { AdminBrand, PaginatedResponseData } from "../../@types";
import type { PaginatedThunkCallWithFilterARGS } from "../@types";
import { RootState } from "../../store";

const getAllBrand = createAsyncThunk(
  "getAllAdminBrand",
  async (
    { limit, delay, requestConfiq }: PaginatedThunkCallWithFilterARGS,
    thunkAPI
  ) => {
    await new Promise((resolve) => setTimeout(resolve, delay));

    const state = thunkAPI.getState() as RootState;
    const page = state.adminBrandSlice.currentPage;

    try {
      const reqConfig: ApiCLientRequestConfig = {
        ...requestConfiq,
        params: { ...requestConfiq?.params, limit: limit, page: page },
      };
      const res = await apiClient.get<PaginatedResponseData<AdminBrand>>(
        "admin/brand/",
        reqConfig
      );

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export { getAllBrand };
