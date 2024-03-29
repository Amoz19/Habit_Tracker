import axios from "axios";
import { useQuery } from "react-query";

const getAllHabits = async (token) => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/habits`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAllHabits = (token) => {
  return useQuery({
    queryKey: ["habits"],
    queryFn: () => getAllHabits(token),
    enabled: !!token,
  });
};
