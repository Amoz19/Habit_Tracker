import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: JSON.parse(localStorage.getItem("user")) || null,
  userId: null,
  userName: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    tokenReceived: (state, action) => {
      const { token, userId, userName } = action.payload;
      state.token = token;
      (state.userId = userId), (state.userName = userName);
    },
  },
});

export const { tokenReceived } = authSlice.actions;
export default authSlice.reducer;
