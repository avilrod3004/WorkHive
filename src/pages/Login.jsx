import React from 'react';
import {Formik} from "formik";

const Login = () => {

    const onSubmit = (values, { setSubmitting, resetForm }) => {
        console.log("Sesion iniciada")
        resetForm();
        setSubmitting(false);
    }
    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                onSubmit={onSubmit}
            >
                {
                    ({values, handleChange, handleBlur, handleSubmit, resetForm, isSubmitting, errors, touched}) => (
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
                                {
                                    errors.email && touched.email && errors.email
                                }
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
                                {
                                    errors.password && touched.password && errors.password
                                }
                            </label>

                            <button disabled={isSubmitting} type="submit">Log in</button>
                            <button>Cancel</button>
                        </form>
                    )
                }
            </Formik>
        </>
    );
};

export default Login;