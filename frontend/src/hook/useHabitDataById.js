import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const updateHabit = async (prams) => {
  return await axios.patch(import.meta.env.VITE_API_URL, { ...prams });
};

export const useUpdateHabit = (id) => {
  const queryClient = useQueryClient();
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

      checkIsComplete = checkIsComplete ? false : true;

      queryClient.setQueriesData([["habits", id]], (oldQueryData) => {
        const newData = [...oldQueryData];
        newData[0].getFullYear[monthIndex].days[dayIndex].isComplete = true;
        return newData;
      });
    },
  });
};
