import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const EditMenuProject = ({ id, onAddProject, onAddPerson, onEditProject, onDeleteProject }) => {
  return (
    <div className="edit__menu">
      <button className="menu__button" onClick={() => onAddProject(id)}>
        <AddIcon />
        <span>Añadir Proyecto</span>
      </button>
      <button className="menu__button" onClick={() => onAddPerson(id)}>
        <PersonAddAlt1Icon />
        <span>Añadir Persona</span>
      </button>
      <button className="menu__button" onClick={() => onEditProject(id)}>
        <BorderColorIcon />
        <span>Editar Proyecto</span>
      </button>
      <button className="menu__button" onClick={() => onDeleteProject(id)}>
        <DeleteForeverIcon />
        <span>Eliminar Proyecto</span>
      </button>
    </div>
  )
}

export default EditMenuProject


// EJEMPLO DE USO, HAY QUE PASARLES LOS METODOS PARA Q ME ENTEDAIS 
// import React from 'react'
// import EditMenu from './EditMenu'

// const App = () => {
//   const handleAdd = (id) => {
//     console.log(`Añadir a ${id}`);
//     // Lógica para añadir
//   }

//   const handleAddPerson = (id) => {
//     console.log(`Añadir persona a ${id}`);
//     // Lógica para añadir persona
//   }

//   const handleEdit = (id) => {
//     console.log(`Editar ${id}`);
//     // Lógica para editar
//   }

//   const handleDelete = (id) => {
//     console.log(`Eliminar ${id}`);
//     // Lógica para eliminar
//   }

//   return (
//     <div>
//       <EditMenu 
//         id="tarea1"
//         onAdd={handleAdd}
//         onAddPerson={handleAddPerson}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//       />
//     </div>
//   )
// }

// export default App
