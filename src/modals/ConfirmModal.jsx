import React from 'react';
import Modal from "./Modal.jsx";

/**
 * ConfirmModal - Componente para mostrar un modal de confirmación.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.isOpen - Indica si el modal está abierto o cerrado.
 * @param {Function} props.onClose - Función que se ejecuta para cerrar el modal.
 * @param {Function} props.onConfirm - Función que se ejecuta cuando el usuario confirma la acción.
 * @param {string} props.message - Mensaje que se muestra en el modal para pedir confirmación.
 * @returns {React.ReactElement|null} El componente del modal de confirmación o `null` si no está abierto.
 */
const ConfirmModal = ({isOpen, onClose, onConfirm, message}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <p>{message}</p>

            <button onClick={onClose}>Cancelar</button>
            <button onClick={onConfirm}>Confirmar</button>
        </Modal>
    );
};

export default ConfirmModal;