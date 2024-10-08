import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "user/login",
        method: "POST",
        body: credentials,
      }),
      providesTags: [{ type: "AUTH", id: "LIST" }],
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "user/signup",
        method: "POST",
        body: credentials,
      }),
      providesTags: [{ type: "AUTH", id: "LIST" }],
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
