import axios from "axios";

const getAllHabits = async () => {
  const { data } = await axios.get(import.meta.env.VITE_API_URL);
  return data;
};

const getHabitById = async (id) => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/${id}`);
  return data;
};

export const habitApiFunctions = {
  getAll: { func: getAllHabits, key: "habits" },
  get: { func: getHabitById, key: (id) => ["habits", id] },
};
