/**
 * @module Layouts
 * @category Structure
 */
import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { UserProvider } from "../context/UserContext";

/**
 * @layout
 * Componente de diseño para páginas de autenticación.
 * Redirige a los usuarios autenticados y proporciona un diseño común para las páginas de autenticación.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} [props.children] - Componentes hijos opcionales para renderizar dentro del diseño.
 * @returns {JSX.Element} Componente LayoutAuth.
 */
const LayoutAuth = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  /**
   * Efecto para redirigir a usuarios autenticados.
   * Si existe un token en localStorage, redirige al usuario a la página anterior.
   */
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
