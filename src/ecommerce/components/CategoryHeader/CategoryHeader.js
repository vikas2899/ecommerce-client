import React from "react";
import { useRouter } from "next/router";
import CategoryCard from "../CategoryCard/CategoryCard";

function CategoryHeader({ data }) {
  const router = useRouter();

  const handleCategoryClick = (catId) => {
    router.push(`/category/${catId}`);
  };

  return (
    <div className="w-[100%] m-auto mt-5 h-[150px] flex gap-2 justify-between sm:h-[180px] sm:gap-[10px]">
      {data &&
        data.data.map((cat) => (
          <div onClick={() => handleCategoryClick(cat?._id)} key={cat?._id}>
            <CategoryCard title={cat?.name} imageUrl={cat?.image[0]} />
          </div>
        ))}
    </div>
  );
}

export default CategoryHeader;
