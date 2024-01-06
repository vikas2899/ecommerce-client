import React from "react";
import StarIcon from "@mui/icons-material/Star";
import { formatDate } from "@/ecommerce/utils/utils";

function ReviewCard({ commentData }) {
  return (
    <div className="mb-[20px]">
      <div className="flex items-center mb-[8px] justify-between">
        <div className="flex items-center gap-3">
          <div className="w-[35px] h-[35px] rounded-[100%] overflow-hidden">
            <img
              className="w-[100%] h-[100%] object-cover"
              src="https://img.freepik.com/free-icon/user_318-563642.jpg?w=2000"
            />
          </div>
          <div>
            <p className="text-[13px] font-[550]">{commentData?.username}</p>
          </div>
        </div>
        <div>
          <span className="text-[12px] text-[#454545]">
            {formatDate(commentData?.createdAt)}
          </span>
        </div>
      </div>
      <div className="justify-start">
        <div className="flex gap-3 items-center">
          <span
            className={`flex items-center gap-1  ${
              commentData?.rating >= 4
                ? "bg-[#46b586]"
                : commentData?.rating >= 2
                ? "bg-[#ffb75f]"
                : "bg-[#ff6464]"
            }  py-[3px] px-[6px] rounded-md`}
          >
            <span className="flex">
              <StarIcon
                style={{
                  color: "white",
                  fontSize: "14px",
                }}
              />
            </span>
            <span className="text-[white] text-[13px] font-[550]">
              {commentData?.rating}
            </span>
          </span>
          <span className="text-[13px] font-[550]">
            {commentData?.headline}
          </span>
        </div>
        <div className="pt-[8px]">
          <span className="text-[13px]">{commentData?.review}</span>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
