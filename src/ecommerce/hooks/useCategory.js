import { useQuery } from "react-query";
import { service } from "../axios/axios";

const getCategories = () => {
  return service.get("category/get");
};

const getCategory = (catId) => {
  return service.get(`category/get/${catId}`);
};

export const useGetCategories = () => {
  return useQuery("get-categories", () => getCategories(), {
    staleTime: 50000,
  });
};

export const useGetCategory = (catId) => {
  return useQuery(["get-category", catId], () => getCategory(catId), {
    staleTime: 50000,
    enabled: !!catId,
  });
};
