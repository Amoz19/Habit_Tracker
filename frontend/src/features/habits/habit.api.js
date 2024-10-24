import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/baseQuery";
// import { habitsAdapter } from "./habitSlice";

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHabits: builder.query({
      query: () => "habits",
      // transformResponse: (response) => {
      //   return habitsAdapter.setAll(habitsAdapter.getInitialState(), response);
      // },
      providesTags: (result, error, arg) => [
        { type: "Habits" },
        // ...result.ids.map(({ id }) => ({ type: "Habits", id })),
      ],
    }),
    getHabit: builder.query({
      query: (id) => `habits/${id}`,
      providesTags: (result, error, id) => [{ type: "Habit" }],
    }),
    addNewHabit: builder.mutation({
      query: (newHabitData) => ({
        url: "habits",
        method: "POST",
        body: { ...newHabitData },
      }),
      onQueryStarted: async (newHabitData, { dispatch, queryFulfilled }) => {
        const addingNewHabit = dispatch(
          extendedApiSlice.util.updateQueryData(
            "getHabits",
            undefined,
            (draft) => {
              draft.push(newHabitData);
            }
          )
        );

        try {
          await queryFulfilled;
        } catch (error) {
          addingNewHabit.undo();
        }
      },
      // invalidatesTags: [{ type: "Habits", id: "LIST" }],
    }),
    updateHabit: builder.mutation({
      query: ({ id, monthIndex, dayIndex, isComplete }) => ({
        url: "habits", // Assuming an API endpoint like this
        method: "PATCH",
        body: { id, monthIndex, dayIndex, isComplete }, // Send the correct update payload
      }),
      onQueryStarted: async (
        { id, monthIndex, dayIndex, isComplete },
        { dispatch, queryFulfilled }
      ) => {
        // Update getHabit cache for the specific habit
        const patchResult = dispatch(
          extendedApiSlice.util.updateQueryData("getHabit", id, (draft) => {
            const month = draft.getFullYear.find(
              (month) => month._id === monthIndex
            );

            const day = month.days.find((day) => day._id === dayIndex);

            if (day) {
              day.isComplete = !isComplete; // Optimistically update the day status
            }
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo(); // Revert the optimistic update if the request fails
        }
      },
    }),

    deleteHabit: builder.mutation({
      query: (id) => ({
        url: `habits/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const addingNewHabit = dispatch(
          extendedApiSlice.util.updateQueryData(
            "getHabits",
            undefined,
            (draft) => {
              const index = draft.findIndex((habit) => habit.uniqueId === id);
              if (index !== -1) {
                draft.splice(index, 1); // Remove the deleted habit from the cache
              }
            }
          )
        );

        try {
          await queryFulfilled;
        } catch (error) {
          addingNewHabit.undo();
        }
      },
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
