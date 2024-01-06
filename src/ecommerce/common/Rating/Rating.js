import React from "react";
import StarIcon from "@mui/icons-material/Star";

function Rating({ rating, review }) {
  return (
    <div className="border-[1px] border-[lightgray] w-[120px] flex gap-1 px-[5px] py-[3px] items-center justify-center">
      <div className="flex items-center">
        <span className="text-[14px] mr-[2px] font-semibold">{rating}</span>
        <span className="border-r-[1px] border-[#a1a1a1] mr-[4px] flex">
          <StarIcon
            style={{
              color: "#46b586",
              fontSize: "15px",
              display: "flex",
              marginRight: "4px",
            }}
          />
        </span>
      </div>
      <div className="flex">
        <span className="text-[13px] text-[#666666]">{review} Rating</span>
      </div>
    </div>
  );
}

export default Rating;
