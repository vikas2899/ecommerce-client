import React from "react";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import StarIcon from "@mui/icons-material/Star";
import ReviewCard from "../ReviewCard/ReviewCard";

function Review({ data, onClick }) {
  const getAverageRating = (data) => {
    const totalRating = data.reduce((acc, curr) => {
      return acc + curr.rating;
    }, 0);
    return (totalRating / data.length).toFixed(1);
  };

  return (
    <div className="border-t-[2px] pt-[20px]">
      <div>
        <div className="flex justify-between items-center">
          <span className="flex gap-2">
            <span>
              <ModeCommentIcon />
            </span>
            <p className="text-[18px] font-[550] sm:text-[14px]">
              Customer Reviews
            </p>
          </span>
          <span>
            <button
              className="text-[12px] border-[1px] px-[10px] py-[5px] shadow-md rounded-md hover:bg-[#e0f6ff]"
              onClick={onClick}
            >
              Write a product review
            </button>
          </span>
        </div>
        {data &&
        (data?.data?.length === 0 ||
          data?.data?.[0]?.comments?.length === 0) ? (
          <div className="flex justify-center mt-[20px] text-[#9a9898] text-[14px] italic">
            Be the first to write the product review
          </div>
        ) : (
          <span className="flex items-center gap-2 sm:mt-2">
            <span className="flex items-center gap-[4px]">
              <span className="text-[20px] sm:text-[16px] ">
                {data?.data?.[0]?.comments &&
                  getAverageRating(data?.data?.[0]?.comments)}
              </span>
              <span className="flex">
                <StarIcon
                  style={{
                    color: "green",
                    fontSize: "16px",
                  }}
                />
              </span>
            </span>
            <span className="flex text-[14px] text-[#5c5c5c] sm:text-[12px]">
              {data?.data?.[0]?.comments?.length}{" "}
              {data?.data?.[0]?.comments?.length === 1 ? "Review" : "Reviews"}
            </span>
          </span>
        )}
      </div>
      <div className="pt-[20px] h-[380px] overflow-y-auto sm:no-scrollbar">
        {data &&
          data?.data?.[0]?.comments?.map((comment) => (
            <ReviewCard key={comment._id} commentData={comment} />
          ))}
      </div>
    </div>
  );
}

export default Review;
