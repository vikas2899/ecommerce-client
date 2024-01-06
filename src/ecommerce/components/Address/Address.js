import React, { useState, useEffect } from "react";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import MyModal from "@/ecommerce/common/Modal/Modal";
import AddressCard from "../AddressCard/AddressCard";
import NotUserLogin from "../CatchNotUserLogin/NotUserLogin";
import {
  useDeleteAddress,
  useUserAddress,
  useAddNewAddress,
} from "@/ecommerce/hooks/useProfile";

function Address() {
  let [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const { isLoading, data, refetch } = useUserAddress(user?._id);
  const { mutate: addNewAddress } = useAddNewAddress();

  const { mutate: deleteAddress } = useDeleteAddress();

  const onAddressSave = (newAddressData) => {
    closeModal();
    const addData = {
      userid: user?._id,
      newAddressData,
    };
    addNewAddress(addData, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  const onDelete = (addressid) => {
    deleteAddress(
      { userid: user?._id, addressid: addressid },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  if (!user) {
    <NotUserLogin />;
  }

  return (
    <div className="h-[100vh] overflow-y-auto">
      <div
        className="border-[1px] p-3 flex items-center gap-4 hover:cursor-pointer"
        onClick={openModal}
      >
        <AddTwoToneIcon />
        <h1 className="text-[14px]">ADD A NEW ADDRESS</h1>
      </div>
      {data &&
        data?.data?.[0]?.addresses.map((address) => (
          <AddressCard
            addressData={address}
            key={address._id}
            onDelete={onDelete}
          />
        ))}

      <MyModal
        isOpen={isOpen}
        closeModal={closeModal}
        onAddressSave={onAddressSave}
      />
    </div>
  );
}

export default Address;
