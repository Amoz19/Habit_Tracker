import { useMutation, useQuery, useQueryClient } from "react-query";
// import apiClient from "../services/api-client";
import axios from "axios";

const getHabitById = async (id) => {
  //   console.log(id);
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/${id}`);
  return data;
};

const updateHabit = async (specificData) => {
  console.log(specificData);
  return await axios.patch(import.meta.env.VITE_API_URL, specificData);
};

export const useHabitDataById = (id) => {
  return useQuery(["habitsId"], () => getHabitById(id));
};

export const useUpdateHabit = () => {
  const queryClient = useQueryClient();
  return useMutation(updateHabit, {
    onMutate: async (specificData) => {
      await queryClient.cancelQueries("habitsId");
      const previosHabitsData = queryClient.getQueriesData([
        "habitsId",
        specificData.id,
      ]);
      queryClient.setQueryData(["habitsId", specificData.id], (oldData) => {
        return {
          ...oldData,
          ...specificData,
        };
      });

      // Return the previous habits data to be used for rollback in case of an error
      return { previosHabitsData };
    },
    onError: async (error, specificData, context) => {
      // If there is an error, rollback to the previous habits data
      if (context?.previousHabitsData) {
        queryClient.setQueryData(
          ["habitsId", specificData.id],
          context.previosHabitsData
        );
      }
    },
    onSettled: () => {
      // Invalidate the "habitsId" query to refetch the updated data
      queryClient.invalidateQueries("habitsId");
    },

    //   queryClient.setQueriesData("habits", (oldQueryData) => {
    //     return [...oldQueryData, { ...newHabit }];
    //   });
    // },
  });
};
