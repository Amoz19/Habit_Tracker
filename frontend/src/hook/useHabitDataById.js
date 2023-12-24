import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const updateHabit = async (prams) => {
  return await axios.patch(import.meta.env.VITE_API_URL, { ...prams });
};

const deleteHabit = async (id) => {
  return await axios.delete(`${import.meta.env.VITE_API_URL}/${id}`);
};

export const useUpdateHabit = (id) => {
  const queryClient = useQueryClient();
  // return useMutation(updateHabit, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries([["habits", id]]);
  //   },
  // });
  return useMutation(updateHabit, {
    onMutate: (variables) => {
      queryClient.cancelQueries([["habits", id]]);
      const previosHabitsData = queryClient.getQueriesData([["habits", id]]);
      const getpreviosData = previosHabitsData[0][1];
      const modifyData = getpreviosData[0].getFullYear;

      const monthIndex = modifyData.findIndex(
        (data) => data._id === variables.monthIndex
      );

      const getAllDays = modifyData[monthIndex].days;

      const dayIndex = getAllDays.findIndex(
        (data) => data._id === variables.dayIndex
      );

      let checkIsComplete = getAllDays[dayIndex].isComplete;

      // getAllDays[dayIndex].isComplete = !checkIsComplete;

      queryClient.setQueriesData([["habits", id]], (oldQueryData) => {
        const newData = [...oldQueryData];
        newData[0].getFullYear[monthIndex].days[dayIndex].isComplete =
          !checkIsComplete;
        return newData;
      });

      return { previosHabitsData };
    },
  });
};

export const useDeleteHabit = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteHabit, {
    onMutate: (variables) => {
      queryClient.cancelQueries(["habits"]);
      const previosHabitsData = queryClient.getQueriesData(["habits"]);
      queryClient.setQueriesData(["habits"], (oldData) => {
        const newData = oldData.filter((item) => item._id !== variables);
        return newData;
      });
      return { previosHabitsData };
    },
    onSettled: (_err, _deletedItemId, context) => {
      if (context?.previousHabitsData) {
        queryClient.setQueryData(["habits"], context.previousHabitsData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["habits"]);
    },
  });
};
