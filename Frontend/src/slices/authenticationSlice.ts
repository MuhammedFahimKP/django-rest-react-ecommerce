import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModelResponse, AuthState } from "../@types";

export interface State {
  user: UserModelResponse | null;
  access: string | null;
  refresh: string | null;
  auth_state: AuthState;
}

const initialState: State = {
  user: null,
  access: null,
  refresh: null,
  auth_state: "NOT LOGGED",
};

const authenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(state: State, action: PayloadAction<AuthState>) {
      state.auth_state = action.payload;
    },
    logedIn(
      state: State,
      action: PayloadAction<{
        access: string;
        refresh: string;
        user: UserModelResponse;
      }>
    ) {
      (state.access = action.payload.access),
        (state.refresh = action.payload.refresh),
        (state.user = action.payload.user);

      state.auth_state = "LOGED IN";
    },

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
      state.auth_state = "NOT LOGGED";
    },
  },
});

export const { setAuthTokens, setUser, logout, logedIn, setAuthState } =
  authenticationSlice.actions;

export default authenticationSlice.reducer;
