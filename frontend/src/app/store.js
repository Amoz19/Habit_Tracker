import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/habits/baseQuery";
import authReducer from "../features/auth/authSlice";
import habitsReducer from "../features/habits/habitSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    habits: habitsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddileware) => {
    return getDefaultMiddileware().concat(apiSlice.middleware);
  },
});
