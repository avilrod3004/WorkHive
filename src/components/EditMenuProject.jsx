import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

/**
 * Componente de menú de edición para proyectos.
 * Proporciona botones para añadir, editar y eliminar proyectos, así como para añadir personas.
 *
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.id - Identificador único del proyecto
 * @param {function} props.onAddProject - Función para añadir un nuevo proyecto
 * @param {function} props.onAddPerson - Función para añadir una persona al proyecto
 * @param {function} props.onEditProject - Función para editar el proyecto
 * @param {function} props.onDeleteProject - Función para eliminar el proyecto
 * @returns {JSX.Element} Componente EditMenuProject renderizado
 */
const EditMenuProject = ({ id, onAddProject, onAddPerson, onEditProject, onDeleteProject }) => {
  return (
    <div className="edit__menu">
      <button className="menu__button" onClick={() => onAddProject(id)}>
        <AddIcon />
        <span className='menu__text'>Añadir Proyecto</span>
      </button>
      <button className="menu__button" onClick={() => onAddPerson(id)}>
        <PersonAddAlt1Icon />
        <span className='menu__text'>Añadir Persona</span>
      </button>
      <button className="menu__button" onClick={() => onEditProject(id)}>
        <BorderColorIcon />
        <span className='menu__text'>Editar Proyecto</span>
      </button>
      <button className="menu__button" onClick={() => onDeleteProject(id)}>
        <DeleteForeverIcon />
        <span className='menu__text'>Eliminar Proyecto</span>
      </button>
    </div>
  )
}

export default EditMenuProject

/**
 * Ejemplo de uso del componente EditMenuProject:
 *
 * import React from 'react'
 * import EditMenuProject from './EditMenuProject'
 *
 * const App = () => {
 *   const handleAddProject = (id) => {
 *     console.log(`Añadir proyecto ${id}`);
 *     // Lógica para añadir proyecto
 *   }
 *
 *   const handleAddPerson = (id) => {
 *     console.log(`Añadir persona al proyecto ${id}`);
 *     // Lógica para añadir persona
 *   }
 *
 *   const handleEditProject = (id) => {
 *     console.log(`Editar proyecto ${id}`);
 *     // Lógica para editar proyecto
 *   }
 *
 *   const handleDeleteProject = (id) => {
 *     console.log(`Eliminar proyecto ${id}`);
 *     // Lógica para eliminar proyecto
 *   }
 *
 *   return (
 *     <div>
 *       <EditMenuProject 
 *         id="proyecto1"
 *         onAddProject={handleAddProject}
 *         onAddPerson={handleAddPerson}
 *         onEditProject={handleEditProject}
 *         onDeleteProject={handleDeleteProject}
 *       />
 *     </div>
 *   )
 * }
 *
 * export default App
 */
