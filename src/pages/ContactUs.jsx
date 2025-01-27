/**
 * @module Pages
 * @category Routes
 */

import React from 'react';
import {Formik} from "formik";
import * as Yup from "yup";
import LogoWorkHive from "../assets/logo.png"
import logoDark from "../assets/logodark.png";
import { useTheme } from '../context/ThemeContext'

/**
 * @page
 * Componente ContactUs
 * 
 * Este componente renderiza un formulario de contacto utilizando Formik para el manejo del estado del formulario
 * y Yup para la validación de los campos.
 * 
 * @returns {JSX.Element} Formulario de contacto
 */
const ContactUs = () => {
    const { isDarkMode } = useTheme();
//Esquema de validación para el formulario
    const validationSchema = Yup.object().shape({
        name: Yup.string().trim().required("El campo nombre es obligatorio"),
        email: Yup.string().trim().matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, "El formato del email no es válido").required("El campo email es obligatorio"),
        subject: Yup.string().trim().required("El campo asunto es obligatorio"),
        message: Yup.string().trim().required("El campo mensaje es obligatorio"),
        accept: Yup.boolean().oneOf([true], "Debes aceptar los términos y condiciones").required("Debes aceptar los términos y condiciones"),
    })

    /**
     * Función que se ejecuta al enviar el formulario
     * 
     * @param {Object} values - Valores del formulario
     * @param {Object} actions - Acciones de Formik
     * @param {Function} actions.setSubmitting - Función para establecer el estado de envío
     * @param {Function} actions.resetForm - Función para resetear el formulario
     */
    const onSubmit = (values, {setSubmitting, resetForm}) => {
        resetForm();
        setSubmitting(false);
    }


    return (
        <>
            <main className="formulario-cuenta">
                <aside className="formulario-cuenta__lateral">
                    <img src={isDarkMode ? logoDark : LogoWorkHive} alt="" className="lateral__logo"/>
                    <p className="lateral__nombre">WORKHIVE</p>
                </aside>

                <section className="formulario-cuenta__principal">
                    <Formik
                        initialValues={{
                            name: "",
                            email: "",
                            subject: "",
                            message: "",
                            accept: false
                        }}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                    >
                        {
                            ({values, handleChange, handleBlur, handleSubmit, resetForm, isSubmitting, errors, touched}) => (
                                <form onSubmit={handleSubmit} className="principal__formulario">
                                    <h1 className="formulario__titulo">Contacta con nosotros</h1>

                                    <label htmlFor="name" className="formulario__label">
                                        Nombre *
                                        <input
                                            type="text"
                                            name="name"
                                            value={values.name}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className="formulario__input"
                                            aria-required="true"
                                            placeholder="Escriba su nombre"
                                        />
                                        {
                                            errors.name && touched.name && <p className="formulario__error">*{errors.name}</p>
                                        }
                                    </label>

                                    <label htmlFor="email" className="formulario__label">
                                        Email *
                                        <input
                                            type="email"
                                            name="email"
                                            value={values.email}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className="formulario__input"
                                            aria-required="true"
                                            placeholder="Escriba su e-mail"
                                        />
                                        {
                                            errors.email && touched.email && <p className="formulario__error">*{errors.email}</p>
                                        }
                                    </label>

                                    <label htmlFor="subject" className="formulario__label">
                                        Asunto *
                                        <input
                                            type="text"
                                            name="subject"
                                            value={values.subject}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className="formulario__input"
                                            aria-required="true"
                                            placeholder="Describa en pocas palabras el contenido del mensaje"
                                        />
                                        {
                                            errors.subject && touched.subject && <p className="formulario__error">*{errors.subject}</p>
                                        }
                                    </label>

                                    <label htmlFor="message" className="formulario__label">
                                        Mensaje *
                                        <textarea
                                            name="message"
                                            id="message"
                                            cols="60"
                                            rows="10"
                                            value={values.message}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className="formulario__input"
                                            aria-required="true"
                                            placeholder="Escriba su mensaje"
                                        />
                                        {
                                            errors.message && touched.message && <p className="formulario__error">*{errors.message}</p>
                                        }
                                    </label>

                                    <label htmlFor="accept" className="formulario__label-checkbox">
                                        <input
                                            type="checkbox"
                                            name="accept"
                                            checked={values.accept}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            aria-required="true"
                                            className="formulario__checkbox"
                                        />
                                            Acepto los términos legales, la política de privacidad y las condiciones de este sitio web.
                                        {
                                            errors.accept && touched.accept && <p className="formulario__error">*{errors.accept}</p>
                                        }
                                    </label>

                                    <button disabled={isSubmitting} type="submit" className="formulario__submit">Enviar</button>
                                </form>
                            )
                        }
                    </Formik>
                </section>
            </main>
        </>
    );
};

export default ContactUs;