import React from "react";
import Navbar from "@/ecommerce/components/Navbar/Navbar";
import Footer from "@/ecommerce/components/Footer/Footer";
import { useRouter } from "next/router";
import { ShoppingBagProvider } from "@/ecommerce/context/BagContext/BagContext";
import { OrderProvider } from "@/ecommerce/context/OrderContext/OrderContext";
import { UserProvider } from "@/ecommerce/context/UserContext/UserContext";

const Layout = ({ children }) => {
  const router = useRouter();
  if (router.pathname === "/login" || router.pathname === "/register") {
    return <>{children}</>;
  }

  return (
    <UserProvider>
      <ShoppingBagProvider>
        <OrderProvider>
          <Navbar />
          {children}
          <Footer />
        </OrderProvider>
      </ShoppingBagProvider>
    </UserProvider>
  );
};
export default Layout;
