import React from 'react'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

/**
 * Componente de menú de edición para tareas.
 * Proporciona botones para editar y eliminar tareas.
 *
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {function} props.onEditTask - Función para editar la tarea
 * @param {function} props.onDeleteTask - Función para eliminar la tarea
 * @param {string} props.id - Identificador único de la tarea
 * @returns {JSX.Element} Componente TaskMenuEdit renderizado
 */
const TaskMenuEdit = ({ onEditTask, onDeleteTask, id }) => {
  return (
    <div className='edit__menu'>
      <button className="menu__button" onClick={() => onEditTask(id)}>
        <BorderColorIcon />
        <span className='menu__text'>Editar Tarea</span>
      </button>
      <button className="menu__button" onClick={() => onDeleteTask(id)}>
        <DeleteForeverIcon />
        <span className='menu__text'>Eliminar Tarea</span>
      </button>
    </div>
  )
}

export default TaskMenuEdit

