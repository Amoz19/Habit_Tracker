import axios from "axios";

export const getHabits = async () => {
  const { data } = await axios.get(import.meta.env.VITE_API_URL);
  return data;
};

export const getHabitById = async (id) => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/${id}`);
  return data;
};

export const habitApiFunctions = {
  getAll: { func: getHabits, key: "habits" },
  get: { func: getHabitById, key: "habit" },
};
