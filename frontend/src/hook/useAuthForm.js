import { useMutation, useQueries, useQuery } from "react-query";
import axios from "axios";

const authFunction = async (formData, query) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_AUTH_API_URL}/${query}`,
      formData,
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    throw new Error(err.response.data);
  }
};

const logoutFunction = async (query) => {
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_AUTH_API_URL}/${query}`,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const getUserFunction = async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_AUTH_API_URL}/authChecker`,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const useAuthFunction = () => {
  return useMutation((parmas) => authFunction(parmas.formData, parmas.query));
};

export const useLogoutFunction = () => {
  return useMutation((query) => logoutFunction(query));
};

export const useGetUserFunction = () => {
  return useQuery("user", getUserFunction, { retry: false });
};
