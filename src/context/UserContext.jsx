/**
 * @module Contexts
 * @category State
 */

// UserContext.js
import React, { createContext, useEffect } from "react";
import { useUserStore } from "../config/userStore";
import useAxiosStore from "../hooks/useAxios";
import { jwtDecode } from "jwt-decode";

/**
 * @context
 * Contexto para gestionar la información del usuario.
 * @type {React.Context<{user: Object|null, setUser: Function}>}
 */
const UserContext = createContext();

/**
 * Proveedor del contexto de usuario.
 * Gestiona la autenticación y el estado del usuario.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Componentes hijos que serán envueltos por el proveedor.
 * @returns {JSX.Element} Componente UserProvider.
 */
export const UserProvider = ({ children }) => {
  const { setUser, clearUser, user } = useUserStore();
  const { fetch } = useAxiosStore();

  /**
   * Efecto para verificar el token de autenticación al montar el componente.
   * Actualiza el estado del usuario basándose en la validez del token.
   */
  useEffect(() => {
    /**
     * Verifica el token almacenado y actualiza el estado del usuario.
     * @async
     */
    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        clearUser();
        return;
      }

      try {
        const response = await fetch(
          import.meta.env.VITE_BASE_API + "usuarios/verify-token",
          "POST",
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );

        if (response.error === null) {
          // Decodifica el token para obtener los datos del usuario
          const decodedToken = jwtDecode(token);
          const { id, nombre, rol } = decodedToken;
          setUser({ id, nombre, rol }); // Actualiza el usuario en Zustand con los datos del token
        } else {
          localStorage.removeItem("token");
          clearUser();
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        localStorage.removeItem("token");
        clearUser();
      }
    };

    verifyToken();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
