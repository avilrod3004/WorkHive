import React from 'react'

/**
 * Componente Panel que muestra el nombre de tarea o proyecto como contenido.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.name - Nombre o contenido a mostrar en el panel
 * @param {string} props.type - Tipo de panel para definir color del borde
 * @returns {JSX.Element} Componente Panel renderizado
 */
const Panel = ({ name, type }) => {
  return (
    <div className={`panel__${type}`}>
      <div className="panel__content">{name}</div>
    </div>
  );
};



export default Panel