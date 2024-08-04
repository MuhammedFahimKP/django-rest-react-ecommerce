import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WishlistItem } from "../@types";
import { getWishlist } from "../thunks";
import { ApiClientError } from "../services/api-client";

type State = {
  items: WishlistItem[] | [];
  loading: boolean;
  error: string | null;
};

const initialState: State = {
  items: [],
  loading: false,
  error: null,
};

const wishlist = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    removeWishlistItem(state: State, action: PayloadAction<string>) {
      const index = state.items.findIndex((item) => item.id === action.payload);
      state.items.splice(index, 1);
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(
      getWishlist.fulfilled,
      (state: State, action: PayloadAction<WishlistItem[] | []>) => {
        state.error = state.error ? null : state.error;
        state.loading = false;
        state.items = action.payload;
      }
    );

    builder.addCase(getWishlist.pending, (state: State) => {
      state.loading = true;
    });

    builder.addCase(
      getWishlist.rejected,
      (state: State, action: PayloadAction<ApiClientError>) => {
        state.error = action.payload.message;
      }
    );
  },
});

export default wishlist.reducer;
export const { removeWishlistItem } = wishlist.actions;
