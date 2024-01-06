import React from "react";
import Link from "next/link";

function NotUserLogin() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <p>Please login to proceed.</p>
      <span className="mt-[20px]">
        <Link
          className="text-[18px] border-[1px] px-[50px] py-[5px] shadow-md rounded-sm hover:bg-[#e0f6ff]"
          href="/login"
        >
          Login
        </Link>
      </span>
    </div>
  );
}

export default NotUserLogin;
