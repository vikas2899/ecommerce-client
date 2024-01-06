import { useQuery } from "react-query";
import { service } from "../axios/axios";

const getProductsInCategory = (categoryId, tag) => {
  if (tag && categoryId) {
    return service.get(`product/get?categoryId=${categoryId}&tag=${tag}`);
  } else if (categoryId) {
    return service.get(`product/get?categoryId=${categoryId}`);
  } else if (tag) {
    return service.get(`product/get?tag=${tag}`);
  }
};

const getProductsInCategoryAndFilter = (categoryId, filterString = "") => {
  if (categoryId && filterString) {
    return service.get(`product/get?categoryId=${categoryId}&${filterString}`);
  }
};

const getProduct = (productId) => {
  return service.get(`product/get/${productId}`);
};

export const useGetProductsInCategoryAndTag = ({ categoryId, tag }) => {
  return useQuery(
    ["get-category-product", { categoryId, tag }],
    () => getProductsInCategory(categoryId, tag),
    {
      enabled: !!categoryId,
      staleTime: 50000,
    }
  );
};

export const useGetProductsInCategoryAndFilter = ({
  categoryId,
  filterQuery,
}) => {
  return useQuery(
    ["get-category-product-filter", { categoryId, filterQuery }],
    () => getProductsInCategoryAndFilter(categoryId, filterQuery),
    {
      enabled: !!categoryId && !!filterQuery,
    }
  );
};

export const useGetProductsInCategory = (categoryId) => {
  return useQuery(
    ["get-category-product", categoryId],
    () => getProductsInCategory(categoryId),
    {
      enabled: !!categoryId,
      staleTime: 50000,
    }
  );
};

export const useGetProduct = (productId) => {
  return useQuery(["get-product", productId], () => getProduct(productId), {
    staleTime: 50000,
    enabled: !!productId,
  });
};
