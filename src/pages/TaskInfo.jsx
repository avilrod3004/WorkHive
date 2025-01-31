/**
 * @module Pages
 * @category Routes
 */

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import bee from "../assets/bee.png";
import beeDark from "../assets/beedark.png";
import MenuTask from "../components/TaskMenuEdit";
import useAxiosStore from "../hooks/useAxios";
import { useTaskStore } from "../config/taskStore";
import * as Yup from "yup";
import FormModal from "../modals/FormModal";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "../context/ThemeContext";
import { useEditTaskStore } from "../config/editTaskStore";
import { useUsersStore } from "../config/usersStore";
import { useProjectStore } from "../config/projectStore";
import { useUserStore } from "../config/userStore";
import Loading from "../components/Loading.jsx";
import { useFetchErrorStore } from "../config/errorStore.jsx";

const TaskInfo = () => {
  const { idTarea, idTablero } = useParams(); // `idTarea` para la tarea específica
  const { fetch } = useAxiosStore();
  const { task, setTask } = useTaskStore();
  const { setTaskEdited, setEditTaskError, taskEdited } = useEditTaskStore();
  const { setUsers } = useUsersStore();
  const { user } = useUserStore();
  const { setFetchError } = useFetchErrorStore();
  const {
    setProject,
    loading,
    setLoading,
    setTodoTasks,
    setInProgressTasks,
    setToReviewTasks,
    setDoneTasks,
  } = useProjectStore();
  const token = localStorage.getItem("token");
  const [modalCommentOpen, setModalCommentOpen] = useState(false);
  const [commentAdded, setCommentAdded] = useState(false);
  const navigate = useNavigate();

  const { isDarkMode } = useTheme();

  const validationSchemaComment = Yup.object().shape({
    message: Yup.string()
      .trim()
      .required("El campo 'Comentario' es obligatorio"),
  });

  // Efecto para cargar los datos de la tarea

  useEffect(() => {
    // Función para obtener los datos del proyecto

    async function fetchProjectData() {
      try {
        const projectResponse = await fetch(
          `${import.meta.env.VITE_BASE_API}tableros/${idTablero}`,
          "GET",
          null,
          { Authorization: `Bearer ${token}` }
        );
        if (projectResponse.error) throw new Error(projectResponse.error);
        return projectResponse.data;
      } catch (error) {
        setFetchError("Error al obtener el proyecto");
        throw error;
      }
    }

    // Función para obtener los datos de un usuario
    async function fetchUserData(userId) {
      try {
        const userResponse = await fetch(
          `${import.meta.env.VITE_BASE_API}usuarios/${userId}`,
          "GET",
          null,
          { Authorization: `Bearer ${token}` }
        );
        if (userResponse.error) throw new Error(userResponse.error);
        return userResponse.data;
      } catch (error) {
        setFetchError(`Error al obtener datos del usuario ${userId}`);
        throw error;
      }
    }

    //Función para obtener las tareas según su estado

    async function fetchTaskData(estado) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_API}tareas/estado`,
          "POST",
          { tablero: idTablero, estado },
          { Authorization: `Bearer ${token}` }
        );
        if (response.error) throw new Error(response.error);
        return response.data;
      } catch (error) {
        setFetchError(`Error al obtener tareas de estado ${estado}`);
        return [];
      }
    }

    //Función principal para obtener todos los datos del proyecto y sus tareas

    async function getProjectAndTasks() {
      setLoading(true);
      try {
        const projectData = await fetchProjectData();

        // Obtener administrador
        const adminData = await fetchUserData(projectData.administrador);

        // Obtener colaboradores
        const collaborators = await Promise.all(
          projectData.colaboradores.map((colaboradorId) =>
            fetchUserData(colaboradorId)
          )
        );

        // Actualizar proyecto con datos completos
        setProject({
          ...projectData,
          administrador: adminData,
          colaboradores: collaborators.filter(Boolean),
        });

        // Obtener y establecer tareas según estado
        const [todo, inProgress, toReview, done] = await Promise.all([
          fetchTaskData("pendiente"),
          fetchTaskData("en_proceso"),
          fetchTaskData("en_revision"),
          fetchTaskData("completada"),
        ]);

        setTodoTasks(todo);
        setInProgressTasks(inProgress);
        setToReviewTasks(toReview);
        setDoneTasks(done);
      } catch (error) {
        setFetchError("Error al cargar los datos del proyecto y tareas");
        navigate("/not-found");
      }
    }

    async function fetchUsers() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_API}usuarios`,
          "GET",
          null,
          { Authorization: `Bearer ${token}` }
        );
        if (response.error) throw new Error(response.error);
        return response.data;
      } catch (error) {
        setFetchError("Error al obtener los usuarios");
      }
    }

    async function getUsers() {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        setFetchError("Error al obtener los usuarios");
        navigate("/not-found");
      }
    }
    // Función para obtener los datos de la tarea y sus detalles asociados

    async function fetchTask() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_API}tareas/${idTarea}`,
          "GET",
          null,
          { Authorization: `Bearer ${token}` }
        );
        if (response.error) throw new Error(response.error);

        const fetchedTask = response.data;

        // Obtener datos del usuario asignado
        const assignedUserResponse = await fetch(
          `${import.meta.env.VITE_BASE_API}usuarios/${fetchedTask.asignadoA}`,
          "GET",
          null,
          { Authorization: `Bearer ${token}` }
        );
        const assignedUser = assignedUserResponse.data;

        // Obtener datos de los usuarios que comentaron
        const comentariosUsuarios = await Promise.all(
          fetchedTask.comentarios.map(async (comentario) => {
            const usuarioResponse = await fetch(
              `${import.meta.env.VITE_BASE_API}usuarios/${comentario.usuario}`,
              "GET",
              null,
              { Authorization: `Bearer ${token}` }
            );
            return {
              ...comentario,
              usuarioNombre: usuarioResponse.data.nombre,
              usuario: usuarioResponse.data._id,
            };
          })
        );

        // Actualizar tarea con datos completos
        setTask({
          ...fetchedTask,
          asignadoA: assignedUser.nombre,
          asignadoAId: assignedUser._id,
          comentarios: comentariosUsuarios,
        });
      } catch (error) {
        setFetchError("Error al cargar la tarea");
        navigate("/not-found");
      } finally {
        setLoading(false);
      }
    }

    if (idTablero && token) {
      getProjectAndTasks();
      getUsers();
    }

    if (idTarea && token) {
      fetchTask();
    }
  }, [idTarea, token, fetch, setLoading, taskEdited, commentAdded]);

  if (loading) {
    return <Loading />;
  }

  if (!task) {
    return <h1>No se encontró la tarea.</h1>;
  }

  return (
    task && (
      <div className="contenedor__info">
        <header className="info__header">
          <img
            className="header__image"
            src={isDarkMode ? beeDark : bee}
            alt="Logo de WorkHive"
          />
          <h1 className="header-proyecto__titulo">{task.nombre}</h1>
          <MenuTask
            id={idTarea}
            onEditTask={async (values) => {
              try {
                const editResponse = await fetch(
                  `${import.meta.env.VITE_BASE_API}tareas/${idTarea}`,
                  "PUT",
                  {
                    nombre: values.name,
                    descripcion: values.description,
                    prioridad: values.priority,
                    fechaLimite: values.dateEnd,
                    asignadoA: values.asigned,
                  },
                  {
                    Authorization: `Bearer ${token}`,
                  }
                );

                if (editResponse.error) throw editResponse.error;

                setTaskEdited(true);
              } catch (error) {
                setEditTaskError(error.error.message);
              }
            }}
            onDeleteTask={async () => {
              try {
                setLoading(true);
                const deleteResponse = await fetch(
                  `${import.meta.env.VITE_BASE_API}tareas/${idTarea}`,
                  "DELETE",
                  null,
                  { Authorization: `Bearer ${token}` }
                );

                if (deleteResponse.error) throw deleteResponse.error;

                navigate(`/usuario/tablero/${idTablero}`);
              } finally {
                setLoading(false);
              }
            }}
          />
          <select
            className="header__estado"
            name="estado"
            id="estado"
            value={task.estado}
            onChange={(e) => {
              try {
                setLoading(true);
                task.estado = e.target.value;
                fetch(
                  `${import.meta.env.VITE_BASE_API}tareas/${idTarea}`,
                  "PUT",
                  {
                    estado: e.target.value,
                  },
                  {
                    Authorization: `Bearer ${token}`,
                  }
                );
              } finally {
                setLoading(false);
              }
            }}
          >
            <option value="pendiente">To Do</option>
            <option value="en_proceso">In Progress</option>
            <option value="en_revision">To Review</option>
            <option value="completada">Done</option>
          </select>
          <select
            className="header__prioridad"
            name="prioridad"
            id="prioridad"
            value={task.prioridad}
            onChange={(e) => {
              try {
                setLoading(true);
                task.prioridad = e.target.value;
                fetch(
                  `${import.meta.env.VITE_BASE_API}tareas/${idTarea}`,
                  "PUT",
                  {
                    prioridad: e.target.value,
                  },
                  {
                    Authorization: `Bearer ${token}`,
                  }
                );
              } finally {
                setLoading(false);
              }
            }}
          >
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
        </header>

        <section className="info__proyecto">
          <div className="proyecto__descripcion">
            <h1 className="descripcion__titulo">Descripción de tarea</h1>
            <p className="descripcion__parrafo">{task.descripcion}</p>
          </div>

          <div className="proyecto__fechas">
            <p className="fechas__parrafo">
              <span>Fecha límite: </span>
              {new Date(task.fechaLimite).toLocaleDateString()}
            </p>
          </div>

          <div className="proyecto__administrador">
            <h1 className="administrador__titulo">Asignado a:</h1>
            <p className="administrador__nombre">{task.asignadoA}</p>
          </div>
        </section>

        <section className="contenedor__comentarios">
          <h1 className="comentarios__titulo">COMENTARIOS</h1>

          <ul className="comentarios__lista">
            {task.comentarios
              .slice()
              .reverse()
              .map((comentario) => (
                <li key={comentario._id} className="lista__item">
                  <h1 className="item__titulo">{comentario.usuario}</h1>
                  <p className="item__mensaje">{comentario.mensaje}</p>
                  <p className="item__fecha">
                    {new Date(comentario.fecha).toLocaleDateString()}{" "}
                    {new Date(comentario.fecha).toLocaleTimeString()}
                  </p>
                </li>
              ))}
          </ul>
          <article className="item__agregar">
            <p className="agregar__titulo">Agregar comentario</p>
            <a
              className="agregar__enlace"
              href="#"
              onClick={() => setModalCommentOpen(true)}
            >
              <AddIcon />
            </a>
          </article>
        </section>

        {/* Modal para añadir comentarios a una tarea */}
        <FormModal
          isOpen={modalCommentOpen}
          onClose={() => setModalCommentOpen(false)}
          initialValues={{
            message: "",
          }}
          validationSchema={validationSchemaComment}
          onSubmit={async (values) => {
            setModalCommentOpen(false);
            setCommentAdded(false);
            try {
              const commentResponse = await fetch(
                `${import.meta.env.VITE_BASE_API}tareas/${idTarea}`,
                "PUT",
                {
                  comentarios: [
                    ...task.comentarios,
                    {
                      usuario: user._id || user.id,
                      mensaje: values.message,
                      fecha: new Date(),
                    },
                  ],
                },
                {
                  Authorization: `Bearer ${token}`,
                }
              );

              if (commentResponse.error) throw commentResponse.error;
              setTask({
                ...task,
                comentarios: [
                  ...task.comentarios,
                  {
                    usuario: user._id,
                    mensaje: values.message,
                    fecha: new Date(),
                  },
                ],
              });
              setCommentAdded(true);
            } catch (error) {}
          }}
          title="Añadir comentario"
        >
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <>
              <label htmlFor="message" className="formulario__label">
                Comentario
                <textarea
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="formulario__input"
                />
                {errors.message && touched.message && (
                  <p className="formulario__error">* {errors.message}</p>
                )}
              </label>
            </>
          )}
        </FormModal>
      </div>
    )
  );
};

export default TaskInfo;
