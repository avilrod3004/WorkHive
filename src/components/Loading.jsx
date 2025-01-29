import React from 'react';
import Flower from "../assets/margarita.png";

/**
 * Componente de pantalla de carga.
 * Muestra una imagen de una flor y un texto animado mientras la aplicación se carga.
 *
 * @component
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de carga.
 */
const Loading = () => {
    return (
        <div className="loading">
            <img src={Flower} alt="Flor" className="loading__flor" />
            <p className="loading__texto">Cargando...</p>
        </div>
    );
};

export default Loading;
