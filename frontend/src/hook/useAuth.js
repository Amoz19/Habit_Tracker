import axios from "axios";
import { useMutation } from "react-query";

const userAuthActionFn = async (formData, query) => {
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

export const useAuth = () => {
  return useMutation((parmas) =>
    userAuthActionFn(parmas.formData, parmas.query)
  );
};
