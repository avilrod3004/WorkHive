/**
 * @module Pages
 * @category Routes
 */

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
import Loading from "../components/Loading.jsx";
import { useFetchErrorStore } from "../config/errorStore.jsx";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

/**
 * @page
 * Componente UserProfile
 *
 * Este componente muestra la página de perfil del usuario, incluyendo su información personal,
 * proyectos actuales y proyectos completados. También proporciona funcionalidad para editar el
 * perfil del usuario y crear nuevos proyectos.
 *
 * @component
 * @returns {JSX.Element} Página de perfil de usuario, mostrando sus proyectos actuales y los finalizados.
 */
const UserProfile = () => {
  const {
    isLoading,
    actualProjects,
    completedProjects,
    setIsLoading,
    setActualProjects,
    setCompletedProjects,
  } = useProjectsStore();

  const { user, setUser } = useUserStore();
  const { fetch: newFetch } = useAxiosStore();
  const { setFetchError } = useFetchErrorStore();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { isDarkMode } = useTheme();
  const [modalNewProjectOpen, setmodalNewProjectOpen] = useState(false);
  const [modalEditProfileOpen, setmodalEditProfileOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({
    src: null,
    file: null,
    name: "",
  });

  const validationSchemaNewProject = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required("El campo 'Nombre proyecto' es obligatorio"),
    description: Yup.string()
      .trim()
      .required("El campo 'Descripción' es obligatorio."),
    dateIni: Yup.date().required("El campo 'Fecha' es obligatorio"),
    dateEnd: Yup.date()
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

  // Obtiene los datos del usuario actual desde la API

  async function getUser() {
    try {
      if (user) {
        const response = await newFetch(
          `${import.meta.env.VITE_BASE_API}usuarios/${user._id || user.id}`,
          "GET",
          null,
          { Authorization: `Bearer ${token}` }
        );

        if (response.error) throw new Error(response.error);

        const userData = await response.data;
        setUser(userData);
      }
    } catch (error) {
      setFetchError("Error al obtener los datos del usuario");
      navigate("/not-found");
    }
  }

  // Obtiene los proyectos del usuario desde la API y los categoriza como actuales o completados

  async function getProjects() {
    try {
      if (user) {
        const [adminProjects, collaboratorProjects] = await Promise.all([
          newFetch(
            import.meta.env.VITE_BASE_API +
              `tableros/administrador/${user._id || user.id}`,
            "GET",
            null,
            { Authorization: `Bearer ${token}` }
          ),
          newFetch(
            import.meta.env.VITE_BASE_API +
              `tableros/colaborador/${user._id || user.id}`,
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
          newFetch(
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
      setFetchError("Error al obtener los proyectos");
      navigate("/not-found");
    } finally {
      setIsLoading(false);
    }
  }

  //Hook de efecto para obtener los datos del usuario y los proyectos al montar el componente

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      await getUser();
      await getProjects();
    }

    if (user && token) {
      fetchData();
    }
  }, [token, fetch]);

  // Maneja el cambio de la imagen de perfil

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        console.log(
          "Por favor, sube una imagen válida (JPEG, PNG, JPG o WEBP)."
        );
        return;
      }

      // Guardamos el archivo y el nombre del archivo directamente
      setSelectedImage({
        src: URL.createObjectURL(file), // Vista previa usando un objeto URL temporal
        file, // El archivo original para enviarlo con FormData
        name: file.name, // Nombre del archivo
      });
    }
  };

  // Maneja el envío del formulario de edición de perfil

  const handleEditProfileSubmit = async (values) => {
    try {
      setIsLoading(true);
      if (user) {
        const formData = new FormData();
        formData.append("nombre", values.name);
        formData.append("email", values.email);

        if (selectedImage.file) {
          formData.append("fotoPerfil", selectedImage.file);
        }

        const response = await newFetch(
          `${import.meta.env.VITE_BASE_API}usuarios/${user._id || user.id}`,
          "PUT",
          formData,
          {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          }
        );

        if (response.error) {
          throw new Error("Error al actualizar el perfil");
        }

        const updatedUser = await response.data;
        setUser(updatedUser);
      }
    } finally {
      setmodalEditProfileOpen(false);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="contenedor__usuario">
      <Helmet>
        <title>WorkHive - Mi Perfil</title>
        <meta name="description" content="Mi Perfil de usuario" />
      </Helmet>
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

      {/* Modal para crear un nuevo proyecto */}
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
            setIsLoading(true);
            const body = {
              nombre: values.name,
              descripcion: values.description,
              fechaInicio: values.dateIni || null,
              fechaFin: values.dateEnd || null,
              administrador: user._id || user.id,
              colaboradores: [],
            };

            const response = await newFetch(
              import.meta.env.VITE_BASE_API + "tableros",
              "POST",
              JSON.stringify(body),
              {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              }
            );

            const data = await response.data;

            if (response.error) {
              throw new Error(data.message || "Error al crear el tablero");
            }

            getProjects();
          } finally {
            setmodalNewProjectOpen(false);
            setIsLoading(false);
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
          name: user?.nombre || "",
          email: user?.email || "",
        }}
        validationSchema={validationSchemaEditProfile}
        onSubmit={handleEditProfileSubmit}
        title="Editar perfil"
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <>
            <div className="formulario-perfil">
              <div className="formulario-perfil__foto">
                <img
                  src={selectedImage.src || user.fotoPerfil || fotoCambiar}
                  alt="Foto de perfil"
                  className="foto__imagen-redonda"
                />

                <input
                  type="file"
                  id="fileInput"
                  className="foto__input-fichero"
                  onChange={handleImageChange}
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
