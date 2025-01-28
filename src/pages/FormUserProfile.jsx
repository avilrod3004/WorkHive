
/**
 * @module Pages
 * @category Routes
 */

import React from 'react';
import {Formik} from "formik";
import * as Yup from "yup";

/**
 * @page
 * Componente FormUserProfile
 * 
 * Este componente renderiza un formulario para editar el perfil del usuario.
 * Utiliza Formik para el manejo del estado del formulario y Yup para la validación de los campos.
 * 
 * @returns {JSX.Element} Formulario de perfil de usuario
 */
const FormUserProfile = () => {

// Esquema de validación para el formulario

    const validationSchema = Yup.object().shape({
        name: Yup.string().trim().required("El campo nombre es obligatorio"),
        email: Yup.string().trim()
            .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, "El formato del email no es válido")
            .required("El campo email es obligatorio")
    })

    // Función que se ejecuta al enviar el formulario
    
    const onSubmit = (values, { setSubmitting, resetForm }) => {
        resetForm();
        setSubmitting(false);
    }

    return (
        <>
            <Formik
                initialValues={{
                    name: "",
                    email: ""
                }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {
                    ({values, handleChange, handleBlur, handleSubmit, resetForm, isSubmitting, errors, touched}) => (
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name">
                                Nombre:
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

                            <button>Cancelar</button>
                            <button disabled={isSubmitting} type="submit">Confirmar</button>

                        </form>
                    )
                }
            </Formik>
        </>
    );
};

export default FormUserProfile;
