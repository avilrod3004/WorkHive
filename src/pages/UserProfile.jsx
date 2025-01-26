import React, { useEffect, useState } from "react";
import bee from "../assets/bee.png";
import beeDark from "../assets/beedark.png";
import panelFondo from "../assets/panelFondo.png";
import Board from "../components/Board";
import { useUserStore } from "../config/userStore";
import useAxiosStore from "../hooks/useAxios";
import { useProjectsStore } from "../config/projectsStore";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "../context/ThemeContext";
import FormModal from "../modals/FormModal.jsx";
import * as Yup from "yup";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { brown } from "@mui/material/colors";
import fotoCambiar from "../assets/margarita.png";

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
  const { isDarkMode } = useTheme();
  const [modalNewProjectOpen, setmodalNewProjectOpen] = useState(false);
  const [modalEditProfileOpen, setmodalEditProfileOpen] = useState(false);

  const validationSchemaNewProject = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required("El campo 'Nombre proyecto' es obligatorio"),
    description: Yup.string()
      .trim()
      .required("El campo 'Descripción' es obligatorio."),
    dateIni: Yup.date()
      .required("El campo 'Fecha' es obligatorio")
      .min(new Date(), "La fecha debe ser posterior a la actual"),
  });

  const validationSchemaEditProfile = Yup.object().shape({
    name: Yup.string().trim().required("El campo 'Nombre' es obligatorio"),
    email: Yup.string()
      .trim()
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        "El formato del email no es válido"
      )
      .required("El campo 'Email' es obligatorio"),
  });

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
            <a href="#" onClick={() => setmodalNewProjectOpen(true)}>
              <AddIcon
                sx={{
                  "&:hover": {
                    color: "#FFDE81",
                    cursor: "pointer",
                    fontSize: 28,
                  },
                }}
              />
              CREAR NUEVO PROYECTO
            </a>
          </li>
          <li className="lista__opcion">
            <a href="#" onClick={() => setmodalEditProfileOpen(true)}>
              <SettingsIcon
                sx={{
                  "&:hover": {
                    color: "#FFDE81",
                    cursor: "pointer",
                    fontSize: 28,
                  },
                }}
              />
              CONFIGURACIÓN USUARIO
            </a>
          </li>
        </ul>
      </nav>

      <section className="info__usuario">
        <div className="user__container">
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

          {/* Logo abejita */}
          <img
            className="images__logo"
            src={isDarkMode ? beeDark : bee}
            alt="Logo de WorkHive"
          />
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

      <FormModal
        isOpen={modalNewProjectOpen}
        onClose={() => setmodalNewProjectOpen(false)}
        initialValues={{
          name: "",
          dateIni: "",
          dateEnd: "",
          description: "",
        }}
        validationSchema={validationSchemaNewProject}
        onSubmit={async (values) => {
          try {
            const body = {
              nombre: values.name,
              descripcion: values.description,
              fechaInicio: values.dateIni || null,
              fechaFin: values.dateEnd || null,
              administrador: user.id,
              colaboradores: [],
            };

            const response = await fetch(
              import.meta.env.VITE_BASE_API + "tableros",
              "POST",
              JSON.stringify(body),
              {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              }
            );

            const data = await response.data;

            if (!response.status === 201) {
              throw new Error(data.message || "Error al crear el tablero");
            }

            console.log("Tablero creado exitosamente:", data);
            getProjects();
          } catch (error) {
            console.error("Error al crear el proyecto:", error);
          } finally {
            setmodalNewProjectOpen(false);
          }
        }}
        title="Añadir proyecto"
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

      <FormModal
        isOpen={modalEditProfileOpen}
        onClose={() => setmodalEditProfileOpen(false)}
        initialValues={{
          name: "",
          dateIni: "",
          dateEnd: "",
          description: "",
        }}
        validationSchema={validationSchemaEditProfile}
        onSubmit={(values) => {
          setmodalEditProfileOpen(false);
        }}
        title="Editar perfil"
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <>
            <div className="formulario-perfil">
              <div className="formulario-perfil__foto">
                <img
                  src={fotoCambiar}
                  alt=""
                  className="foto__imagen-redonda"
                />

                <input
                  type="file"
                  id="fileInput"
                  className="foto__input-fichero"
                />

                <label htmlFor="fileInput" className="foto__boton">
                  <AddPhotoAlternateIcon sx={{ color: brown[400] }} />
                </label>
              </div>
            </div>

            <label htmlFor="name" className="formulario__label">
              Nombre
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
            </label>
          </>
        )}
      </FormModal>
    </div>
  );
};

export default UserProfile;
