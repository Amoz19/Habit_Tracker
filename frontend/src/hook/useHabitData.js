import { useMutation, useQuery, useQueryClient } from "react-query";
// import apiClient from "../services/api-client";
import axios from "axios";

// import "react-toastify/dist/ReactToastify.css";

const getHabits = async () => {
  const { data } = await axios.get(import.meta.env.VITE_API_URL);
  return data;
};

const addNewHabit = async ({ uniqueId, habitName, getFullYear }) => {
  try {
    return await axios.post(import.meta.env.VITE_API_URL, {
      uniqueId,
      habitName,
      getFullYear,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const useHabitData = () => {
  return useQuery(["habits"], getHabits);
};

export const addHabitData = () => {
  const queryClient = useQueryClient();
  return useMutation(addNewHabit, {
    onMutate: async (newHabit) => {
      await queryClient.cancelQueries("habits");
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

//  onSuccess: () => {
//       queryClient.invalidateQueries("habits");
//       toast.success("Success, Please wait for update...");
//     },
