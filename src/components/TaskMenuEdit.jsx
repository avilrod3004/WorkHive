import React from 'react'

const TaskMenuEdit = ({onEditTask, onDeleteTask }) => {
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