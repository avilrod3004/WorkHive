import React from 'react';
import {Formik} from "formik";
import LogoWorkHive from "../assets/logo.png"

const Login = () => {

    const onSubmit = (values, { setSubmitting, resetForm }) => {
        console.log("Sesion iniciada")
        resetForm();
        setSubmitting(false);
    }
    return (
        <>
            <main className="formulario-cuenta">
                <aside className="formulario-cuenta__lateral">
                    <img src={LogoWorkHive} alt="" className="lateral__logo"/>
                    <p className="lateral__nombre">WORKHIVE</p>
                </aside>

                <section className="formulario-cuenta__principal">
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        onSubmit={onSubmit}
                    >
                        {
                            ({values, handleChange, handleBlur, handleSubmit, resetForm, isSubmitting, errors, touched}) => (
                                <form onSubmit={handleSubmit} className="principal__formulario">
                                    <h1 className="formulario__titulo">Inicia sesión</h1>


                                    <label htmlFor="email" className="formulario__label">
                                        Email:
                                        <input
                                            type="text"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="formulario__input"
                                        />
                                        {
                                            errors.email && touched.email && errors.email
                                        }
                                    </label>

                                    <label htmlFor="password" className="formulario__label">
                                        Contraseña:
                                        <input
                                            type="password"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="formulario__input"
                                        />
                                        {
                                            errors.password && touched.password && errors.password
                                        }
                                    </label>

                                    <button disabled={isSubmitting} type="submit" className="formulario__submit">Log in</button>
                                    <button className="formulario__cancel">Cancel</button>
                                </form>
                            )
                        }
                    </Formik>
                </section>
            </main>
        </>
    );
};

export default Login;