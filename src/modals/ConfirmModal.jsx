/**
 * @module Layouts
 * @category Structure
 */
import React from 'react';
import Modal from "./Modal.jsx";
import Bee from "../assets/bee.png"

/**
 * @layouts
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
        <Modal isOpen={isOpen}>

            <img src={Bee} alt="" className="modal__abeja"/>

            <p className="modal-confirmacion__pregunta">{message}</p>

            <div className="modal__botones">
                <button onClick={onClose} className="botones-modal__cancelar">Cancelar</button>
                <button onClick={onConfirm} className="botones-modal__confirmar">Confirmar</button>
            </div>
        </Modal>
    );
};

export default ConfirmModal;