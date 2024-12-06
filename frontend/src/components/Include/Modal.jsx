import React from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ children, label, width = 'max-w-142.5', isItemCenter = true }) => {
    return (
        createPortal(
            <div className={`overflow-y-auto h-full min-h-screen absolute left-0 top-0 z-999999 w-full flex  ${isItemCenter ? 'item-center' : ''} justify-center bg-black/90 px-4 py-5`}>
                {children}
            </div>,
            document.body
        )

    );
}

export default Modal;
