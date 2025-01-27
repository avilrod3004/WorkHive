import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { UserProvider } from "../context/UserContext";

/**
 * Componente de diseño para páginas privadas (que requieren autenticación).
 * Redirige a los usuarios no autenticados y proporciona un diseño común para las páginas privadas.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} [props.children] - Componentes hijos opcionales para renderizar dentro del diseño.
 * @returns {JSX.Element} Componente LayoutPrivate.
 */
const LayoutPrivate = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  /**
   * Efecto para redirigir a usuarios no autenticados.
   * Si no existe un token en localStorage, redirige al usuario a la página anterior.
   */
  useEffect(() => {
    if (token === null) {
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

export default LayoutPrivate;
