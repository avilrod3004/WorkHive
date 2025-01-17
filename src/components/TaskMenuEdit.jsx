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

/**
 * Ejemplo de uso del componente TaskMenuEdit:
 *
 * import React from 'react'
 * import TaskMenuEdit from './TaskMenuEdit'
 *
 * const App = () => {
 *   const handleEditTask = (id) => {
 *     console.log(`Editar tarea ${id}`);
 *     // Lógica para editar tarea
 *   }
 *
 *   const handleDeleteTask = (id) => {
 *     console.log(`Eliminar tarea ${id}`);
 *     // Lógica para eliminar tarea
 *   }
 *
 *   return (
 *     <div>
 *       <TaskMenuEdit 
 *         id="tarea1"
 *         onEditTask={handleEditTask}
 *         onDeleteTask={handleDeleteTask}
 *       />
 *     </div>
 *   )
 * }
 *
 * export default App
 */
