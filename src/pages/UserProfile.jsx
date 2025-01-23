import React, { useEffect } from "react";
import bee from "../assets/bee.png";
import Board from "../components/Board";
import { useUserStore } from "../config/userStore";
import useAxiosStore from "../hooks/useAxios";
import { useProjectsStore } from "../config/projectsStore";

const UserProfile = () => {
  const {
    isLoading,
    actualProjects,
    completedProjects,
    setIsLoading,
    setActualProjects,
    setCompletedProjects,
  } = useProjectsStore();

  const { user } = useUserStore();
  const { fetch } = useAxiosStore();
  const token = localStorage.getItem("token");

  async function getProjects() {
    try {
      if (user) {
        const [adminProjects, collaboratorProjects] = await Promise.all([
          fetch(
            import.meta.env.VITE_BASE_API + `tableros/administrador/${user.id}`,
            "GET",
            null,
            { Authorization: `Bearer ${token}` }
          ),
          fetch(
            import.meta.env.VITE_BASE_API + `tableros/colaborador/${user.id}`,
            "GET",
            null,
            { Authorization: `Bearer ${token}` }
          ),
        ]);

        if (adminProjects.error) throw new Error(adminProjects.error);
        if (collaboratorProjects.error)
          throw new Error(collaboratorProjects.error);

        const allProjects = [
          ...adminProjects.data,
          ...collaboratorProjects.data,
        ];
        const projectPromises = allProjects.map((project) =>
          fetch(
            import.meta.env.VITE_BASE_API + `tableros/${project._id}/actual`,
            "GET",
            null,
            { Authorization: `Bearer ${token}` }
          )
        );

        const projectStatuses = await Promise.all(projectPromises);

        const newActualProjects = [];
        const newCompletedProjects = [];

        allProjects.forEach((project, index) => {
          if (projectStatuses[index].data.actual) {
            newActualProjects.push(project);
          } else {
            newCompletedProjects.push(project);
          }
        });

        setActualProjects(newActualProjects);
        setCompletedProjects(newCompletedProjects);
      }
    } catch (error) {
      console.error("Error al cargar los proyectos", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProjects();
  }, [user, token, fetch]);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="contenedor__usuario">
      <nav className="menu__usuario">
        <ul className="usuario__lista">
          <li className="lista__opcion">
            <a href="">CREAR NUEVO PROYECTO</a>
          </li>
          <li className="lista__opcion">
            <a href="">CONFIGURACIÓN USUARIO</a>
          </li>
        </ul>
      </nav>

      <section className="info__usuario">
        <div className="usuario__images">
          {/* Foto de perfil del usuario */}
          {user && user.fotoPerfil ? (
            <img className="images__user" src={user.fotoPerfil} alt="" />
          ) : (
            <img
              className="images__user"
              src="https://cdn-icons-png.flaticon.com/512/6326/6326055.png"
              alt=""
            />
          )}
          <div className="user__bee">
            {/* Logo WorkHive */}
            <img className="images__logo" src={bee} alt="Logo de WorkHive" />
          </div>
        </div>

        {/* Nombre completo del usuario */}
        <h1 className="usuario__nombre">{user && user.nombre}</h1>
      </section>

      <section className="contenedor__proyectos">
        <Board
          name="PROYECTOS ACTUALES"
          type="inprogress"
          panels={actualProjects}
        />
        <Board
          name="PROYECTOS FINALIZADOS"
          type="done"
          panels={completedProjects}
        />
      </section>
    </div>
  );
};

export default UserProfile;
