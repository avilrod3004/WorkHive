import React from 'react';
import {Formik} from "formik";
import * as Yup from "yup";

const ContactUs = () => {

    const validationSchema = Yup.object().shape({
        name: Yup.string().trim().required("El campo nombre es obligatorio"),
        email: Yup.string().trim().matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, "El formato del email no es válido").required("El campo email es obligatorio"),
        subject: Yup.string().trim().required("El campo asunto es obligatorio"),
        message: Yup.string().trim().required("El campo mensaje es obligatorio"),
        accept: Yup.boolean().oneOf([true], "Debes aceptar los términos y condiciones").required("Debes aceptar los términos y condiciones"),
    })

    const onSubmit = (values, {setSubmitting, resetForm}) => {
        resetForm();
        setSubmitting(false);
    }

    return (
        <>
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
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name">
                                Nombre:
                                <input
                                    type="text"
                                    name="name"
                                    value={values.name}
                                    onBlur={handleBlur}
                                    onChange={handleChange}/>
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

                            <label htmlFor="subject">
                                Asunto:
                                <input
                                    type="text"
                                    name="subject"
                                    value={values.subject}
                                    onBlur={handleBlur}
                                    onChange={handleChange}/>
                                {
                                    errors.subject && touched.subject && errors.subject
                                }
                            </label>

                            <label htmlFor="message">
                                Mensaje:
                                <textarea
                                    name="message"
                                    id="message"
                                    cols="60"
                                    rows="10"
                                    value={values.message}
                                    onBlur={handleBlur}
                                    onChange={handleChange}/>
                                {
                                    errors.message && touched.message && errors.message
                                }
                            </label>

                            <label htmlFor="accept">
                                <input
                                    type="checkbox"
                                    name="accept"
                                    checked={values.accept}
                                    onBlur={handleBlur}
                                    onChange={handleChange}/>Acepto los términos legales, la política de privacidad y las condiciones de este sitio web.
                                {
                                    errors.accept && touched.accept && errors.accept
                                }
                            </label>

                            <button disabled={isSubmitting} type="submit">Send</button>
                            <button type="button" onClick={() => resetForm()}>Reset</button>
                        </form>
                    )
                }
            </Formik>
        </>
    );
};

export default ContactUs;