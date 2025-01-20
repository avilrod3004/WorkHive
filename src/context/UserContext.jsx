// UserContext.js
import React, { createContext, useEffect } from "react";
import { useUserStore } from "../config/userStore";
import { useAxiosPost } from "../hooks/useAxios";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { setUser, clearUser, user } = useUserStore();

  useEffect(() => {
    const verifyToken = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        clearUser();
        return;
      }

      try {
        const response = useAxiosPost(
          "http://localhost:3000/usuarios/verify-token",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          // Decodificar el token para obtener los datos del usuario
          const decodedToken = jwtDecode(token);
          const { id, name, role } = decodedToken;
          setUser({ id, name, role }); // Actualiza el usuario en Zustand con los datos del token
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
