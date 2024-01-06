import React from "react";
import { formatCurrency } from "@/ecommerce/utils/utils";

function BagDetails({
  price,
  discount,
  noOfItems,
  onClick: onClickCustom,
  isDisabled = false,
}) {
  return (
    <div className="flex flex-col border-[1px] border-[lightgray] rounded-md p-[10px] shadow-md">
      <div className="border-b-[1px] border-[lightgray] pb-[10px]">
        <span className="text-[12px] text-[#535766] font-[550] uppercase">
          Price Details ({noOfItems} Items)
        </span>
      </div>
      <div className="border-b-[1px] border-[lightgray] py-[10px]">
        <div className="flex justify-between items-center">
          <span className="text-[14px] leading-[30px]">Total MRP</span>
          <span className="text-[14px] leading-[30px]">
            {formatCurrency(price + discount)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[14px] leading-[30px]">Discount on MRP :</span>
          <span className="text-[14px] leading-[30px]">
            {formatCurrency(discount)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[14px] leading-[30px]">Shipping Charges :</span>
          <span className="text-[14px] leading-[30px] uppercase text-[#258725] font-[550]">
            Free
          </span>
        </div>
      </div>
      <div>
        <div className="flex justify-between py-[10px]">
          <span className="text-[14px] font-[550]">Total Amount</span>
          <span className="text-[14px] font-[550]">
            {formatCurrency(price)}
          </span>
        </div>
        <div>
          <button
            className="tracking-[1px] uppercase w-[100%] text-[14px] bg-[#490b4e] text-[white] py-[10px] hover:bg-[#750e7c] disabled:cursor-not-allowed disabled:bg-[lightgray]"
            onClick={onClickCustom}
            disabled={isDisabled}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default BagDetails;
