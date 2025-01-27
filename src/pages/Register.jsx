import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useUserStore } from "../config/userStore";
import useAxiosStore from "../hooks/useAxios";
import LogoWorkHive from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import logoDark from "../assets/logodark.png";
import { useTheme } from '../context/ThemeContext'

/**
 * Componente Register
 * 
 * Este componente renderiza un formulario de registro de usuario.
 * Utiliza Formik para el manejo del estado del formulario, Yup para la validación,
 * y hooks personalizados para el manejo del estado global y peticiones HTTP.
 * 
 * @returns {JSX.Element} Formulario de registro de usuario
 */
const Register = () => {
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const { fetch } = useAxiosStore();
  const { isDarkMode } = useTheme();

  /**
   * Esquema de validación para el formulario de registro
   */
  const validationSchema = Yup.object().shape({
    nombre: Yup.string().trim().required("El campo nombre es obligatorio"),
    email: Yup.string()
      .trim()
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        "El formato del email no es válido"
      )
      .required("El campo email es obligatorio"),
    password: Yup.string()
      .trim()
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
        "La contraseña no cumple los requisitos. Debe tener una longitud mínima de 8 caracteres y contener una letra en mayúscula, un número y un caracter especial."
      )
      .required("El campo contraseña es obligatorio."),
    repeatPassword: Yup.string()
      .trim()
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
      .required("Por favor, repita la contraseña"),
  });

  /**
   * Función que se ejecuta al enviar el formulario de registro
   * 
   * @param {Object} values - Valores del formulario
   * @param {Object} actions - Acciones de Formik
   * @param {Function} actions.setSubmitting - Función para establecer el estado de envío
   * @param {Function} actions.resetForm - Función para resetear el formulario
   */
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    delete values.repeatPassword;
    values.role = "usuario";

    let formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }
    try {
      // Registro del usuario
      const response = await fetch(
        import.meta.env.VITE_BASE_API + "usuarios",
        "POST",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.status === 201) {
        throw new Error(`Error: ${response.statusText}`);
      }
      resetForm();
      setSubmitting(false);

      // Login automático después del registro
      const loginResponse = await fetch(
        import.meta.env.VITE_BASE_API + "usuarios/logins",
        "POST",
        { email: values.email, password: values.password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!loginResponse.status === 201) {
        throw new Error(`Error: ${loginResponse.statusText}`);
      }

      setUser({
        id: loginResponse.data.user._id,
        name: loginResponse.data.user.name,
        role: loginResponse.data.user.role,
      });
      localStorage.setItem("token", loginResponse.data.token);
      navigate("/usuario");
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
    <>
      <main className="formulario-cuenta">
        <aside className="formulario-cuenta__lateral">
          <img src={isDarkMode ? logoDark : LogoWorkHive} alt="" className="lateral__logo" />
          <p className="lateral__nombre">WORKHIVE</p>
        </aside>

        <section className="formulario-cuenta__principal">
          <Formik
            initialValues={{
              nombre: "",
              email: "",
              password: "",
              repeatPassword: "",
            }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              resetForm,
              isSubmitting,
              errors,
              touched,
            }) => (
              <form onSubmit={handleSubmit} className="principal__formulario">
                <h1 className="formulario__titulo">Create una cuenta</h1>

                <label htmlFor="nombre" className="formulario__label">
                  Nombre de usuario
                  <input
                    type="text"
                    name="nombre"
                    value={values.nombre}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="formulario__input"
                  />
                  {errors.nombre && touched.nombre && (
                    <p className="formulario__error">*{errors.nombre}</p>
                  )}
                </label>

                <label htmlFor="email" className="formulario__label">
                  Email
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="formulario__input"
                  />
                  {errors.email && touched.email && (
                    <p className="formulario__error">*{errors.email}</p>
                  )}
                </label>

                <label htmlFor="password" className="formulario__label">
                  Contraseña
                  <input
                    type="password"
                    name="password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="formulario__input"
                  />
                  {errors.password && touched.password && (
                    <p className="formulario__error">*{errors.password}</p>
                  )}
                </label>

                <label htmlFor="repeatPassword" className="formulario__label">
                  Repetir contraseña
                  <input
                    type="password"
                    name="repeatPassword"
                    value={values.repeatPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="formulario__input"
                  />
                  {errors.repeatPassword && touched.repeatPassword && (
                    <p className="formulario__error">
                      *{errors.repeatPassword}
                    </p>
                  )}
                </label>

                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="formulario__submit"
                >
                  Crear cuenta
                </button>
              </form>
            )}
          </Formik>

          <div>
            <p>
              Ya tienes una cuenta?{" "}
              <a href="/auth/login" className="principal__cambio">
                Inicia sesión
              </a>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Register;
