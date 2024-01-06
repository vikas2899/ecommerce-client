import { useQuery } from "react-query";
import { service } from "../axios/axios";

const getFilter = (catId) => {
  return service.get(`filter/get/${catId}`);
};

export const useGetFilter = (catId) => {
  return useQuery(["get-filter", catId], () => getFilter(catId), {
    staleTime: 50000,
    enabled: !!catId,
  });
};
