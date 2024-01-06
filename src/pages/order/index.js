import React, { useState, useEffect } from "react";
import OrderCard from "@/ecommerce/components/OrderCard/OrderCard";
import NotUserLogin from "@/ecommerce/components/CatchNotUserLogin/NotUserLogin";
import EMPTY_ORDER from "../../assets/images/emptyOrder.png";
import { CircularProgress } from "@mui/material";
import { useGetUserOrderDetail } from "@/ecommerce/hooks/useOrder";

function OrderPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const { isLoading, data } = useGetUserOrderDetail({
    userid: user?._id,
  });

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

  if (data?.data?.[0]?.orders?.length === 0 || data?.data?.length <= 0) {
    return (
      <>
        <div className="w-[100%] min-h-screen flex justify-center items-center flex-col relative">
          <h1 className="text-[24px] font-bold sm:text-[18px]">
            Nothing to display
          </h1>
          <span className="font-[550] sm:font-[400] sm:text-[14px]">
            It appears that you haven&#39;t made any purchases from us.
          </span>
        </div>
        <img
          src={EMPTY_ORDER.src}
          width={"100%"}
          alt=""
          className="absolute top-0 z-[-1] opacity-[0.2] scale-50 translate-y-[-5%] sm:top-[30%] sm:opacity-[0.5]"
        />
      </>
    );
  }

  return (
    <div className="min-h-screen w-[80%] m-auto mt-[20px] sm:w-[95%]">
      <h1 className="text-[24px] font-[520]  sm:text-[18px]">Your Orders</h1>
      <div className="flex mt-[20px]">
        <div className="flex-[4] sm:w-[300px]">
          {data &&
            data?.data?.[0]?.orders.map((order) => (
              <OrderCard key={order._id} orderData={order} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
