import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import bee from "../assets/bee.png";
import MenuTask from "../components/TaskMenuEdit";
import useAxiosStore from "../hooks/useAxios";
import { useTaskStore } from "../config/taskStore";

const TaskInfo = () => {
  const { idTarea } = useParams(); // `idTarea` para la tarea específica
  const { fetch } = useAxiosStore();
  const { task, loading, setTask, setLoading } = useTaskStore();
  const token = localStorage.getItem("token");

  useEffect(() => {
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
    return <h1>Cargando...</h1>;
  }

  if (!task) {
    return <h1>No se encontró la tarea.</h1>;
  }

  return (
    task && (
      <div className="contenedor__info">
        <header className="info__header">
          <img className="header__image" src={bee} alt="Logo de WorkHive" />
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
          <h1 className="comentarios__titulo">Comentarios</h1>

          <ul className="comentarios__lista">
            {task.comentarios.map((comentario) => (
              <li key={comentario._id}>
                <article>
                  <h1>{comentario.usuario}</h1>
                  <p>{comentario.mensaje}</p>
                  <p>
                    {new Date(comentario.fecha).toLocaleDateString()}{" "}
                    {new Date(comentario.fecha).toLocaleTimeString()}
                  </p>
                </article>
              </li>
            ))}

            <article>
              <p>AGREGAR COMENTARIO</p>
              <a href="">
                <img src="" alt="Agregar comentario" />
              </a>
            </article>
          </ul>
        </section>
      </div>
    )
  );
};

export default TaskInfo;
