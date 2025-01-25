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
const PanelTarea = ({ name, type, id , tareaId}) => {
  return (
    <div className={`panel__${type}`}>
      <div className="inside">

          <NavLink to={`/usuario/tablero/${id}/tarea/${tareaId}`}>
              <div className="panel__content">{name}</div>
          </NavLink>
      </div>
    </div>
  );
};

export default PanelTarea;
