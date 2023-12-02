import axios from "axios";

const getAllHabits = async () => {
  const { data } = await axios.get(import.meta.env.VITE_API_URL);
  console.log(data);
  return data;
};

const getHabitById = async (id) => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/${id}`);
  return data;
};

export const apiFunctions = {
  getAll: { key: "habits", func: getAllHabits },
  getById: { key: "habit", func: getHabitById },
};
