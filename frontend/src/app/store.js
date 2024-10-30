import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./baseQuery";
import { authApi } from "@/features/auth/authApi";
import authReducer from "../features/auth/authSlice";
import habitsReducer from "../features/habits/habitSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    habits: habitsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    // [habitApi.reducerPath]: habitApi.reducer,
  },
  middleware: (getDefaultMiddileware) => {
    return getDefaultMiddileware().concat([
      apiSlice.middleware,
      authApi.middleware,
    ]);
  },
});
