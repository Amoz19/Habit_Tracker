import { createApi, retry, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a base query with retries and token handling
const staggeredBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token.token}`);
      }
      return headers;
    },
  }),
  {
    maxRetries: 5,
  }
);

// Error handling with token management
const staggeredBaseQueryWithErrorHandling = async (args, api, extraOptions) => {
  try {
    const result = await staggeredBaseQuery(args, api, extraOptions);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

// Create the API slice
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: staggeredBaseQueryWithErrorHandling,
  tagTypes: ["Habits", "Habit", "AUTH"], // Define tag types for caching
  endpoints: (builder) => ({}), // Initialize with no endpoints
});
