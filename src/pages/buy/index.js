import React, { useState, useEffect } from "react";
import ProgressBar from "@/ecommerce/components/ProgressBar/ProgressBar";
import NotUserLogin from "@/ecommerce/components/CatchNotUserLogin/NotUserLogin";
import { useOrder } from "@/ecommerce/context/OrderContext/OrderContext";
import CheckOutAddress from "./address";
import Payment from "./payment";

function Buy() {
  const [user, setUser] = useState(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const { createUserOrder } = useOrder();

  const proceedToCheckOut = (address, callback) => {
    createUserOrder(address, callback);
  };

  const changeProcessState = () => {
    setStep(1);
  };

  const handleSelectDeliveryAddress = (address) => {
    proceedToCheckOut(address, changeProcessState);
  };

  if (!user) {
    return <NotUserLogin />;
  }

  return (
    <div className="min-h-screen mt-[20px]">
      <div className="flex flex-col">
        <div className="w-fit ml-[38px] sm:w-[100%] sm:m-0">
          <ProgressBar step={step} />
        </div>
        <div className="flex gap-[100px] w-[80%] mx-auto">
          {step === 0 ? (
            <CheckOutAddress
              user={user}
              onSelectAddress={handleSelectDeliveryAddress}
            />
          ) : (
            <Payment />
          )}
        </div>
      </div>
    </div>
  );
}

export default Buy;
