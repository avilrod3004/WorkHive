/**
 * @module Pages
 * @category Routes
 */

import React from "react";
import { Formik } from "formik";
import { useUserStore } from "../config/userStore";
import useAxiosStore from "../hooks/useAxios";
import LogoWorkHive from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import logoDark from "../assets/logodark.png";
import { useTheme } from "../context/ThemeContext";
import { Helmet } from "react-helmet";

/**
 * @page
 * Componente Login
 *
 * Este componente renderiza un formulario de inicio de sesión.
 * Utiliza Formik para el manejo del estado del formulario, Zustand para el manejo del estado global del usuario,
 * y un hook personalizado para las peticiones HTTP.
 *
 * @returns {JSX.Element} Formulario de inicio de sesión
 */
const Login = () => {
  const { setUser, setError, error } = useUserStore();
  const navigate = useNavigate();
  const { fetch } = useAxiosStore();
  const { isDarkMode } = useTheme();

  /**
   * Función que se ejecuta al enviar el formulario de inicio de sesión
   *
   * @param {Object} values - Valores del formulario
   * @param {string} values.email - Email del usuario
   * @param {string} values.password - Contraseña del usuario
   * @param {Object} actions - Acciones de Formik
   * @param {Function} actions.setSubmitting - Función para establecer el estado de envío
   * @param {Function} actions.resetForm - Función para resetear el formulario
   */
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
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
      setError(null);
      localStorage.setItem("token", loginResponse.data.token);
      resetForm();
      setSubmitting(false);
      navigate("/usuario");
    } catch (error) {
      if (error.status === 400 || error.status === 401) {
        setError("Email y/o contraseña incorrectos");
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
          <title>WorkHive - Inicio de sesión</title>
          <meta
            name="description"
            content="Página de inicio de sesión de WorkHive"
          />
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
              email: "",
              password: "",
            }}
            onSubmit={onSubmit}
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
                  <h1 className="formulario__titulo">Inicia sesión</h1>

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
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="formulario__input"
                    />
                    {errors.password && touched.password && (
                      <p className="formulario__error">*{errors.password}</p>
                    )}
                    {error && <p className="formulario__error">*{error}</p>}
                  </label>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="formulario__submit"
                  >
                    Log in
                  </button>
                </form>
              );
            }}
          </Formik>

          <div>
            <p>
              No tienes una cuenta?{" "}
              <a
                href="/auth/register"
                onClick={() => setError(null)}
                className="principal__cambio"
              >
                Registrate
              </a>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
