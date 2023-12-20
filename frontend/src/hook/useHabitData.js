import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

const addNewHabit = async ({ userId, habitName, getFullYear }) => {
  try {
    const { data } = await axios.post(import.meta.env.VITE_API_URL, {
      userId,
      habitName,
      getFullYear,
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const addHabitData = () => {
  const queryClient = useQueryClient();
  return useMutation(addNewHabit, {
    onMutate: async (newHabit) => {
      queryClient.cancelQueries("habits");
      const previousHabitsData = queryClient.getQueryData("habits");

      // Add a placeholder object with an optimistic ID
      const optimisticId = Date.now();
      queryClient.setQueryData("habits", (oldQueryData) => {
        return [...oldQueryData, { id: optimisticId, ...newHabit }];
      });

      return { previousHabitsData, optimisticId };
    },
    onSuccess: (data, newHabit, context) => {
      // Update the optimistic update with the actual ID from the server response
      queryClient.setQueryData("habits", (oldQueryData) => {
        const updatedData = oldQueryData.map((habit) =>
          habit.id === context.optimisticId ? { ...data, ...newHabit } : habit
        );
        return updatedData;
      });
    },
    onError: (_error, __habit, context) => {
      queryClient.setQueriesData("habits", context.previousHabitsData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("habits");
    },
  });
};
