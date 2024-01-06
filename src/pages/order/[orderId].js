import React, { useState, useEffect } from "react";
import OrderDetailCard from "@/ecommerce/components/OrderDetailCard/OrderDetailCard";
import NotUserLogin from "@/ecommerce/components/CatchNotUserLogin/NotUserLogin";
import { useGetUserOrderDetailById } from "@/ecommerce/hooks/useOrder";
import { useRouter } from "next/router";
import { formatDate } from "@/ecommerce/utils/utils";
import { useUserAddressByID } from "@/ecommerce/hooks/useProfile";
import { CircularProgress } from "@mui/material";

function OrderDetail() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const orderid = router.query.orderId;

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const { isLoading, data } = useGetUserOrderDetailById({
    userid: user?._id,
    orderid: orderid,
  });

  const { isLoading: isAddressLoading, data: addressData } = useUserAddressByID(
    {
      userid: user?._id,
      addressid: data?.data?.[0]?.orders?.[0]?.shippingAddress,
    }
  );

  if (!user) {
    return <NotUserLogin />;
  }

  if (isLoading) {
    return (
      <div className="text-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-[80%] m-auto mt-[20px] sm:w-[95%]">
      <h1 className="text-[24px] font-[520]  sm:text-[18px]">Order Details</h1>
      <div className="flex mt-[20px] flex-col">
        <div className="flex mb-[10px] sm:flex-col">
          <div className="px-[30px] pl-[0]">
            <span className="text-[14px] flex gap-1 sm:text-[12px]">
              Ordered on
              <span className="uppercase sm:text-[12px]">
                {formatDate(data?.data?.[0]?.orders?.[0]?.orderDate)}
              </span>
            </span>
          </div>
          <div className="border-l-[1px] border-l-[lightgray] px-[30px] sm:border-none sm:px-[0px]">
            <span className="text-[14px] sm:text-[12px]">
              Order # {data?.data?.[0]?._id}
            </span>
          </div>
        </div>
        <div className="flex-[4]">
          <OrderDetailCard
            isSummary={true}
            orderData={data?.data?.[0]?.orders?.[0]}
            addressData={addressData?.data?.[0]?.addresses?.[0]}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
