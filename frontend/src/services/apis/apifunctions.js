import axios from "axios";
import useAuthContext from "../../hook/useAuthContext";

export const getAllHabits = async (token) => {
  if (!token) {
    return;
  }
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/habits`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const getHabitById = async (id) => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/${id}`);
  return data;
};

export const apiFunctions = {
  getAll: {
    func: getAllHabits,
    key: "habits",
  },
  get: { func: getHabitById, key: (id) => ["habits", id] },
};
