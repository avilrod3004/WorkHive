import React from "react";
import Flower from "../assets/margarita.png";
import DarkFlower from "../assets/margaritaDark.png";
import { useTheme } from "../context/ThemeContext.jsx";

/**
 * Componente de pantalla de carga.
 * Muestra una imagen de una flor y un texto animado mientras la aplicación se carga.
 *
 * @component
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de carga.
 */
const Loading = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="loading">
      <img
        src={isDarkMode ? DarkFlower : Flower}
        alt="Flor"
        className="loading__flor"
      />
      <p className="loading__texto">Cargando...</p>
    </div>
  );
};

export default Loading;
