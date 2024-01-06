import { useQuery, useMutation } from "react-query";
import { service } from "../axios/axios";

const getUserBagDetail = (userid) => {
  return service.get("bag/get/" + userid);
};

const addItemToUserBag = ({ userid, ...allData }) => {
  const bagData = { ...allData };
  return service.post("bag/addToBag/" + userid, bagData);
};

const updateUserBag = ({ userid, ...allData }) => {
  const bagData = { ...allData };
  return service.put("bag/updateBag/" + userid, bagData);
};

const removeItemFromBag = ({ userid, productId }) => {
  return service.delete("bag/removeFromBag/" + userid, {
    params: {
      pid: productId,
    },
  });
};

const clearUserBag = (userid) => {
  return service.delete("bag/clearBag/" + userid);
};

export const useGetUserBagDetail = ({ userid }) => {
  return useQuery(["get-bag-detail", userid], () => getUserBagDetail(userid), {
    enabled: !!userid,
    refetchOnWindowFocus: false,
  });
};

export const useAddProductToBag = () => {
  return useMutation(addItemToUserBag);
};

export const useUpdateBag = () => {
  return useMutation(updateUserBag);
};

export const useRemoveProductFromBag = () => {
  return useMutation(removeItemFromBag);
};

export const useClearUserBag = () => {
  return useMutation(clearUserBag);
};
