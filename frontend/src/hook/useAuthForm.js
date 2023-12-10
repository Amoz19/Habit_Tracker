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
    // console.log("THis is from hook", err);
  }
};

// const logoutFunction = async () => {
//   const { data } = await axios.delete(
//     `${import.meta.env.VITE_AUTH_API_URL}/logout`,
//     { withCredentials: true }
//   );
//   return data;
// };

export const useAuthFunction = () => {
  return useMutation((parmas) => authFunction(parmas.formData, parmas.query));
};

// export const useLogoutFunction = () => {
//   return useMutation(());
// };
