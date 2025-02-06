/**
 * @module Components
 * @category UI
 */
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FormModal from "../modals/FormModal.jsx";
import * as Yup from "yup";
import ConfirmModal from "../modals/ConfirmModal.jsx";
import { useAddCollaboratorStore } from "../config/addCollaboratorStore.jsx";
import { useProjectStore } from "../config/projectStore.jsx";
import { useAddTaskStore } from "../config/addTaskStore.jsx";
import { useUserStore } from "../config/userStore.jsx";

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
  const { taskAdded, addTaskError, setTaskAdded, clearAddTaskError } =
    useAddTaskStore();
  const {
    project,
    editError,
    clearEditError,
    projectEdited,
    setProjectEdited,
  } = useProjectStore();
  const { user } = useUserStore();

  const validationSchemaNewTask = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required("El campo 'Nombre proyecto' es obligatorio")
      .min(3, "El nombre debe tener mínimo 3 caracteres"),
    asigned: Yup.string()
      .trim()
      .required("El campo 'Asignado a' es obligatorio"),
    dateEnd: Yup.date()
      .required("El campo 'Fecha' es obligatorio")
      .min(new Date(), "La fecha debe ser posterior a la actual"),
    description: Yup.string()
      .trim()
      .required("El campo 'Descripción' es obligatorio.")
      .min(3, "La descripción debe tener mínimo 3 caracteres"),
  });

  const validationSchemaAddColaborator = Yup.object().shape({
    email: Yup.string().trim().required("El campo 'Email' es obligatorio"),
  });

  const validationSchemaEditProject = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required("El campo 'Nombre proyecto' es obligatorio")
      .min(3, "El nombre del proyecto debe tener mínimo 3 caracteres"),
    description: Yup.string()
      .trim()
      .required("El campo 'Descripción' es obligatorio.")
      .min(3, "La descripción debe tener mínimo 3 caracteres"),
    dateIni: Yup.date().required("El campo 'Fecha' es obligatorio"),
    dateEnd: Yup.date()
      .required("El campo 'Fecha' es obligatorio")
      .min(new Date(), "La fecha debe ser posterior a la actual"),
  });

  const formatDateForInput = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="edit__menu">
      <button
        className="menu__button"
        title="Añadir tarea"
        onClick={() => {
          setmodalNewTaskOpen(true);
          clearAddTaskError();
        }}
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
        onClick={() => {
          setmodalEditProjectOpen(true);
          clearEditError();
        }}
      >
        <BorderColorIcon />
      </button>
      {user.id === project.administrador._id ||
        (user._id === project.administrador._id && (
          <button
            className="menu__button"
            title="Eliminar Proyecto"
            onClick={() => setmodalDeleteProjectOpen(true)}
          >
            <DeleteForeverIcon />
          </button>
        ))}

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
        onSubmit={(values, { setSubmitting }) => {
          onAddTask(values);
          setSubmitting(false);
        }}
        title="Añadir tarea"
      >
        {({
          values,
          handleChange: originalHandleChange,
          handleBlur,
          errors,
          touched,
        }) => {
          const handleChange = (e) => {
            clearAddTaskError();
            setTaskAdded(false);
            originalHandleChange(e);
          };

          useEffect(() => {
            if (addTaskError === null && taskAdded) {
              setmodalNewTaskOpen(false);
              setTaskAdded(false);
            }
          }, [addTaskError, taskAdded]);

          return (
            <>
              <label htmlFor="name" className="formulario__label">
                Nombre tarea
                <input
                  type="text"
                  id="name"
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
                  <option value="" disabled defaultChecked>
                    Selecciona una opción
                  </option>
                  <option
                    key={project.administrador._id}
                    value={project.administrador._id}
                  >
                    {project.administrador.nombre}
                  </option>
                  {project.colaboradores &&
                    project.colaboradores.map((colaborador, index) => (
                      <option key={index} value={colaborador._id}>
                        {colaborador.nombre}
                      </option>
                    ))}
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
                  id="dateEnd"
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
                  id="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="formulario__input"
                />
                {errors.description && touched.description && (
                  <p className="formulario__error">* {errors.description}</p>
                )}
                {addTaskError && (
                  <p className="formulario__error">* {addTaskError}</p>
                )}
              </label>
            </>
          );
        }}
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
              setCollaboratorAdded(false);
            }
          }, [error, collaboratorAdded]);

          return (
            <>
              <label htmlFor="email" className="formulario__label">
                Email
                <input
                  type="text"
                  id="email"
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
          name: project.nombre,
          dateIni: formatDateForInput(project.fechaInicio),
          dateEnd: formatDateForInput(project.fechaFin),
          description: project.descripcion,
        }}
        validationSchema={validationSchemaEditProject}
        onSubmit={(values, { setSubmitting }) => {
          onEditProject(values);
          setSubmitting(false);
        }}
        title="Editar proyecto"
      >
        {({
          values,
          handleChange: originalHandleChange,
          handleBlur,
          errors,
          touched,
        }) => {
          const handleChange = (e) => {
            clearEditError();
            setProjectEdited(false);
            originalHandleChange(e);
          };

          useEffect(() => {
            if (editError === null && projectEdited) {
              setmodalEditProjectOpen(false);
              setProjectEdited(false);
            }
          }, [editError, project]);

          return (
            <>
              <label htmlFor="name" className="formulario__label">
                Nombre proyecto
                <input
                  type="text"
                  id="name"
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
                  id="dateIni"
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
                  id="dateEnd"
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
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="formulario__input"
                />
                {errors.description && touched.description && (
                  <p className="formulario__error">* {errors.description}</p>
                )}
                {editError !== null && (
                  <p className="formulario__error">* {editError}</p>
                )}
              </label>
            </>
          );
        }}
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

