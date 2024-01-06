import { userAgent } from "next/server";
import React, { useContext, useState, useEffect } from "react";

const UserContext = React.createContext({});

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    setUserToken(localStorage.getItem("token"));
  }, []);

  const getUserToken = () => {
    return userToken;
  };

  const getUserId = () => {
    return user?._id;
  };

  const getCurrentUserInfo = () => {
    return user;
  };

  const clearUserInfoAfterLogOut = () => {
    localStorage.clear("user");
    localStorage.clear("token");
    setUser(null);
    setUserToken("");
  };

  return (
    <UserContext.Provider
      value={{
        getUserToken,
        getUserId,
        getCurrentUserInfo,
        clearUserInfoAfterLogOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
