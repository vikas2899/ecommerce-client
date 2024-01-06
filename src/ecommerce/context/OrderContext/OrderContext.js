import React, { useContext, useState, useEffect } from "react";
import { useGetUserBagDetail } from "@/ecommerce/hooks/useBag";
import { useCreateUserOrder } from "@/ecommerce/hooks/useOrder";
import { useShoppingBag } from "../BagContext/BagContext";

const OrderContext = React.createContext({});

export function useOrder() {
  return useContext(OrderContext);
}

export function OrderProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const { isLoading, data, isFetching, refetch } = useGetUserBagDetail({
    userid: user?._id,
  });

  const { mutate: createOrder } = useCreateUserOrder();
  const { clearUserBag } = useShoppingBag();

  const prepareUserOrder = (shippingAddress) => {
    const orderData = [];
    data?.data?.[0]?.items.forEach((bagData) => {
      const detail = {
        productId: bagData.productId._id,
        amount: bagData.productId.price * bagData.quantity,
        status: "pending",
        quantity: bagData.quantity,
        shippingAddress: shippingAddress,
      };
      orderData.push(detail);
    });
    return orderData;
  };

  const createUserOrder = (shippingAddress, callback) => {
    const order = prepareUserOrder(shippingAddress);
    const orderData = {
      userid: user?._id,
      order,
    };
    createOrder(orderData, {
      onSuccess: () => {
        callback();
        clearUserBag(user?._id);
      },
      onError: () => {
        alert("Something went wrong while creating the order.");
      },
    });
  };

  return (
    <OrderContext.Provider
      value={{
        prepareUserOrder,
        createUserOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
