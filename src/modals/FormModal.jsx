import React from 'react';
import Modal from "./Modal.jsx";
import {Formik} from "formik";

const FormModal = ({isOpen, onClose, initialValues, validationSchema, onSubmit, children}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
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