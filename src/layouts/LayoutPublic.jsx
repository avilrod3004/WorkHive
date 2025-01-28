/**
 * @module Layouts
 * @category Structure
 */
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { UserProvider } from "../context/UserContext";

/**
 * @layout
 * Componente de diseño para páginas públicas.
 * Proporciona una estructura común para las páginas accesibles a todos los usuarios.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} [props.children] - Componentes hijos opcionales para renderizar dentro del diseño.
 * @returns {JSX.Element} Componente LayoutPublic.
 */
const LayoutPublic = ({ children }) => {
  return (
    <>
      <UserProvider>
        <Header />
        <main>
          {children ? children : <Outlet />}
        </main>
        <Footer />
      </UserProvider>
    </>
  );
};

export default LayoutPublic;
