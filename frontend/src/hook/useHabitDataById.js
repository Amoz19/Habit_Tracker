import { useMutation, useQuery, useQueryClient } from "react-query";
// import apiClient from "../services/api-client";
import axios from "axios";

const getHabitById = async (id) => {
  //   console.log(id);
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/${id}`);
  return data;
};

const updateHabit = async (prams) => {
  // console.log(prams);
  return await axios.patch(import.meta.env.VITE_API_URL, { ...prams });
};

export const useHabitDataById = (id) => {
  return useQuery(["habitsId"], () => getHabitById(id));
};

export const useUpdateHabit = () => {
  const queryClient = useQueryClient();
  return useMutation(updateHabit, {
    onSuccess: () => {
      queryClient.invalidateQueries(["habitsId"]);
    },
  });

  // const queryClient = useQueryClient();
  // return useMutation(updateHabit, {
  //   onMutate: async ({ id, monthIndex, dayIndex }) => {
  //     await queryClient.cancelQueries(["habitsId", id]);
  //     const previousHabitsData = queryClient.getQueryData(["habitsId", id]);
  //     // console.log(previousHabitsData);

  //     // Return the data to be used in the onError callback
  //     return { previousHabitsData, id, monthIndex, dayIndex };
  //   },
  //   onError: async (error, context) => {
  //     const { previousHabitsData, id } = context;
  //     console.log(context);

  //     if (previousHabitsData) {
  //       queryClient.setQueryData(["habitsId", id], previousHabitsData);
  //     }

  //     // return { id };

  //     // Handle the error or log it as needed
  //     // console.error("Mutation failed:", error);
  //   },
  //   onSettled: (_error, __variables, __prams) => {
  //     // console.log(variables);
  //     // if (variables && variables.id) {
  //     queryClient.invalidateQueries(["habitsId"]);
  //     // }
  //   },
  // });
};
