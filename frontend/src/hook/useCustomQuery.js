import axios from "axios";
import { useQueries } from "react-query";

const useCustomQuery = (key, queryFunction, queryDefault = {}) => {
  const queryKey = [key];
  return useQueries(queryKey, () => queryFunction(), queryDefault);
};

export default useCustomQuery;
