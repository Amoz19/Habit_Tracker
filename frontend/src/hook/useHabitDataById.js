import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

const getHabitById = async (id) => {
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
};
import { useDataFetch } from "./dataFetch";

export function useHabitDataById(id) {
  return useDataFetch(getHabitById, id);
}

export function useOtherDataById(id) {
  return useDataFetch(getOtherDataById, id);
}
