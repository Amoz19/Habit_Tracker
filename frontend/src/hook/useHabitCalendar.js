import axios from "axios";
import { useQuery } from "react-query";

const getHabitCalendarById = async (id, token) => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useHabitCalendar = (id, token) => {
  return useQuery({
    queryKey: ["habits", id],
    queryFn: () => getHabitCalendarById(id, token),
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  });
};
