import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoginComponent from "@/ecommerce/components/LoginComponent/LoginComponent";

function Login() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  if (user) {
    router.push("/");
  }

  return (
    <div className="bg-[#e5e9f4] min-h-screen flex justify-center items-center">
      <LoginComponent />
    </div>
  );
}

export default Login;
