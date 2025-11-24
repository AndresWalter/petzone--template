// src/components/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import './ProductForm.css';

/**
 * Componente de formulario para crear y editar productos
 * @param {object} currentProduct - Producto a editar (null para crear uno nuevo)
 * @param {function} onCancel - Callback para cancelar la operación
 * @param {function} onSuccess - Callback ejecutado después de guardar exitosamente
 */
function ProductForm({ currentProduct = null, onCancel, onSuccess }) {
    const { agregarProducto, editarProducto } = useProducts();

    // Estados del formulario
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
    });

    // Estados de validación (errores por campo)
    const [validationErrors, setValidationErrors] = useState({});

    // Estado de envío del formulario
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ============================================
    // EFECTO: Cargar datos del producto si estamos en modo edición
    // ============================================
    useEffect(() => {
        if (currentProduct) {
            setFormData({
                name: currentProduct.name || '',
                price: currentProduct.price || '',
                description: currentProduct.description || '',
                image: currentProduct.image || '',
            });
        }
    }, [currentProduct]);

    // ============================================
    // FUNCIÓN: Manejar cambios en los inputs
    // ============================================
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Actualizar el campo correspondiente
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Limpiar el error de validación de este campo
        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    // ============================================
    // FUNCIÓN: Validar el formulario antes de enviar
    // ============================================
    const validateForm = () => {
        const errors = {};

        // Validar nombre (obligatorio)
        if (!formData.name.trim()) {
            errors.name = 'El nombre es obligatorio';
        }

        // Validar precio (debe ser mayor a 0)
        const price = parseFloat(formData.price);
        if (!formData.price || isNaN(price) || price <= 0) {
            errors.price = 'El precio debe ser mayor a 0';
        }

        // Validar descripción (mínimo 10 caracteres)
        if (!formData.description.trim()) {
            errors.description = 'La descripción es obligatoria';
        } else if (formData.description.trim().length < 10) {
            errors.description = 'La descripción debe tener al menos 10 caracteres';
        }

        // Validar URL de imagen (opcional pero si existe debe tener formato válido)
        if (!formData.image.trim()) {
            errors.image = 'La URL de la imagen es obligatoria';
        }

        return errors;
    };

    // ============================================
    // FUNCIÓN: Manejar el envío del formulario
    // ============================================
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar antes de enviar
        const errors = validateForm();

        // Si hay errores, mostrarlos y no enviar
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        setIsSubmitting(true);

        // Preparar datos para enviar (convertir precio a número)
        const productData = {
            ...formData,
            price: parseFloat(formData.price),
        };

        let result;

        // Decidir si estamos creando o editando
        if (currentProduct) {
            // Modo edición (PUT)
            result = await editarProducto(currentProduct.id, productData);
        } else {
            // Modo creación (POST)
            result = await agregarProducto(productData);
        }

        setIsSubmitting(false);

        // Si fue exitoso
        if (result.success) {
            // Limpiar el formulario
            setFormData({
                name: '',
                price: '',
                description: '',
                image: '',
            });
            setValidationErrors({});

            // Llamar al callback de éxito
            if (onSuccess) {
                onSuccess();
            }
        } else {
            // Mostrar error general si falló la API
            alert(`Error: ${result.error}`);
        }
    };

    // ============================================
    // FUNCIÓN: Manejar cancelación
    // ============================================
    const handleCancel = () => {
        // Limpiar formulario
        setFormData({
            name: '',
            price: '',
            description: '',
            image: '',
        });
        setValidationErrors({});

        // Llamar al callback de cancelación
        if (onCancel) {
            onCancel();
        }
    };

    return (
        <div className="product-form-container">
            <h3 className="form-title">
                {currentProduct ? '✏️ Editar Producto' : '➕ Nuevo Producto'}
            </h3>

            <form onSubmit={handleSubmit} className="product-form">
                {/* Campo: Nombre */}
                <div className="form-group">
                    <label htmlFor="name">Nombre del Producto *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={validationErrors.name ? 'input-error' : ''}
                        placeholder="Ej: Collar Premium"
                    />
                    {validationErrors.name && (
                        <span className="error-message">{validationErrors.name}</span>
                    )}
                </div>

                {/* Campo: Precio */}
                <div className="form-group">
                    <label htmlFor="price">Precio *</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className={validationErrors.price ? 'input-error' : ''}
                        placeholder="Ej: 25.99"
                        step="0.01"
                        min="0"
                    />
                    {validationErrors.price && (
                        <span className="error-message">{validationErrors.price}</span>
                    )}
                </div>

                {/* Campo: Descripción */}
                <div className="form-group">
                    <label htmlFor="description">Descripción *</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className={validationErrors.description ? 'input-error' : ''}
                        placeholder="Describe el producto (mínimo 10 caracteres)"
                        rows="4"
                    />
                    {validationErrors.description && (
                        <span className="error-message">{validationErrors.description}</span>
                    )}
                </div>

                {/* Campo: URL de Imagen */}
                <div className="form-group">
                    <label htmlFor="image">URL de la Imagen *</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className={validationErrors.image ? 'input-error' : ''}
                        placeholder="https://ejemplo.com/imagen.jpg"
                    />
                    {validationErrors.image && (
                        <span className="error-message">{validationErrors.image}</span>
                    )}
                </div>

                {/* Botones de acción */}
                <div className="form-actions">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="btn-cancel"
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="btn-submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Guardando...' : currentProduct ? 'Actualizar' : 'Crear'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProductForm;
