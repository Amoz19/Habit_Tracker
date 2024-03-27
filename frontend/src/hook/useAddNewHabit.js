import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

const addNewHabit = async ({ uniqueId, userId, habitName, getFullYear }) => {
  try {
    const { data } = await axios.post(
      import.meta.env.VITE_API_URL,
      {
        uniqueId,
        userId,
        habitName,
        getFullYear,
      },
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjA0MjYzMWFmMTc4ODMyOGZkN2FmZDYiLCJpYXQiOjE3MTE1NDc5NTQsImV4cCI6MTcxMTk3OTk1NH0.E6xJvhfXvx4EVU1PLWuRKzKz6yhg2EFUyFaaKZBhltc`,
        },
      }
    );
    console.log(data);
    return data._id;
  } catch (error) {
    console.log(error.message);
  }
};

export const useAddNewHabit = () => {
  const queryClient = useQueryClient();
  return useMutation(addNewHabit, {
    onMutate: async (newHabit) => {
      await queryClient.cancelQueries("habits");
      const previousHabitsData = queryClient.getQueryData("habits");
      queryClient.setQueryData("habits", (oldQueryData) => {
        return [...oldQueryData, { ...newHabit }];
      });
      return { previousHabitsData };
    },
    onError: (_error, __habit, context) => {
      queryClient.setQueriesData("habits", context.previousHabitsData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("habits");
    },
  });
};
