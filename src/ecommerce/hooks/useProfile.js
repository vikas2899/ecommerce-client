import { useQuery, useMutation } from "react-query";
import { service } from "../axios/axios";

const getUserAddress = (userid) => {
  return service.get(`address/get/${userid}`);
};

const getUserAddressByID = (userid, addressid) => {
  return service.get(`address/getById/${userid}`, {
    params: {
      addressid: addressid,
    },
  });
};

const addNewAddress = ({ userid, newAddressData }) => {
  return service.post("address/create/" + userid, newAddressData);
};

const deleteAddress = ({ userid, addressid }) => {
  return service.delete("address/delete/" + userid, {
    params: {
      addressid: addressid,
    },
  });
};

export const useUserAddress = (userid) => {
  return useQuery(["get-user-address", userid], () => getUserAddress(userid), {
    enabled: !!userid,
    refetchOnWindowFocus: false,
  });
};

export const useUserAddressByID = ({ userid, addressid }) => {
  return useQuery(
    ["get-user-address-byid", userid, addressid],
    () => getUserAddressByID(userid, addressid),
    {
      enabled: !!userid,
      refetchOnWindowFocus: false,
    }
  );
};

export const useAddNewAddress = () => {
  return useMutation(addNewAddress);
};

export const useDeleteAddress = () => {
  return useMutation(deleteAddress);
};
