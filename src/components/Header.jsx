import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useUserStore } from "../config/userStore";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const { user, setUser } = useUserStore();

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <header className="header">
      <NavLink to="/" className="header__titulo">
        WORKHIVE
      </NavLink>
      <ul className="header__menu">
        {!user && (
          <li className="menu__opcion">
            <NavLink to="/auth/login">Iniciar sesión</NavLink>
          </li>
        )}
        {user && (
          <li className="menu__opcion">
            <NavLink to="/usuario">Usuario</NavLink>
          </li>
        )}
        {!user && (
          <li className="menu__opcion">
            <NavLink to="/auth/register">Registrarse</NavLink>
          </li>
        )}
        {user && (
          <li className="menu__opcion">
            <NavLink onClick={handleLogout} to="/auth/login">
              Cerrar sesión
            </NavLink>
          </li>
        )}
      </ul>
      <div
        onClick={toggleTheme}
        className={`theme-icon ${
          isDarkMode ? "theme-icon--dark" : "theme-icon--light"
        }`}
      >
        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </div>
    </header>
  );
};

export default Header;
