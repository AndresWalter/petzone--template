// src/components/FormModal.jsx
import React from 'react';
import ProductForm from './ProductForm';
import { StyledModalOverlay, StyledModalContent } from './styles/StyledComponents';

function FormModal({ isOpen, onClose, currentProduct, onSuccess }) {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <StyledModalOverlay onClick={handleOverlayClick}>
            <StyledModalContent style={{ maxWidth: '700px', width: '95%' }}>
                {/* 
                   Renderizamos el ProductForm directamente.
                   El ProductForm ya tiene su propio contenedor y estilos, 
                   así que se adaptará dentro del contenido del modal.
                */}
                <div style={{ padding: '1rem' }}>
                    <ProductForm
                        currentProduct={currentProduct}
                        onCancel={onClose}
                        onSuccess={onSuccess}
                    />
                </div>
            </StyledModalContent>
        </StyledModalOverlay>
    );
}

export default FormModal;
