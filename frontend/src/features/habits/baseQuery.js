import { createApi, retry, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const staggeredBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth.token;
      headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  {
    maxRetries: 5,
  }
);

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: staggeredBaseQuery,
  tagTypes: ["Habits", "AUTH"],
  endpoints: (builder) => ({}),
});
