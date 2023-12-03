// import axios from "axios";
import { useQuery } from "react-query";
const useCustomQuery = (key, queryFunction, queryDefault = {}) => {
  const queryKey = [key];
  return useQuery(queryKey, () => queryFunction(), { ...queryDefault });
};

export default useCustomQuery;
