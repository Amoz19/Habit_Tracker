import { useMutation, useQuery, useQueryClient } from "react-query";
// import apiClient from "../services/api-client";
import axios from "axios";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const getHabits = async () => {
  const { data } = await axios.get(import.meta.env.VITE_API_URL);
  return data;
};

const addNewHabit = (habitName) => {
  return axios.post(import.meta.env.VITE_API_URL, habitName);
};
export const useHabitData = () => {
  return useQuery(["habits"], getHabits, { refetchOnMount: false });
};

export const addHabitData = () => {
  const queryClient = useQueryClient();
  return useMutation(addNewHabit, {
    onSuccess: () => {
      queryClient.invalidateQueries("habits");
      toast.success("Success, Please wait for update...");
    },
  });
};
