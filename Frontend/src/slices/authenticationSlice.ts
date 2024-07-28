import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModelResponse } from "../@types";

export interface State {
  user: UserModelResponse | null;
  access: string | null;
  refresh: string | null;
}

const initialState: State = {
  user: null,
  access: null,
  refresh: null,
};

const authenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthTokens(
      state: State,
      action: PayloadAction<{ access: string; refresh?: string }>
    ) {
      state.access = action.payload.access;

      if (action.payload.refresh) {
        state.refresh = action.payload.refresh;
      }
    },
    setUser(state: State, action: PayloadAction<UserModelResponse>) {
      state.user = action.payload;
    },
    logout(state: State) {
      state.user = null;
      state.access = null;
      state.refresh = null;
    },
  },
});

export const { setAuthTokens, setUser, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
