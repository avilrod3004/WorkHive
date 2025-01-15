import React from 'react';

const Modal = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;

    return (
        <div>
            <div>
                {children}
            </div>
            <div className="modal-backdrop" onClick={onClose}></div>
        </div>
    );
};

export default Modal;