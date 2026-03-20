import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ children, open }) => {
    const dialog = useRef();

    useEffect(() => {
        const dialogElement = dialog.current;

        if (!dialogElement) {
            return;
        }

        if (open && !dialogElement.open) {
            dialogElement.showModal();
        }

        if (!open && dialogElement.open) {
            dialogElement.close();
        }

        return () => {
            if (dialogElement.open) {
                dialogElement.close();
            }
        };
    }, [open]);

    return createPortal(
        <dialog className="modal" ref={dialog}>
            {children}
        </dialog>,
        document.getElementById('modal')
    );
};

export default Modal;