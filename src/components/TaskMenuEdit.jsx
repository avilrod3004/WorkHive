/**
 * @module Components
 * @category UI
 */
import React, { useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import * as Yup from "yup";
import FormModal from "../modals/FormModal.jsx";
import ConfirmModal from "../modals/ConfirmModal.jsx";

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
  const [modalEditTaskOpen, setModalEditTaskOpen] = useState(false);
  const [modalDeleteTaskOpen, setModalDeleteTaskOpen] = useState(false);

  const validationSchemaEditTask = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required("El campo 'Nombre proyecto' es obligatorio"),
    asigned: Yup.string()
      .trim()
      .required("El campo 'Asigando a' es obligatorio"),
    dateEnd: Yup.date()
      .required("El campo 'Fecha' es obligatorio")
      .min(new Date(), "La fecha debe ser posterior a la actual"),
    description: Yup.string()
      .trim()
      .required("El campo 'Descripción' es obligatorio."),
  });

  return (
    <div className="edit__menu">
      <button
        className="menu__button"
        title="Editar tarea"
        onClick={() => setModalEditTaskOpen(true)}
      >
        <BorderColorIcon />
      </button>
      <button
        className="menu__button"
        title="Eliminar tarea"
        onClick={() => setModalDeleteTaskOpen(true)}
      >
        <DeleteForeverIcon />
      </button>

      {/* Modal para editar los datos de una tarea*/}
      <FormModal
        isOpen={modalEditTaskOpen}
        onClose={() => setModalEditTaskOpen(false)}
        initialValues={{
          name: "",
          asigned: "",
          dateEnd: "",
          priority: "",
          description: "",
        }}
        validationSchema={validationSchemaEditTask}
        onSubmit=":)"
        title="Editar tarea"
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <>
            <label htmlFor="name" className="formulario__label">
              Nombre tarea
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="formulario__input"
              />
              {errors.name && touched.name && (
                <p className="formulario__error">* {errors.name}</p>
              )}
            </label>

            <label htmlFor="asigned" className="formulario__label">
              Asignado a
              <select
                id="asigned"
                name="asigned"
                value={values.asigned}
                onChange={handleChange}
                onBlur={handleBlur}
                className="formulario__input"
              >
                <option value="" disabled selected>
                  Selecciona una opción
                </option>
                <option value="No">No</option>
                <option value="cuentes">cuentes</option>
                <option value="con">con</option>
                <option value="migo">migo</option>
              </select>
              {errors.asigned && touched.asigned && (
                <p className="formulario__error">* {errors.asigned}</p>
              )}
            </label>

            <label htmlFor="priority" className="formulario__label">
              Prioridad
              <select
                id="priority"
                name="priority"
                value={values.priority}
                onChange={handleChange}
                onBlur={handleBlur}
                className="formulario__input"
              >
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
              </select>
              {errors.priority && touched.priority && (
                <p className="formulario__error">* {errors.priority}</p>
              )}
            </label>

            <label htmlFor="dateEnd" className="formulario__label">
              Fecha limite
              <input
                type="date"
                name="dateEnd"
                value={values.dateEnd}
                onChange={handleChange}
                onBlur={handleBlur}
                className="formulario__input"
              />
              {errors.dateEnd && touched.dateEnd && (
                <p className="formulario__error">* {errors.dateEnd}</p>
              )}
            </label>

            <label htmlFor="description" className="formulario__label">
              Descripción
              <textarea
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                className="formulario__input"
              />
              {errors.description && touched.description && (
                <p className="formulario__error">* {errors.description}</p>
              )}
            </label>
          </>
        )}
      </FormModal>

      {/* Modal para confirmar si el usuario quiere eliminar la tarea */}
      <ConfirmModal
        isOpen={modalDeleteTaskOpen}
        onClose={() => setModalDeleteTaskOpen(false)}
        message="¿Estas seguro de que quieres eliminar la tarea?"
        onConfirm={() => {
          setModalDeleteTaskOpen(false);
        }}
      />
    </div>
  );
};

export default TaskMenuEdit;
