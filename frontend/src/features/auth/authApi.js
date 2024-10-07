import { apiSlice } from "../habits/baseQuery";

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "user/login",
        method: "POST",
        body: credentials,
      }),
      extraOptions: { maxRetries: 0 },
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "user/signup",
        method: "POST",
        body: credentials,
      }),
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = extendedApiSlice;
