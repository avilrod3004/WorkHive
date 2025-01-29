/**
 * @module Pages
 * @category Routes
 */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import bee from "../assets/bee.png";
import beeDark from "../assets/beedark.png";
import MenuTask from "../components/TaskMenuEdit";
import useAxiosStore from "../hooks/useAxios";
import { useTaskStore } from "../config/taskStore";
import * as Yup from "yup";
import FormModal from "../modals/FormModal";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from '../context/ThemeContext'
import Loading from "../components/Loading.jsx";

const TaskInfo = () => {
  const { idTarea } = useParams(); // `idTarea` para la tarea específica
  const { fetch } = useAxiosStore();
  const { task, loading, setTask, setLoading } = useTaskStore();
  const token = localStorage.getItem("token");
  const [modalCommentOpen, setModalCommentOpen] = useState(false);

  const { isDarkMode } = useTheme();

  const validationSchemaComment = Yup.object().shape({
    message: Yup.string()
      .trim()
      .required("El campo 'Comentario' es obligatorio"),
  });

  // Efecto para cargar los datos de la tarea

  useEffect(() => {
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
            return { ...comentario, usuario: usuarioResponse.data.nombre };
          })
        );

        // Actualizar tarea con datos completos
        setTask({
          ...fetchedTask,
          asignadoA: assignedUser.nombre,
          comentarios: comentariosUsuarios,
        });
      } catch (error) {
        console.error("Error al cargar la tarea:", error);
      } finally {
        setLoading(false);
      }
    }

    if (idTarea && token) {
      fetchTask();
    }
  }, [idTarea, token, fetch]);

  if (loading) {
    return <Loading/>;
  }

  if (!task) {
    return <h1>No se encontró la tarea.</h1>;
  }

  return (
    task && (
      <div className="contenedor__info">
        <header className="info__header">
          <img className="header__image" src={isDarkMode ? beeDark : bee}  alt="Logo de WorkHive" />
          <h1 className="header__titulo">{task.nombre}</h1>
          <MenuTask />
          <select
            className="header__estado"
            name="estado"
            id="estado"
            value={task.estado}
            onChange={(e) => {
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
            {task.comentarios.map((comentario) => (
              <li key={comentario._id} className="lista__item">
                <article className="item__section">
                  <h1 className="section__titulo">{comentario.usuario}</h1>
                  <p className="section__mensaje">{comentario.mensaje}</p>
                  <p className="section__fecha">
                    {new Date(comentario.fecha).toLocaleDateString()}{" "}
                    {new Date(comentario.fecha).toLocaleTimeString()}
                  </p>
                </article>
              </li>
            ))}

            <article className="item__agregar">
              <p className="agregar__titulo">Agregar comentario</p>
              <a className="agregar__enlace" href="#" onClick={() => setModalCommentOpen(true)}>
              <AddIcon />
              </a>
            </article>
          </ul>
        </section>

        {/* Modal para añadir comentarios a una tarea */}
        <FormModal
          isOpen={modalCommentOpen}
          onClose={() => setModalCommentOpen(false)}
          initialValues={{
            message: "",
          }}
          validationSchema={validationSchemaComment}
          onSubmit={(values) => {
            setModalCommentOpen(false);
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
