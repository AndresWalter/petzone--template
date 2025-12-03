// src/components/ConfirmationModal.jsx
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

// Componentes Estilizados
import {
    StyledModalOverlay,
    StyledModalContent,
    StyledModalHeader,
    StyledModalBody,
    StyledModalFooter,
    StyledButton
} from './styles/StyledComponents';

function ConfirmationModal({
    isOpen,
    title = '¿Estás seguro?',
    message,
    onConfirm,
    onCancel,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
}) {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onCancel();
        }
    };

    return (
        <StyledModalOverlay onClick={handleOverlayClick}>
            <StyledModalContent>
                <StyledModalHeader $variant="danger">
                    <FaExclamationTriangle size={24} color="#c0392b" />
                    <h3>{title}</h3>
                </StyledModalHeader>

                <StyledModalBody>
                    <p>{message}</p>
                </StyledModalBody>

                <StyledModalFooter>
                    <StyledButton
                        $variant="secondary"
                        onClick={onCancel}
                    >
                        {cancelText}
                    </StyledButton>
                    <StyledButton
                        $variant="danger"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </StyledButton>
                </StyledModalFooter>
            </StyledModalContent>
        </StyledModalOverlay>
    );
}

export default ConfirmationModal;
