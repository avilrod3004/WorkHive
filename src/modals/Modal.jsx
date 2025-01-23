import React from 'react';

/**
 * Modal - Componente base para representar un modal.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.isOpen - Indica si el modal está abierto o cerrado.
 * @param {Function} props.onClose - Función que se ejecuta al cerrar el modal (por ejemplo, al hacer clic en el fondo).
 * @param {React.ReactNode} props.children - Contenido que se muestra dentro del modal.
 * @returns {React.ReactElement|null} El componente modal o `null` si no está abierto.
 */
const Modal = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal__contenido">
                {children}
            </div>
        </div>
    );
};

export default Modal;