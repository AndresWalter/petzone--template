// src/components/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { toast } from 'react-toastify';

// Componentes Estilizados
import {
    StyledFormContainer,
    StyledFormGroup,
    StyledInput,
    StyledTextArea,
    StyledErrorMessage,
    StyledButton
} from './styles/StyledComponents';

function ProductForm({ currentProduct = null, onCancel, onSuccess }) {
    const { agregarProducto, editarProducto } = useProducts();

    // Estados del formulario
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
    });

    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (validationErrors[name]) {
            setValidationErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = 'El nombre es obligatorio';
        const price = parseFloat(formData.price);
        if (!formData.price || isNaN(price) || price <= 0) errors.price = 'El precio debe ser mayor a 0';
        if (!formData.description.trim()) errors.description = 'La descripción es obligatoria';
        else if (formData.description.trim().length < 10) errors.description = 'Mínimo 10 caracteres';
        if (!formData.image.trim()) errors.image = 'La URL de la imagen es obligatoria';
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            toast.warning('Por favor corrige los errores en el formulario');
            return;
        }

        setIsSubmitting(true);
        const productData = { ...formData, price: parseFloat(formData.price) };

        let result;
        if (currentProduct) {
            result = await editarProducto(currentProduct.id, productData);
        } else {
            result = await agregarProducto(productData);
        }

        setIsSubmitting(false);

        if (result.success) {
            setFormData({ name: '', price: '', description: '', image: '' });
            setValidationErrors({});
            if (onSuccess) onSuccess();
        } else {
            toast.error(`Error: ${result.error}`);
        }
    };

    return (
        <StyledFormContainer>
            <h3 className="mb-4 text-center text-primary fw-bold">
                {currentProduct ? '✏️ Editar Producto' : '➕ Nuevo Producto'}
            </h3>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    {/* Nombre */}
                    <div className="col-md-6">
                        <StyledFormGroup>
                            <label htmlFor="name">Nombre del Producto *</label>
                            <StyledInput
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={validationErrors.name ? 'error' : ''}
                                placeholder="Ej: Collar Premium"
                            />
                            {validationErrors.name && (
                                <StyledErrorMessage>{validationErrors.name}</StyledErrorMessage>
                            )}
                        </StyledFormGroup>
                    </div>

                    {/* Precio */}
                    <div className="col-md-6">
                        <StyledFormGroup>
                            <label htmlFor="price">Precio *</label>
                            <StyledInput
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className={validationErrors.price ? 'error' : ''}
                                placeholder="Ej: 25.99"
                                step="0.01"
                                min="0"
                            />
                            {validationErrors.price && (
                                <StyledErrorMessage>{validationErrors.price}</StyledErrorMessage>
                            )}
                        </StyledFormGroup>
                    </div>

                    {/* Imagen URL */}
                    <div className="col-12">
                        <StyledFormGroup>
                            <label htmlFor="image">URL de la Imagen *</label>
                            <StyledInput
                                type="text"
                                id="image"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className={validationErrors.image ? 'error' : ''}
                                placeholder="Ej: https://via.placeholder.com/300 (URL externa)"
                            />
                            {validationErrors.image && (
                                <StyledErrorMessage>{validationErrors.image}</StyledErrorMessage>
                            )}
                        </StyledFormGroup>
                    </div>

                    {/* Descripción */}
                    <div className="col-12">
                        <StyledFormGroup>
                            <label htmlFor="description">Descripción *</label>
                            <StyledTextArea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className={validationErrors.description ? 'error' : ''}
                                placeholder="Describe el producto (mínimo 10 caracteres)"
                                rows="3"
                            />
                            {validationErrors.description && (
                                <StyledErrorMessage>{validationErrors.description}</StyledErrorMessage>
                            )}
                        </StyledFormGroup>
                    </div>
                </div>

                {/* Botones */}
                <div className="d-flex justify-content-end gap-2 mt-3">
                    <StyledButton
                        type="button"
                        $variant="secondary"
                        onClick={onCancel}
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </StyledButton>
                    <StyledButton
                        type="submit"
                        $variant="primary"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Guardando...' : currentProduct ? 'Actualizar' : 'Crear'}
                    </StyledButton>
                </div>
            </form>
        </StyledFormContainer>
    );
}

export default ProductForm;
