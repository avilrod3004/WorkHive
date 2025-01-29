/**
 * @module Pages
 * @category Routes
 */

import React, { useEffect } from "react";
import bee from "../assets/bee.png";
import beeDark from "../assets/beedark.png";
import EditMenuProject from "../components/EditMenuProject";
import TeamMenu from "../components/TeamMenu";
import { useProjectStore } from "../config/projectStore";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import useAxiosStore from "../hooks/useAxios";
import BoardTask from "../components/BoardTask";
import { useTheme } from "../context/ThemeContext";
import { useUsersStore } from "../config/usersStore";
import { useAddCollaboratorStore } from "../config/addCollaboratorStore";
import Loading from "../components/Loading.jsx";

/**
 * @page
 * Componente ProyectInfo
 *
 * Este componente muestra la información detallada de un proyecto específico,
 * incluyendo su descripción, fechas, administrador, y tableros de tareas.
 *
 * @returns {JSX.Element} Página de información detallada del proyecto
 */
const ProyectInfo = () => {
  const { id } = useParams(); // Recuperar ID desde la URL
  const {
    project,
    setProject,
    loading,
    setLoading,
    setTodoTasks,
    setInProgressTasks,
    setToReviewTasks,
    setDoneTasks,
    todoTasks,
    inProgressTasks,
    toReviewTasks,
    doneTasks,
  } = useProjectStore();
  const { fetch: newFetch } = useAxiosStore();
  const { users, setUsers } = useUsersStore();
  const { setError, setCollaboratorAdded } = useAddCollaboratorStore();
  const token = localStorage.getItem("token");
  const { isDarkMode } = useTheme();
  const { clearProject } = useProjectStore();
  const navigate = useNavigate();

  // Efecto para cargar los datos del proyecto y sus tareas

  useEffect(() => {
    // Función para obtener los datos del proyecto

    async function fetchProjectData() {
      try {
        const projectResponse = await newFetch(
          `${import.meta.env.VITE_BASE_API}tableros/${id}`,
          "GET",
          null,
          { Authorization: `Bearer ${token}` }
        );
        if (projectResponse.error) throw new Error(projectResponse.error);
        return projectResponse.data;
      } catch (error) {
        console.error("Error al obtener el proyecto:", error);
        throw error;
      }
    }

    // Función para obtener los datos de un usuario
    async function fetchUserData(userId) {
      try {
        const userResponse = await newFetch(
          `${import.meta.env.VITE_BASE_API}usuarios/${userId}`,
          "GET",
          null,
          { Authorization: `Bearer ${token}` }
        );
        if (userResponse.error) throw new Error(userResponse.error);
        return userResponse.data;
      } catch (error) {
        console.error(`Error al obtener datos del usuario ${userId}:`, error);
        throw error;
      }
    }

    //Función para obtener las tareas según su estado

    async function fetchTaskData(estado) {
      try {
        const response = await newFetch(
          `${import.meta.env.VITE_BASE_API}tareas/estado`,
          "POST",
          { tablero: id, estado },
          { Authorization: `Bearer ${token}` }
        );
        if (response.error) throw new Error(response.error);
        return response.data;
      } catch (error) {
        console.error(`Error al obtener tareas de estado ${estado}:`, error);
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
        console.error(
          "Error al cargar los datos del proyecto y tareas:",
          error
        );
      }
    }

    async function fetchUsers() {
      try {
        const response = await newFetch(
          `${import.meta.env.VITE_BASE_API}usuarios`,
          "GET",
          null,
          { Authorization: `Bearer ${token}` }
        );
        if (response.error) throw new Error(response.error);
        return response.data;
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    }

    async function getUsers() {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id && token) {
      getProjectAndTasks();
      getUsers();
    }
  }, [
    id,
    token,
    newFetch,
    setProject,
    setLoading,
    setTodoTasks,
    setInProgressTasks,
    setToReviewTasks,
    setDoneTasks,
  ]);

  if (loading) {
    return <Loading/>;
  }

  return (
    project && (
      <div className="contenedor__info">
        <header className="info__header">
          <div className="contenedor__image">
            <img
              className="header__image"
              src={isDarkMode ? beeDark : bee}
              alt="Logo de WorkHive"
            />
            <h1 className="header__titulo">{project.nombre}</h1>
          </div>
          <TeamMenu
            teamMembers={[project.administrador, ...project.colaboradores]}
          />
        </header>

        <section className="info__proyecto">
          <div className="proyecto__descripcion">
            <h1 className="descripcion__titulo">Descripción de proyecto</h1>
            <p className="descripcion__parrafo">{project.descripcion}</p>
          </div>

          <div className="proyecto__fechas">
            <div className="fechas__descripcion">
              <p className="fechas__parrafo">
                <span>Fecha de inicio: </span>
                {new Date(project.fechaInicio).toLocaleDateString()}
              </p>
            </div>

            <div className="fechas__descripcion">
              <p className="fechas__parrafo">
                <span>Fecha de fin: </span>
                {new Date(project.fechaFin).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="proyecto__administrador">
            <h1 className="administrador__titulo">Administrador</h1>
            <p className="administrador__nombre">
              {project.administrador.nombre}
            </p>
          </div>
        </section>

        <section className="contenedor__tareas">
          <BoardTask
            name="TO DO"
            type="todo"
            panels={todoTasks}
            idTablero={id}
          />
          <BoardTask
            name="IN PROGRESS"
            type="inprogress"
            panels={inProgressTasks}
            idTablero={id}
          />
          <BoardTask
            name="TO REVIEW"
            type="toreview"
            panels={toReviewTasks}
            idTablero={id}
          />
          <BoardTask
            name="DONE"
            type="done"
            panels={doneTasks}
            idTablero={id}
          />
        </section>

        <EditMenuProject
          id={id}
          onAddPerson={async (email) => {
            try {
              const user = users.find((u) => u.email === email);
              if (user) {
                if (project.administrador._id === user._id) {
                  setError("El usuario ya está en el proyecto");
                  throw "El usuario ya está en el proyecto";
                } else {
                  const colaborador = project.colaboradores.find(
                    (u) => u._id === user._id
                  );
                  if (colaborador) {
                    setError("El usuario ya está en el proyecto");
                    throw "El usuario ya está en el proyecto";
                  } else {
                    const newCollaborators = [...project.colaboradores, user];
                    setProject({ ...project, colaboradores: newCollaborators });
                    const colaboradorResponse = await newFetch(
                      import.meta.env.VITE_BASE_API +
                        `tableros/${id}/colaboradores`,
                      "POST",
                      { userId: user._id },
                      { Authorization: `Bearer ${token}` }
                    );

                    if (colaboradorResponse.error) {
                      setError(colaboradorResponse.error);
                      throw colaboradorResponse.error;
                    }

                    setCollaboratorAdded(true);
                  }
                }
              } else {
                setError("El usuario no está registrado");
                throw "El usuario no está registrado";
              }
            } catch (error) {
              console.error("Error al agregar persona al proyecto:", error);
            }
          }}
          onDeleteProject={async () => {
            try {
              const response = await newFetch(
                import.meta.env.VITE_BASE_API + `tableros/${id}`,
                "DELETE",
                null,
                { Authorization: `Bearer ${token}` }
              );

              if (response.error) throw new Error(response.error);

              clearProject();

              navigate("/usuario");
            } catch (error) {
              console.error("Error al eliminar proyecto:", error);
            }
          }}
        />
      </div>
    )
  );
};

export default ProyectInfo;
