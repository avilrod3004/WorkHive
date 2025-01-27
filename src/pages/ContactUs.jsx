import React from 'react';
import {Formik} from "formik";
import * as Yup from "yup";
import LogoWorkHive from "../assets/logo.png"
import logoDark from "../assets/logodark.png";
import { useTheme } from '../context/ThemeContext'

/**
 * Componente ContactUs
 * 
 * Este componente renderiza un formulario de contacto utilizando Formik para el manejo del estado del formulario
 * y Yup para la validación de los campos.
 * 
 * @returns {JSX.Element} Formulario de contacto
 */
const ContactUs = () => {
    const { isDarkMode } = useTheme();

    /**
     * Esquema de validación para el formulario
     * Define las reglas de validación para cada campo del formulario
     */
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
        // ... (código JSX del componente)
    );
};

export default ContactUs;
