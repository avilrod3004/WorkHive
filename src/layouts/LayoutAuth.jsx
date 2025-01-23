import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { UserProvider } from "../context/UserContext";

const LayoutAuth = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token !== null) {
      navigate(-1);
    }
  }, []);

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

export default LayoutAuth;
