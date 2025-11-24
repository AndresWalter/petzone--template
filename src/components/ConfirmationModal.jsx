// src/components/ConfirmationModal.jsx
import React from 'react';
import './ConfirmationModal.css';

/**
 * Modal de confirmación reutilizable
 * @param {boolean} isOpen - Controla si el modal está visible
 * @param {string} title - Título del modal
 * @param {string} message - Mensaje de confirmación
 * @param {function} onConfirm - Callback ejecutado al confirmar
 * @param {function} onCancel - Callback ejecutado al cancelar
 * @param {string} confirmText - Texto del botón de confirmación (por defecto "Confirmar")
 * @param {string} cancelText - Texto del botón de cancelar (por defecto "Cancelar")
 */
function ConfirmationModal({
    isOpen,
    title = '¿Estás seguro?',
    message,
    onConfirm,
    onCancel,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
}) {
    // Si el modal no está abierto, no renderizar nada
    if (!isOpen) return null;

    // ============================================
    // FUNCIÓN: Cerrar modal al hacer clic en el overlay
    // ============================================
    const handleOverlayClick = (e) => {
        // Solo cerrar si se hace clic directamente en el overlay, no en el contenido
        if (e.target.className === 'modal-overlay') {
            onCancel();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                {/* Encabezado del modal */}
                <div className="modal-header">
                    <h3>{title}</h3>
                </div>

                {/* Cuerpo del modal */}
                <div className="modal-body">
                    <p>{message}</p>
                </div>

                {/* Acciones del modal */}
                <div className="modal-actions">
                    <button
                        onClick={onCancel}
                        className="modal-btn modal-btn-cancel"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="modal-btn modal-btn-confirm"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;
