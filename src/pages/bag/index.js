import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import EMPTY_BAG from "../../assets/images/emptyBag.png";
import BagCard from "@/ecommerce/components/BagCard/BagCard";
import BagDetails from "@/ecommerce/components/BagDetails/BagDetails";
import NotUserLogin from "@/ecommerce/components/CatchNotUserLogin/NotUserLogin";
import { useGetUserBagDetail } from "@/ecommerce/hooks/useBag";
import { CircularProgress } from "@mui/material";

function Bag() {
  const [user, setUser] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);
  const router = useRouter();

  const { isLoading, data } = useGetUserBagDetail({
    userid: user?._id,
  });

  const getShoppingCartPrice = () => {
    if (!data) return;
    let discount = 0;
    let priceAfterDiscount = 0;
    data?.data?.[0]?.items?.map((item) => {
      discount += item?.productId?.discount_price * item?.quantity;
      priceAfterDiscount += item?.productId?.price * item?.quantity;
    });

    setDiscount(discount);
    setPriceAfterDiscount(priceAfterDiscount);
  };

  const navigateToCheckout = () => {
    router.push("buy");
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    getShoppingCartPrice();
  }, [data]);

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

  if (data?.data?.[0]?.items.length <= 0 || data?.data?.length === 0) {
    return (
      <>
        <div className="w-[100%] min-h-screen flex justify-center items-center flex-col relative sm:text-center sm:w-[90%] sm:m-auto">
          <h1 className="text-[24px] font-bold sm:text-[18px]">
            Your bag is empty
          </h1>
          <span className="font-[550] sm:font-[400] sm:text-[14px]">
            Looks like you have not added anything to your bag. Go ahead and
            explore top categories.
          </span>
        </div>
        <img
          src={EMPTY_BAG.src}
          width={"100%"}
          alt=""
          className="absolute top-0 z-[-1] opacity-[0.2] scale-50 translate-y-[-5%] sm:top-[30%] sm:opacity-[0.5]"
        />
      </>
    );
  }

  return (
    <div className="min-h-screen w-[80%] sm:w-[95%] m-auto mt-[20px] flex gap-[100px] sm:flex-col">
      <div className="flex-[1.5] flex flex-col">
        <div className="flex flex-col">
          <span className="mb-[8px] text-[30px] sm:text-[18px]">My Bag </span>
          <span className="mb-[10px] text-[14px] font-[550]">
            {data && data?.data?.[0]?.items?.length | 0} Items
          </span>
        </div>
        <div>
          {data?.data?.[0]?.items?.map((item) => (
            <BagCard key={item._id} data={item} />
          ))}
        </div>
      </div>
      <div className="flex-[1] mt-[85px] sm:mb-[30px] sm:mt-[0px]">
        <BagDetails
          price={priceAfterDiscount}
          discount={discount}
          noOfItems={data?.data?.[0]?.items.length}
          onClick={navigateToCheckout}
        />
      </div>
    </div>
  );
}

export default Bag;
