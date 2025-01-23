import React from 'react';
import Panel from '../components/Panel'

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
 * @param {string} props.panels[].name - El nombre de cada panel individual.
 *
 * @example
 * const panels = [{ name: 'Panel 1' }, { name: 'Panel 2' }];
 * return (
 *   <Board name="Mi Tablero" type="todo" panels={panels} />
 * )
 */
const Board = ({ name, type, panels }) => {

    return (
      <div className={`tablero__${type}`}>
        <h2 className="tablero__title">{name}</h2>
        <div className="tablero__panels">
          {panels.map((panel, index) => (
            <Panel key={index} name={panel.name} type={type} />
          ))}
        </div>
      </div>
    );
  };
  

  export default Board;