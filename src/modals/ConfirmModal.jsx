import React from 'react';
import Modal from "./Modal.jsx";

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