import React, { useEffect } from "react";
import { Formik } from "formik";
import { useUserStore } from "../config/userStore";
import useAxiosStore from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setUser } = useUserStore();
  const token = localStorage.getItem("token");
  const { fetch } = useAxiosStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (token !== null) {
      navigate(-1);
    }
  }, [token, navigate]);

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
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };
  return (
    <>
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
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">
              Email:
              <input
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && errors.email}
            </label>

            <label htmlFor="password">
              Contraseña:
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password && errors.password}
            </label>

            <button disabled={isSubmitting} type="submit">
              Log in
            </button>
            <button>Cancel</button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Login;
