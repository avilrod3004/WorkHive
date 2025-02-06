/**
 * @module Components
 * @category UI
 */
import React from "react";
import {NavLink, useNavigate} from "react-router-dom";

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
    const navigate = useNavigate();

  return (
    <div tabIndex="0"
         onKeyDown={(evento) => {
             if(evento.key === 'Enter')
                navigate(`/usuario/tablero/${id}`)
         }}
         className="panel__tabIndex">
        <div className={`panel__${type}`}>
            <div className="inside">

                <NavLink to={`/usuario/tablero/${id}`} tabIndex="-1">
                    <div className="panel__content">{name}</div>
                </NavLink>
            </div>
        </div>
    </div>
  );
};

export default Panel;
