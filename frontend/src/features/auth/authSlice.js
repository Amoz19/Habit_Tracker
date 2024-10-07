import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: JSON.parse(localStorage.getItem("user")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    tokenReceived: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
    },
  },
});

export const { tokenReceived, removeToken } = authSlice.actions;
export default authSlice.reducer;
