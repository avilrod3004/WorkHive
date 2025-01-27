import React from "react";
import PanelTarea from "../components/PanelTarea";

/**
 * Componente Board (Tablero)
 *
 * Este componente representa un tablero que contiene múltiples paneles.
 * El tablero tiene un tipo específico que determina su estilo y el de sus paneles.
 *
 * @component
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.name - El nombre del tablero.
 * @param {string} props.type - El tipo del tablero (e.g., 'todo', 'inprogress', 'toreview', 'done').
 * @param {Array} props.panels - Un array de objetos que representan los paneles del tablero.
 * @param {string} props.panels[]._id - El identificador de cada panel individual.
 * @param {string} props.panels[].nombre - El nombre de cada panel individual.
 *
 */
const BoardTask = ({ name, type, panels, idTablero }) => {
  return (
    <div className={`tableroTask__${type}`}>
      <h2 className="tablero__titleTask">{name}</h2>
      <div className="tablero__panelsTask">
        {panels.map((panel, index) => (
          <PanelTarea key={index} name={panel.nombre} type={type} id={idTablero} tareaId={panel._id}/>
        ))}
      </div>
    </div>
  );
};

export default BoardTask;
