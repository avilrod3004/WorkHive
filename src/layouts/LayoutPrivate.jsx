import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { UserProvider } from "../context/UserContext";

const LayoutPrivate = ({ children }) => {
  return (
    <>
      <UserProvider>
        <Header />
        {children ? children : <Outlet />}
        <Footer />
      </UserProvider>
    </>
  );
};

export default LayoutPrivate;
