import React from "react";
import { formatAddress } from "@/ecommerce/utils/utils";

function AddressCardSelectable({
  addressData,
  selected,
  index,
  selectAddress,
}) {
  const selectCurrentAddress = () => {
    selectAddress(index);
  };

  return (
    <div
      className={`border-[1px] mt-4 p-4 rounded-md shadow-md cursor-pointer ${
        selected === index ? "bg-[#e7e7ff]" : ""
      } transition-all ease-in-out duration-[500ms]`}
      onClick={() => selectCurrentAddress()}
    >
      <div className="flex items-center justify-between">
        <span className="text-[#878787] text-[11px] font-[550] px-[7px] py-[4px] bg-[#f0f0f0] rounded-[2px]">
          {addressData.addressType}
        </span>
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

export default AddressCardSelectable;
