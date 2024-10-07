import { apiSlice } from "./baseQuery";

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
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          extendedApiSlice.util.updateQueryData("getHabits", id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteHabit: builder.mutation({
      query: (id) => ({
        url: `habits/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          extendedApiSlice.util.updateQueryData("getHabits", id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
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
