import React, { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useUserStore } from "../config/userStore";
import useAxiosStore from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { setUser } = useUserStore();
  const token = localStorage.getItem("token");
  const { fetch } = useAxiosStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (token !== null) {
      navigate(-1);
    }
  }, []);

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

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    delete values.repeatPassword;
    values.role = "usuario";

    let formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }
    try {
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
          <form onSubmit={handleSubmit}>
            <label htmlFor="nombre">
              Nombre de usuario:
              <input
                type="text"
                name="nombre"
                value={values.nombre}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.nombre && touched.nombre && errors.nombre}
            </label>

            <label htmlFor="email">
              Email:
              <input
                type="email"
                name="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.email && touched.email && errors.email}
            </label>

            <label htmlFor="password">
              Contraseña:
              <input
                type="password"
                name="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.password && touched.password && errors.password}
            </label>

            <label htmlFor="repeatPassword">
              Repetir contraseña:
              <input
                type="password"
                name="repeatPassword"
                value={values.repeatPassword}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.repeatPassword &&
                touched.repeatPassword &&
                errors.repeatPassword}
            </label>

            <button disabled={isSubmitting} type="submit">
              Crear cuenta
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Register;
