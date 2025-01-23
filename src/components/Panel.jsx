import React from "react";
import { NavLink } from "react-router-dom";

/**
 * Componente Panel que muestra el nombre de tarea o proyecto como contenido.
 *
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.name - Nombre o contenido a mostrar en el panel
 * @param {string} props.type - Tipo de panel para definir color del borde
 * @param {string} props.id - El identificador del panel
 * @returns {JSX.Element} Componente Panel renderizado
 */
const Panel = ({ name, type, id }) => {
  return (
    <div className={`panel__${type}`}>
      <NavLink to={`/usuario/tablero/${id}`}>
        <div className="panel__content">{name}</div>
      </NavLink>
    </div>
  );
};

export default Panel;
