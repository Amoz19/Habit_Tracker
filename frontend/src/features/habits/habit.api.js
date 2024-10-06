import { apiSlice } from "./baseQuery";
import { habitsAdapter } from "./habitSlice";

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHabits: builder.query({
      query: () => "habits/getAllHabits",
      extraOptions: { maxRetries: 8 },

      // providesTags: (result) => [
      //   { type: "Habits", id: "LIST" },
      //   ...result.ids.map((id) => ({ type: "Habits", id })),
      // ],
    }),
  }),
});

export const { useGetHabitsQuery } = extendedApiSlice;
