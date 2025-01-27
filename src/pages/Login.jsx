import React from "react";
import { Formik } from "formik";
import { useUserStore } from "../config/userStore";
import useAxiosStore from "../hooks/useAxios";
import LogoWorkHive from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import logoDark from "../assets/logodark.png";
import { useTheme } from "../context/ThemeContext";

const Login = () => {
  const { setUser, setError, error } = useUserStore();
  const navigate = useNavigate();
  const { fetch } = useAxiosStore();
  const { isDarkMode } = useTheme();

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

      if (!(loginResponse.error.status === 201)) {
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
      if (error.status === 400) {
        setError("Email y/o contraseña incorrectos");
      } else {
        setError(
          "El servidor no se encuentra operativo en estos momentos, inténtelo más tarde..."
        );
      }

      console.error(error.message);
      setSubmitting(false);
    }
  };

  return (
    <>
      <main className="formulario-cuenta">
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
