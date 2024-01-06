import React, { useState, useEffect } from "react";
import Profile from "@/ecommerce/components/Profile/Profile";
import Address from "@/ecommerce/components/Address/Address";
import NotUserLogin from "@/ecommerce/components/CatchNotUserLogin/NotUserLogin";

function MyProfile() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  if (!user) {
    return <NotUserLogin />;
  }

  const renderTabs = (selectedTab) => {
    switch (selectedTab) {
      case "profile":
        return (
          <div>
            <Profile />
          </div>
        );
      case "address":
        return (
          <div>
            <Address />
          </div>
        );
    }
  };
  return (
    <div className="w-[90%] mx-auto flex gap-4 mt-8 sm:flex-col">
      <div className="w-[25%] sm:w-[100%] sm:flex ">
        <div
          className={`px-6 py-2 cursor-pointer border-[1px] sm:w-[50%] ${
            activeTab === "profile" ? "bg-[#f6ecec]" : ""
          } hover:bg-[#f6ecec]`}
          onClick={() => {
            setActiveTab("profile");
          }}
        >
          <span className="text-[15px] sm:text-[12px] sm:font-bold sm:text-center">
            Profile
          </span>
        </div>
        <hr />
        <div
          className={`px-6 py-2 cursor-pointer border-[1px] sm:w-[50%] ${
            activeTab === "address" ? "bg-[#f6ecec]" : ""
          } hover:bg-[#f6ecec]`}
          onClick={() => {
            setActiveTab("address");
          }}
        >
          <span className="text-[15px] sm:text-[12px] sm:font-bold sm:text-center">
            Manage Addresses
          </span>
        </div>
      </div>
      <div className="w-[75%] sm:w-full">{renderTabs(activeTab)}</div>
    </div>
  );
}

export default MyProfile;
