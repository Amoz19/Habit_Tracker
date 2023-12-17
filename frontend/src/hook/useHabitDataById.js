import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

// const getHabitById = async (id) => {
//   const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/${id}`);
//   return data;
// };

const updateHabit = async (prams) => {
  // console.log(prams);
  return await axios.patch(import.meta.env.VITE_API_URL, { ...prams });
};

// export const useHabitDataById = (id) => {
//   return useQuery(["habitsId"], () => getHabitById(id));
// };

export const useUpdateHabit = (id) => {
  const queryClient = useQueryClient();
  return useMutation(updateHabit, {
    // onSuccess: () => {
    //   queryClient.invalidateQueries([["habits", id]]);
    // },
    onMutate: (variables) => {
      queryClient.cancelQueries([["habits", id]]);
      const previosHabitsData = queryClient.getQueriesData([["habits", id]]);
      const getpreviosData = previosHabitsData[0][1];
      const modifyData = getpreviosData[0].getFullYear;

      console.log(previosHabitsData);

      const monthIndex = modifyData.findIndex(
        (data) => data._id === variables.monthIndex
      );

      const getAllDays = modifyData[monthIndex].days;

      const dayIndex = getAllDays.findIndex(
        (data) => data._id === variables.dayIndex
      );

      getAllDays[dayIndex].isisComplete = true;

      queryClient.setQueriesData([["habits", id]], (oldQueryData) => {
        const newData = [...oldQueryData];
        newData[0].getFullYear[monthIndex].days[dayIndex].isComplete = true;
        return newData;
      });
    },
  });
};
