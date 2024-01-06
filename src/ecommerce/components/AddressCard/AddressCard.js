import React from "react";
import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone";
import { formatAddress } from "@/ecommerce/utils/utils";

function AddressCard({ addressData, onDelete }) {
  return (
    <div className="border-[1px] mt-4 p-4">
      <div className="flex items-center justify-between">
        <span className="text-[#878787] text-[11px] font-[550] px-[7px] py-[4px] bg-[#f0f0f0] rounded-[2px]">
          {addressData.addressType}
        </span>
        <div className=" flex flex-col items-center cursor-pointer relative group">
          <MoreVertTwoToneIcon />
          <div className="absolute hidden flex-col bg-[#faf7f7] top-5 z-10 right-0 pb-[10px] rounded-md rounded-tl-none shadow-md group-hover:flex">
            {/* <span className="px-[10px] py-[5px] pr-[50px] text-[14px] flex items-center hover:bg-white">
              Edit
            </span> */}
            <span
              className="px-[10px] py-[5px] pr-[50px] text-[14px] hover:bg-[#ff9494]"
              onClick={() => onDelete(addressData._id)}
            >
              Delete
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-3">
        <h1 className="font-bold text-[14px]">{addressData.name}</h1>
        <h1 className="font-bold text-[14px]"> {addressData.phone}</h1>
      </div>
      <div className="flex items-center gap-4 mt-2">
        <h1 className="font-medium text-[#212121] text-[14px]">
          {formatAddress(addressData)}
        </h1>
      </div>
    </div>
  );
}

export default AddressCard;
