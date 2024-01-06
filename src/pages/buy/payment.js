import React from "react";
import Link from "next/link";
import VerifiedIcon from "@mui/icons-material/Verified";

function Payment() {
  return (
    <div className="w-[100%] min-h-[70vh] flex justify-center items-center flex-col">
      <div className="flex items-center gap-2">
        <h1 className="text-[24px] font-[550]">Order Placed</h1>
        <span>
          <VerifiedIcon style={{ color: "#00DB70" }} />
        </span>
      </div>
      <span className="text-center sm:text-[14px]">
        We appreciate you using our online store.
      </span>
      <span className="text-center sm:text-[14px]">
        Please check your mailbox (including spam) for order confirmation.
      </span>
    </div>
  );
}

export default Payment;
