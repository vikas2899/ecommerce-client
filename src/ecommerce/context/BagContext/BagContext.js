import React, { useContext, useState, useEffect } from "react";
import {
  useGetUserBagDetail,
  useAddProductToBag,
  useRemoveProductFromBag,
  useClearUserBag,
  useUpdateBag,
} from "@/ecommerce/hooks/useBag";

const BagContext = React.createContext({});

export function useShoppingBag() {
  return useContext(BagContext);
}

export function ShoppingBagProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userBagData, setUserBagData] = useState([]);
  const [userBagDataCount, setUserBagDataCount] = useState(0);

  const { isLoading, data, isFetching, refetch } = useGetUserBagDetail({
    userid: user?._id,
  });

  const { mutate: addToBag } = useAddProductToBag();
  const { mutate: removeFromBag } = useRemoveProductFromBag();
  const { mutate: updateBag } = useUpdateBag();
  const { mutate: clearBag } = useClearUserBag();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    setUserBagDataCount(data?.data?.[0]?.items?.length);
  }, []);

  const getShoppingBagData = (flag = false) => {
    if (flag) refetch();
    setUserBagData(data?.data?.[0]?.items);
    setUserBagDataCount(data?.data?.[0]?.items?.length || 0);
    return userBagData;
  };

  const getShoppingBagCount = (isRefetch = false) => {
    getShoppingBagData(isRefetch);
    return userBagDataCount;
  };

  const addProductToBag = (bagData) => {
    addToBag(bagData, {
      onSuccess: () => {
        getShoppingBagCount(true);
      },
    });
  };

  const updateUserBag = (bagData) => {
    updateBag(bagData, {
      onSuccess: () => {
        getShoppingBagCount(true);
      },
    });
  };

  const removeProductFromBag = (bagData) => {
    removeFromBag(bagData, {
      onSuccess: () => {
        getShoppingBagCount(true);
      },
    });
  };

  const clearUserBag = (userid) => {
    clearBag(userid, {
      onSuccess: () => {
        getShoppingBagCount(true);
      },
    });
  };

  const checkProductInBagStatus = (productId) => {
    if (!user) return false;
    const item = userBagData?.filter(
      (item) => item.productId._id === productId
    );
    return item?.length > 0;
  };

  const totalCostOfBag = () => {
    if (!user) return;
  };

  const onClear = () => {
    setUserBagData();
    setUserBagDataCount(0);
  };

  return (
    <BagContext.Provider
      value={{
        getShoppingBagCount,
        getShoppingBagData,
        addProductToBag,
        updateUserBag,
        removeProductFromBag,
        onClear,
        checkProductInBagStatus,
        totalCostOfBag,
        clearUserBag,
      }}
    >
      {children}
    </BagContext.Provider>
  );
}
