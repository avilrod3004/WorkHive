// ThemeContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';

/**
 * Contexto para gestionar el tema de la aplicación.
 * @type {React.Context<{isDarkMode: boolean, setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>}>}
 */
const ThemeContext = createContext();

/**
 * Componente proveedor para el ThemeContext.
 * Gestiona el estado del modo oscuro y actualiza el atributo data-theme del documento.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Componentes hijos que serán envueltos por el proveedor.
 * @returns {JSX.Element} Componente ThemeProvider.
 */
export const ThemeProvider = ({ children }) => {
  /**
   * Estado para rastrear si el modo oscuro está activo.
   * Se inicializa basándose en el atributo data-theme actual del documento.
   * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
   */
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.getAttribute("data-theme") === "dark";
  });

  /**
   * Efecto para actualizar el atributo data-theme del documento cuando cambia isDarkMode.
   */
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook personalizado para acceder al contexto del tema.
 * @returns {{isDarkMode: boolean, setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>}} Valor del contexto del tema.
 * @throws {Error} Si se usa fuera de un ThemeProvider.
 */
export const useTheme = () => useContext(ThemeContext);
