import React from "react";

function CategoryCard({ title, imageUrl }) {
  return (
    <>
      <div className="w-[250px] h-[100%] relative cursor-pointer sm:w-[200px] sm:h-[120px]">
        <img
          className="w-[100%] h-[100%] object-cover opacity-[0.8] brightness-[45%] hover:brightness-[35%]"
          src={imageUrl}
        />
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[25px] font-semibold text-[#ffffff] sm:text-[20px]">
          {title.toUpperCase()}
        </div>
      </div>
    </>
  );
}

export default CategoryCard;
