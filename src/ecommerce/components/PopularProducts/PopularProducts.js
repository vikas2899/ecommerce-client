import React from "react";
import ProductGrid from "@/ecommerce/common/ProductGrid/ProductGrid";
import { CircularProgress } from "@mui/material";
import { useGetProductsInCategoryAndTag } from "@/ecommerce/hooks/useProducts";

function PopularProducts({ categoryId }) {
  const { data, isLoading, error } = useGetProductsInCategoryAndTag({
    categoryId: categoryId,
    tag: "bestseller",
  });

  if (isLoading) {
    return (
      <div className="text-center">
        <CircularProgress />
      </div>
    );
  }

  if (data?.data?.length <= 0) return;

  return (
    <div className="w-[100%]">
      <ProductGrid productData={data?.data} />
    </div>
  );
}

export default PopularProducts;
