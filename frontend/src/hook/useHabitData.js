import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

const addNewHabit = async ({ userId, habitName, getFullYear }) => {
  try {
    return await axios.post(import.meta.env.VITE_API_URL, {
      userId,
      habitName,
      getFullYear,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const addHabitData = () => {
  const queryClient = useQueryClient();
  return useMutation(addNewHabit, {
    onMutate: (newHabit) => {
      queryClient.cancelQueries("habits");
      const previosHabitsData = queryClient.getQueriesData("habits");
      queryClient.setQueriesData("habits", (oldQueryData) => {
        return [...oldQueryData, { ...newHabit }];
      });
      return previosHabitsData;
    },
    onError: (_error, __habit, context) => {
      queryClient.setQueriesData("habits", context.previosHabitsData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("habits");
    },
  });
};
