import { formatCurrency } from "@/ecommerce/utils/utils";
import { useRouter } from "next/router";
import React from "react";

function OrderDetailCard({ orderData, addressData }) {
  const router = useRouter();

  const handleNavigation = (pid) => {
    router.push(`/product/${pid}`);
  };

  return (
    <div className="flex flex-col border-[1px] border-[lightgray] h-[350px] sm:h-[380px] rounded-md overflow-hidden">
      <div className="pt-[15px] flex flex-col w-[97%] mx-auto sm:w-[95]">
        <div className="flex justify-between mb-[50px] sm:flex-col gap-5 sm:mb-[10px]">
          <div className="flex flex-col flex-[1]">
            <span className="font-[550] text-[14px] sm:text-[12px]">
              Shipping Address
            </span>
            <div className="flex flex-col gap-[2px]">
              <span className="flex-wrap text-[14px] sm:text-[12px]">
                {addressData?.name + " - " + addressData?.addressType}
              </span>
              <span className="flex-wrap text-[14px] sm:text-[12px]">
                {addressData?.phone}
              </span>
              <span className="flex-wrap text-[14px] sm:text-[12px]">
                {addressData?.addressLine1 + ", " + addressData?.state}
              </span>
            </div>
          </div>
          <div className="flex flex-col flex-[1] justify-end">
            <span className="font-[550] text-[14px] sm:text-[12px]">
              Order Summary
            </span>
            <div className="flex justify-between sm:text-[12px]">
              <span>Item(s) Subtotal:</span>
              <span>{formatCurrency(orderData?.amount)} </span>
            </div>
            <div className="flex justify-between sm:text-[12px]">
              <span>Shipping:</span>
              <span>0.00 </span>
            </div>
            <div className="flex justify-between sm:text-[12px]">
              <span>Total:</span>
              <span>{formatCurrency(orderData?.amount)} </span>
            </div>
            <div className="flex justify-between font-[600] sm:text-[12px]">
              <span>Grand Total:</span>
              <span>{formatCurrency(orderData?.amount)} </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div>
              {orderData?.status !== "pending" ? (
                <span className="font-[550] text-[14px]">
                  Delivered 13 March 2023
                </span>
              ) : (
                <span
                  className={`${
                    orderData.status === "delivered"
                      ? "text-[#1dad1d]"
                      : "text-[#e08331]"
                  } text-[12px] uppercase font-[600]`}
                >
                  {orderData.status}
                </span>
              )}
            </div>
            <div className="mt-[15px] flex items-center gap-5 sm:pb-5">
              <div className="w-[100px] h-[100px] rounded-md overflow-hidden sm:w-[250px] sm:mt-3">
                <img
                  className="w-[100%] h-[100%] object-cover cursor-pointer"
                  src={orderData?.productId?.image?.primary}
                  onClick={() => handleNavigation(orderData?.productId?._id)}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-[550] sm:text-[12px]">
                  {orderData?.productId?.brand}
                </span>
                <span className="text-[14px] text-[#858585] sm:text-[12px]">
                  {orderData?.productId?.name}
                </span>
                <span className="text-[14px] text-[#858585] sm:text-[12px]">
                  Quantity - {orderData?.quantity}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailCard;
