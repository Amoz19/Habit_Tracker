import axios from "axios";

const getAllHabits = async (userId) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/getUserData`,
    { userId }
  );
  return data;
};

const getHabitById = async (id) => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/${id}`);
  return data;
};

export const apiFunctions = {
  getAll: { func: getAllHabits, key: "habits" },
  get: { func: getHabitById, key: (id) => ["habits", id] },
};
