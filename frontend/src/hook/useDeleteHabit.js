import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const deleteHabit = async (id, token) => {
  return await axios.delete(`${import.meta.env.VITE_API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const useDeleteHabit = () => {
  const queryClient = useQueryClient();
  return useMutation(({ id, token }) => deleteHabit(id, token), {
    onMutate: (variables) => {
      queryClient.cancelQueries("habits");
      // const previousHabitsData = queryClient.getQueriesData(["habits"]);
      queryClient.setQueriesData("habits", (oldData) => {
        // console.log(oldData);
        const newData = oldData.filter(
          (item) => item.uniqueId !== variables.id
        );
        console.log(newData);
        return newData;
      });
      // return { previousHabitsData };
    },
  });
};
