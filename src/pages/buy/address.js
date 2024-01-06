import AddressCardSelectable from "@/ecommerce/components/AddressCard/AddressCardSelectable";
import BagDetails from "@/ecommerce/components/BagDetails/BagDetails";
import NotUserLogin from "@/ecommerce/components/CatchNotUserLogin/NotUserLogin";
import { useGetUserBagDetail } from "@/ecommerce/hooks/useBag";
import { useUserAddress } from "@/ecommerce/hooks/useProfile";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function CheckOutAddress({ user, onSelectAddress }) {
  const router = useRouter();
  const [selectAddress, setSelectAddress] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);
  const { isLoading, data } = useUserAddress(user?._id);
  const { isLoading: isBagLoading, data: userBagData } = useGetUserBagDetail({
    userid: user?._id,
  });

  const getShoppingCartPrice = () => {
    let discount = 0;
    let priceAfterDiscount = 0;
    userBagData?.data?.[0]?.items?.map((item) => {
      discount += item?.productId?.discount_price * item?.quantity;
      priceAfterDiscount += item?.productId?.price * item?.quantity;
    });

    setDiscount(discount);
    setPriceAfterDiscount(priceAfterDiscount);
  };

  const selectDeliveryAddress = (addressIndex) => {
    setSelectAddress(addressIndex);
  };

  useEffect(() => {
    getShoppingCartPrice();
  }, [userBagData]);

  const handleOrderCheckout = () => {
    onSelectAddress(data?.data?.[0]?.addresses[selectAddress]?._id);
  };

  if (!user) {
    return <NotUserLogin />;
  }

  return (
    <div className="w-[100%] flex justify-between gap-[100px] sm:flex-col">
      <div className="flex-[1.5]">
        <div className="mt-[20px] ">
          <span className="text-[20px] font-[600]">Select Address</span>
          <div>
            {data &&
              data?.data?.[0]?.addresses.map((address, index) => (
                <AddressCardSelectable
                  addressData={address}
                  key={address._id}
                  selected={selectAddress}
                  index={index}
                  selectAddress={selectDeliveryAddress}
                />
              ))}
            {(data?.data.length === 0 ||
              data?.data[0]?.addresses.length === 0) && (
              <div className="mt-[20px]">
                <span className="text-[15px]">
                  It appears that you have not saved any addresses. Visit your{" "}
                  <Link className="cursor-pointer underline" href={`/profile`}>
                    Profile (Manage Addresses)
                  </Link>{" "}
                  to make one.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 mt-[66px]">
        <BagDetails
          price={priceAfterDiscount}
          discount={discount}
          noOfItems={userBagData?.data?.[0]?.items?.length}
          onClick={handleOrderCheckout}
          isDisabled={
            data?.data.length === 0 || data?.data[0]?.addresses.length === 0
          }
        />
      </div>
    </div>
  );
}

export default CheckOutAddress;
