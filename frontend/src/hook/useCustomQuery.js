import { useQuery } from "react-query";

export const useCustomQuery = (queryFunc, key, queryOptions = {}) => {
  const queryKey = [key];
  return useQuery(queryKey, () => queryFunc(), { ...queryOptions });
};
