import React from 'react';
import {Formik} from "formik";
import * as Yup from "yup";

const Register = () => {

    const validationSchema = Yup.object().shape({
        name: Yup.string().trim().required("El campo nombre es obligatorio"),
        email: Yup.string().trim()
            .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, "El formato del email no es válido")
            .required("El campo email es obligatorio"),
        password: Yup.string().trim()
            .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/, "La contraseña no cumple los requisitos. Debe tener una longitud mínima de 8 caracteres y contener una letra en mayúscula, un número y un caracter especial.")
            .required("El campo contraseña es obligatorio."),
        repeatPassword: Yup.string().trim()
            .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
            .required("Por favor, repita la contraseña")
    })

    const onSubmit = (values, { setSubmitting, resetForm }) => {
        resetForm();
        setSubmitting(false);
        console.log("Sesión iniciada: ", values);
    }

    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    repeatPassword: ''
                }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {
                    ({values, handleChange, handleBlur, handleSubmit, resetForm, isSubmitting, errors, touched}) => (
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name">
                                Nombre de usuario:
                                <input
                                    type="text"
                                    name="name"
                                    value={values.name}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                {
                                    errors.name && touched.name && errors.name
                                }
                            </label>

                            <label htmlFor="email">
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onBlur={handleBlur}
                                    onChange={handleChange}/>
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
                                    onBlur={handleBlur}
                                    onChange={handleChange}/>
                                {
                                    errors.password && touched.password && errors.password
                                }
                            </label>

                            <label htmlFor="repeatPassword">
                                Repetir contraseña:
                                <input
                                    type="password"
                                    name="repeatPassword"
                                    value={values.repeatPassword}
                                    onBlur={handleBlur}
                                    onChange={handleChange}/>
                                {
                                    errors.repeatPassword && touched.repeatPassword && errors.repeatPassword
                                }
                            </label>


                            <button disabled={isSubmitting} type="submit">Crear cuenta</button>

                        </form>
                    )
                }
            </Formik>
        </>
    );
};

export default Register;