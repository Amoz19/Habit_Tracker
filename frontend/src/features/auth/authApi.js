import { apiSlice } from "../../app/baseQuery";

export const authApi = apiSlice.injectEndpoints({
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
