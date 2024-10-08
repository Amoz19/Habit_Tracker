import { apiSlice } from "../../app/baseQuery";

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHabits: builder.query({
      query: () => "habits",
      extraOptions: { maxRetries: 8 },
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Habits", id })),
              { type: "Habits", id: "LIST" },
            ]
          : [{ type: "Habits", id: "LIST" }],
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
  }),
});

export const {
  useGetHabitsQuery,
  useGetHabitQuery,
  useAddNewHabitMutation,
  useUpdateHabitMutation,
  useDeleteHabitMutation,
} = extendedApiSlice;
