/**
 * @module Pages
 * @category Routes
 */

import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useUserStore } from "../config/userStore";
import useAxiosStore from "../hooks/useAxios";
import LogoWorkHive from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import logoDark from "../assets/logodark.png";
import { useTheme } from "../context/ThemeContext";
import { Helmet } from "react-helmet";

/**
 * @page
 * Componente Register
 *
 * Este componente renderiza un formulario de registro de usuario.
 * Utiliza Formik para el manejo del estado del formulario, Yup para la validación,
 * y hooks personalizados para el manejo del estado global y peticiones HTTP.
 *
 * @returns {JSX.Element} Formulario de registro de usuario
 */
const Register = () => {
  const { setUser, error, setError } = useUserStore();
  const navigate = useNavigate();
  const { fetch } = useAxiosStore();
  const { isDarkMode } = useTheme();

  //Esquema de validación para el formulario de registro

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

  //Función que se ejecuta al enviar el formulario de registro

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

      if (response.error) {
        throw response.error;
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

      if (loginResponse.error) {
        throw loginResponse.error;
      }

      setUser({
        id: loginResponse.data.user._id,
        name: loginResponse.data.user.name,
        role: loginResponse.data.user.role,
      });
      localStorage.setItem("token", loginResponse.data.token);
      navigate("/usuario");
    } catch (error) {
      if (error.status === 400) {
        setError("Ya hay un usuario registrado con ese email");
      } else {
        setError(
          "El servidor no se encuentra operativo en estos momentos, inténtelo más tarde..."
        );
      }
      setSubmitting(false);
    }
  };

  return (
    <>
      <main className="formulario-cuenta">
        <Helmet>
          <title>WorkHive - Registro</title>
        </Helmet>
        <aside className="formulario-cuenta__lateral">
          <img
            src={isDarkMode ? logoDark : LogoWorkHive}
            alt=""
            className="lateral__logo"
          />
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
              handleChange: originalHandleChange,
              handleBlur,
              handleSubmit,
              resetForm,
              isSubmitting,
              errors,
              touched,
            }) => {
              const handleChange = (e) => {
                setError(null);
                originalHandleChange(e);
              };

              return (
                <form onSubmit={handleSubmit} className="principal__formulario">
                  <h1 className="formulario__titulo">Create una cuenta</h1>

                  <label htmlFor="nombre" className="formulario__label">
                    Nombre de usuario
                    <input
                      type="text"
                      id="nombre"
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
                      id="email"
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
                      id="password"
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
                      id="repeatPassword"
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
                    {error && <p className="formulario__error">*{error}</p>}
                  </label>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="formulario__submit"
                  >
                    Crear cuenta
                  </button>
                </form>
              );
            }}
          </Formik>

          <div>
            <p>
              Ya tienes una cuenta?{" "}
              <a
                href="/auth/login"
                onClick={() => setError(null)}
                className="principal__cambio"
              >
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
