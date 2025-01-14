import React from 'react'

const TaskMenuEdit = ({onEditTask, onDeleteTask }) => {
  return (
    <div className='edit__menu'>
        <button className="menu__button" onClick={() => onEditTask(id)}>
        <BorderColorIcon />
        <span>Editar Tarea</span>
      </button>
      <button className="menu__button" onClick={() => onDeleteTask(id)}>
        <DeleteForeverIcon />
        <span>Eliminar Tarea</span>
      </button>
    </div>
  )
}

export default TaskMenuEdit