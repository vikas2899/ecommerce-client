import React, { useRef } from "react";

function StarRating({ setRating, rating }) {
  const stars = ["⭐", "⭐", "⭐", "⭐", "⭐"];
  const starRefs = useRef([]);

  const handleStarClick = (idx) => {
    for (let i = 0; i < starRefs.current.length; i++) {
      starRefs.current[i].style.opacity = "50%";
      if (i <= idx) {
        starRefs.current[i].style.opacity = "100%";
      }
    }
    setRating(idx + 1);
  };
  return (
    <div>
      {stars &&
        stars.map((star, index) => (
          <a
            className="pr-[2px] opacity-[50%] cursor-pointer text-[15px]"
            onClick={() => handleStarClick(index)}
            ref={(el) => (starRefs.current[index] = el)}
            key={index}
            style={{ opacity: `${rating > index ? "100%" : "50%"}` }}
          >
            {star}
          </a>
        ))}
    </div>
  );
}

export default StarRating;
