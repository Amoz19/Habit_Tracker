import { useMutation } from "react-query";
import axios from "axios";

const logoutFunction = async () => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_AUTH_API_URL}/logout`,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const useLogout = () => {
  return useMutation(logoutFunction);
};
