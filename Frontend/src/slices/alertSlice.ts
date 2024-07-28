import { createSlice } from "@reduxjs/toolkit";

interface State {
  user_not: boolean;
}

const initialState: State = {
  user_not: false,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setUserRequired(state: State) {
      alert(state.user_not);
      state.user_not = true;
      alert(state.user_not);
    },
    setUserRequiredFalse(state: State) {
      state.user_not = false;
    },
  },
});

export const { setUserRequired, setUserRequiredFalse } = alertSlice.actions;

export default alertSlice.reducer;
