import React from 'react';
import Modal from "./Modal.jsx";
import {Formik} from "formik";

/**
 * FormModal - Componente para mostrar un modal con un formulario gestionado por Formik.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.isOpen - Indica si el modal está abierto o cerrado.
 * @param {Function} props.onClose - Función que se ejecuta para cerrar el modal.
 * @param {Object} props.initialValues - Valores iniciales del formulario.
 * @param {Object} props.validationSchema - Esquema de validación de Yup para los datos del formulario.
 * @param {Function} props.onSubmit - Función que se ejecuta al enviar el formulario con los datos.
 * @param {Function} props.children - Función render prop para personalizar el contenido del formulario. Recibe un objeto con las propiedades de Formik (`values`, `handleChange`, `handleBlur`, `errors`, `touched`).
 * @returns {React.ReactElement|null} El componente del modal con el formulario o `null` si no está abierto.
 */
const FormModal = ({isOpen, onClose, initialValues, validationSchema, onSubmit, children}) => {
    return (
        <Modal isOpen={isOpen}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {
                    ({values, handleChange, handleBlur, handleSubmit, resetForm, isSubmitting, errors, touched}) => (
                        <form onSubmit={handleSubmit}>

                            {children({values, handleChange, handleBlur, errors, touched})}

                            <button disabled={isSubmitting} type="submit">Confirmar</button>
                            <button onClick={onClose}>Cancelar</button>
                        </form>
                    )
                }
            </Formik>
        </Modal>
    );
};

export default FormModal;