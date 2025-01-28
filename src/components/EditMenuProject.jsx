/**
 * @module Components
 * @category UI
 */
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import fotoCambiar from "../assets/margarita.png";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { brown } from "@mui/material/colors";
import FormModal from "../modals/FormModal.jsx";
import * as Yup from "yup";
import ConfirmModal from "../modals/ConfirmModal.jsx";
import { useAddCollaboratorStore } from "../config/addCollaboratorStore.jsx";

/**
 * Componente de menú de edición para proyectos.
 * Proporciona botones para añadir, editar y eliminar proyectos, así como para añadir personas.
 *
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.id - Identificador único del proyecto
 * @param {function} props.onAddTask - Función para añadir una nueva tarea
 * @param {function} props.onAddPerson - Función para añadir un colaborador al proyecto
 * @param {function} props.onEditProject - Función para editar el proyecto
 * @param {function} props.onDeleteProject - Función para eliminar el proyecto
 * @returns {JSX.Element} Componente EditMenuProject renderizado
 */
const EditMenuProject = ({
  id,
  onAddTask,
  onAddPerson,
  onEditProject,
  onDeleteProject,
}) => {
  const [modalNewTaskOpen, setmodalNewTaskOpen] = useState(false);
  const [modalAddColaboratorOpen, setmodalAddColaboratorOpen] = useState(false);
  const [modalEditProjectOpen, setmodalEditProjectOpen] = useState(false);
  const [modalDeleteProjectOpen, setmodalDeleteProjectOpen] = useState(false);
  const { error, clearError, setCollaboratorAdded, collaboratorAdded } =
    useAddCollaboratorStore();

  const validationSchemaNewTask = Yup.object().shape({
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

  const validationSchemaAddColaborator = Yup.object().shape({
    email: Yup.string().trim().required("El campo 'Email' es obligatorio"),
  });

  const validationSchemaEditProject = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required("El campo 'Nombre proyecto' es obligatorio"),
    description: Yup.string()
      .trim()
      .required("El campo 'Descripción' es obligatorio."),
    dateIni: Yup.date()
      .required("El campo 'Fecha' es obligatorio")
      .min(new Date(), "La fecha debe ser posterior a la actual"),
    dateEnd: Yup.date()
      .required("El campo 'Fecha' es obligatorio")
      .min(new Date(), "La fecha debe ser posterior a la actual"),
  });

  return (
    <div className="edit__menu">
      <button
        className="menu__button"
        title="Añadir tarea"
        onClick={() => setmodalNewTaskOpen(true)}
      >
        <AddIcon />
      </button>
      <button
        className="menu__button"
        title="Añadir colaborador"
        onClick={() => {
          setmodalAddColaboratorOpen(true);
          clearError();
        }}
      >
        <PersonAddAlt1Icon />
      </button>
      <button
        className="menu__button"
        title="Editar Proyecto"
        onClick={() => setmodalEditProjectOpen(true)}
      >
        <BorderColorIcon />
      </button>
      <button
        className="menu__button"
        title="Eliminar Proyecto"
        onClick={() => setmodalDeleteProjectOpen(true)}
      >
        <DeleteForeverIcon />
      </button>

      {/* Modal para añadir tareas al proyecto */}
      <FormModal
        isOpen={modalNewTaskOpen}
        onClose={() => setmodalNewTaskOpen(false)}
        initialValues={{
          name: "",
          asigned: "",
          dateEnd: "",
          priority: "",
          description: "",
        }}
        validationSchema={validationSchemaNewTask}
        onSubmit=":)"
        title="Añadir tarea"
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

      {/* Modal para añadir colaboradores al proyecto */}
      <FormModal
        isOpen={modalAddColaboratorOpen}
        onClose={() => setmodalAddColaboratorOpen(false)}
        initialValues={{
          email: "",
        }}
        validationSchema={validationSchemaAddColaborator}
        onSubmit={(values, { setSubmitting }) => {
          onAddPerson(values.email);
          setSubmitting(false);
        }}
        title="Añadir colaborador"
      >
        {({
          values,
          handleChange: originalHandleChange,
          handleBlur,
          errors,
          touched,
        }) => {
          const handleChange = (e) => {
            clearError();
            setCollaboratorAdded(false);
            originalHandleChange(e);
          };

          useEffect(() => {
            if (error === null && collaboratorAdded) {
              setmodalAddColaboratorOpen(false);
            }
          }, [error]);

          return (
            <>
              <label htmlFor="email" className="formulario__label">
                Email
                <input
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="formulario__input"
                />
                {errors.email && touched.email && (
                  <p className="formulario__error">* {errors.email}</p>
                )}
                {error !== null && <p className="formulario__error">{error}</p>}
              </label>
            </>
          );
        }}
      </FormModal>

      {/* Modal para editar los datos del proyecto */}
      <FormModal
        isOpen={modalEditProjectOpen}
        onClose={() => setmodalEditProjectOpen(false)}
        initialValues={{
          name: "",
          dateIni: "",
          dateEnd: "",
          description: "",
        }}
        validationSchema={validationSchemaEditProject}
        onSubmit={(values) => {
          setmodalEditProjectOpen(false);
        }}
        title="Editar proyecto"
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <>
            <label htmlFor="name" className="formulario__label">
              Nombre proyecto
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

            <label htmlFor="dateIni" className="formulario__label">
              Fecha inicio
              <input
                type="date"
                name="dateIni"
                value={values.dateIni}
                onChange={handleChange}
                onBlur={handleBlur}
                className="formulario__input"
              />
              {errors.dateIni && touched.dateIni && (
                <p className="formulario__error">* {errors.dateIni}</p>
              )}
            </label>

            <label htmlFor="dateEnd" className="formulario__label">
              Fecha fin
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

      {/* Modal para confirmar si el usuario quiere eliminar el proyecto */}
      <ConfirmModal
        isOpen={modalDeleteProjectOpen}
        onClose={() => setmodalDeleteProjectOpen(false)}
        message="¿Estas seguro de que quieres eliminar el proyecto?"
        onConfirm={() => {
          setmodalDeleteProjectOpen(false);

          onDeleteProject(id);
        }}
      />
    </div>
  );
};

export default EditMenuProject;

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
