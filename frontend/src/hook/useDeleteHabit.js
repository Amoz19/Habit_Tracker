import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const deleteHabit = async (id) => {
  return await axios.delete(`${import.meta.env.VITE_API_URL}/${id}`);
};

export const useDeleteHabit = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteHabit, {
    onMutate: (variables) => {
      queryClient.cancelQueries(["habits"]);
      const previousHabitsData = queryClient.getQueriesData(["habits"]);
      queryClient.setQueriesData(["habits"], (oldData) => {
        const newData = oldData.filter((item) => item.uniqueId !== variables);
        console.log(newData);
        return newData;
      });
      return { previousHabitsData };
    },
  });
};
