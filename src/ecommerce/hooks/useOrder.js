import { useQuery, useMutation } from "react-query";
import { service } from "../axios/axios";

const createUserOrder = ({ userid, order }) => {
  return service.post("order/create/" + userid, order);
};

const getUserOrderDetails = (userid) => {
  return service.get("order/get/" + userid);
};

const getUserOrderDetail = (userid, orderid) => {
  return service.get("order/getById/" + userid, {
    params: {
      orderid: orderid,
    },
  });
};

const updateOrderRating = ({ userid, orderid, rating }) => {
  return service.post("order/update/" + userid, {
    data: {
      orderid: orderid,
      rating: rating,
    },
  });
};

export const useGetUserOrderDetail = ({ userid }) => {
  return useQuery(
    ["get-order-detail", userid],
    () => getUserOrderDetails(userid),
    {
      enabled: !!userid,
      refetchOnWindowFocus: false,
    }
  );
};

export const useCreateUserOrder = () => {
  return useMutation(createUserOrder);
};

export const useUpdateOrderRating = () => {
  return useMutation(updateOrderRating);
};

export const useGetUserOrderDetailById = ({ userid, orderid }) => {
  return useQuery(
    ["get-order-detailById", orderid],
    () => getUserOrderDetail(userid, orderid),
    {
      enabled: !!userid && !!orderid,
      refetchOnWindowFocus: false,
    }
  );
};
