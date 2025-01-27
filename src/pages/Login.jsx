import React from "react";
import { Formik } from "formik";
import { useUserStore } from "../config/userStore";
import useAxiosStore from "../hooks/useAxios";
import LogoWorkHive from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import logoDark from "../assets/logodark.png";
import { useTheme } from '../context/ThemeContext'

/**
 * Componente Login
 * 
 * Este componente renderiza un formulario de inicio de sesión.
 * Utiliza Formik para el manejo del estado del formulario, Zustand para el manejo del estado global del usuario,
 * y un hook personalizado para las peticiones HTTP.
 * 
 * @returns {JSX.Element} Formulario de inicio de sesión
 */
const Login = () => {
  const { setUser } = useUserStore();
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

      if (!loginResponse.status === 201) {
        throw new Error(`Error: ${loginResponse.statusText}`);
      }

      setUser({
        id: loginResponse.data.user._id,
        name: loginResponse.data.user.name,
        role: loginResponse.data.user.role,
      });
      localStorage.setItem("token", loginResponse.data.token);
      resetForm();
      setSubmitting(false);
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
              email: "",
              password: "",
            }}
            onSubmit={onSubmit}
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
                <h1 className="formulario__titulo">Inicia sesión</h1>

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
                    <p className="formulario__error">*{errors.email}</p>
                  )}
                </label>

                <label htmlFor="password" className="formulario__label">
                  Contraseña
                  <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="formulario__input"
                  />
                  {errors.password && touched.password && (
                    <p className="formulario__error">*{errors.password}</p>
                  )}
                </label>

                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="formulario__submit"
                >
                  Log in
                </button>
              </form>
            )}
          </Formik>

          <div>
            <p>
              No tienes una cuenta?{" "}
              <a href="/auth/register" className="principal__cambio">
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
