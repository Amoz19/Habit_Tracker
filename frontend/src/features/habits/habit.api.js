import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/baseQuery";
import { habitsAdapter } from "./habitSlice";

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHabits: builder.query({
      query: () => "habits",
      // transformResponse: (response) => {
      //   return habitsAdapter.setAll(habitsAdapter.getInitialState(), response);
      // },
      providesTags: (result, error, arg) => [
        { type: "Habits", id: "LIST" },
        // ...result.ids.map(({ id }) => ({ type: "Habits", id })),
      ],
    }),
    getHabit: builder.query({
      query: (id) => `habits/${id}`,
      providesTags: (result, error, id) => [{ type: "Habits", id }],
    }),
    addNewHabit: builder.mutation({
      query: (newHabitData) => ({
        url: "habits",
        method: "POST",
        body: { ...newHabitData },
      }),
      invalidatesTags: [{ type: "Habits", id: "LIST" }],
    }),
    updateHabit: builder.mutation({
      query: (sepcificIndex) => ({
        url: "habits",
        method: "PATCH",
        body: { ...sepcificIndex },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Habits", id: arg.id }],
    }),
    deleteHabit: builder.mutation({
      query: (id) => ({
        url: `habits/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Habits", id: "LIST" }],
    }),
    getProgress: builder.query({
      query: () => ({
        url: "habits/progress",
      }),
    }),
    getMonthlyProgess: builder.query({
      query: () => ({
        url: "habits/monthlyProgress",
      }),
    }),
  }),
});

export const {
  useGetHabitsQuery,
  useGetHabitQuery,
  useAddNewHabitMutation,
  useUpdateHabitMutation,
  useDeleteHabitMutation,
  useGetProgressQuery,
  useGetMonthlyProgessQuery,
} = extendedApiSlice;
