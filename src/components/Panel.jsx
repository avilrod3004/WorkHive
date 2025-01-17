import React from 'react'

/**
 * Componente Panel que muestra el nombre de tarea o proyecto como contenido.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.name - Nombre o contenido a mostrar en el panel
 * @returns {JSX.Element} Componente Panel renderizado
 */
const Panel = ({ name }) => {
  return (
    <div className="panel">
      <div className="panel-content">
        { name }
      </div>
    </div>
  )
}

export default Panel