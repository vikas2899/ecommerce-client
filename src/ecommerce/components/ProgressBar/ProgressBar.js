import React from "react";

function ProgressBar({ step }) {
  return (
    <div>
      <div className="pb-[1px] flex justify-between items-center w-full px-14">
        <div
          className={`w-[14px] h-[14px] bg-[#64da64] rounded-[50%] border-[1px]`}
        ></div>
        <div className="w-[250px] border-[1px] h-[0px]"></div>
        <div
          className={`w-[14px] h-[14px] border-[1px] ${
            step === 1 ? "bg-[#64da64]" : "bg-[#c9c9c9]"
          }  rounded-[50%]`}
        ></div>
      </div>
      <div className="pb-2 flex justify-between items-center w-full px-10">
        <span className="text-[12px] font-[550]">Address</span>
        <span className="text-[12px] font-[550]">Payment</span>
      </div>
    </div>
  );
}

export default ProgressBar;
