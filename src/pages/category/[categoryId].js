import React, { useState } from "react";
import FilterContainer from "@/ecommerce/common/FilterContainer/FilterContainer";
import ProductCard from "@/ecommerce/common/ProductCard/ProductCard";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import NO_PRODUCTS from "../../assets/images/emptyProducts.png";
import {
  useGetProductsInCategory,
  useGetProductsInCategoryAndFilter,
} from "@/ecommerce/hooks/useProducts";
import { useGetCategory } from "@/ecommerce/hooks/useCategory";
import { useGetFilter } from "@/ecommerce/hooks/useFilter";

function ProductsInCategory() {
  const router = useRouter();
  const categoryId = router.query.categoryId;
  const [filterQuery, setFilterQuery] = useState("");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const { isLoading, data } = useGetProductsInCategory(categoryId);
  const { isLoading: isCatLoading, data: categoryData } =
    useGetCategory(categoryId);

  const { isLoading: isFilterLoading, data: filterData } =
    useGetFilter(categoryId);

  const { isLoading: isFilteredDataLoading, data: filteredData } =
    useGetProductsInCategoryAndFilter({
      categoryId,
      filterQuery,
    });

  const onFilterSelection = (filterQuery) => {
    setFilterQuery(filterQuery);
  };

  const handleOnClose = () => {
    setShowMobileFilter(false);
  };

  if (isLoading) {
    return (
      <div className="text-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="mt-[20px] w-[97%] mx-auto min-h-screen mb-[100px]">
      <div className="hidden sm:flex sm:mb-[10px] border-[1px] h-[40px]">
        <div
          className="w-[100%] flex justify-center items-center gap-[5px]"
          onClick={() => setShowMobileFilter(true)}
        >
          <FilterAltIcon fontSize="small" />
          <span className="text-[15px]">Filter</span>
        </div>
      </div>
      {showMobileFilter && (
        <div className="hidden sm:block sm:absolute sm:top-0 sm:z-[10000] sm:bottom-0 sm:left-0 sm:right-0 sm:bg-white">
          <div className="flex-1 w-[95%] m-auto mt-[10px]">
            <FilterContainer
              criteria={filterData?.data}
              onFilterSelection={onFilterSelection}
              onClose={handleOnClose}
            />
          </div>
        </div>
      )}
      <div className="flex gap-2 items-center">
        <h1 className="font-bold sm:text-[14px]">
          Showing results for {categoryData?.data?.name}
        </h1>
        <p className="text-[#9f9f9f] text-[14px]">
          - {filterQuery === "" ? data?.data.length : filteredData?.data.length}{" "}
          items
        </p>
      </div>
      <div className="flex mt-[25px] gap-[20px]">
        <div className="flex-[1.1] sm:hidden">
          <FilterContainer
            criteria={filterData?.data}
            onFilterSelection={onFilterSelection}
          />
        </div>
        <div className="flex-[4] w-auto sm:flex sm:justify-between">
          <div className="flex flex-wrap gap-8 sm:gap-[5px] sm:justify-between">
            {filterQuery === ""
              ? data?.data.map((product) => (
                  <ProductCard data={product} key={product?._id} />
                ))
              : filteredData?.data.map((product) => (
                  <ProductCard data={product} key={product?._id} />
                ))}
            {data?.data.length === 0 ? (
              <div className="min-h-screen relative w-[100%] flex justify-center items-center">
                <p className="font-bold">No Products found.</p>
                <img
                  src={NO_PRODUCTS.src}
                  alt=""
                  className="top-0 absolute z-[-1] opacity-[0.2] w-[100%] h-[100%] object-cover scale-[0.5]"
                />
              </div>
            ) : null}
            {filteredData?.data.length === 0 ? (
              <div className="min-h-screen relative w-[100%] flex justify-center items-center">
                <p className="font-bold">No Products found.</p>
                <img
                  src={NO_PRODUCTS.src}
                  alt=""
                  className="top-0 absolute z-[-1] opacity-[0.2] w-[100%] h-[100%] object-cover scale-[0.5]"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsInCategory;
