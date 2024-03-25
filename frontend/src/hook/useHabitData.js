import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

const addNewHabit = async ({ uniqueId, userId, habitName, getFullYear }) => {
  try {
    const { data } = await axios.post(import.meta.env.VITE_API_URL, {
      uniqueId,
      userId,
      habitName,
      getFullYear,
    });
    console.log(data);
    return data._id;
  } catch (error) {
    console.log(error.message);
  }
};

export const addHabitData = () => {
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
