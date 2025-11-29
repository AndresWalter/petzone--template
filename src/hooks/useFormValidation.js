import { useState } from 'react';

const useFormValidation = (initialState) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});

    // Regex para contraseña simplificada: 
    // Mínimo 5 caracteres y al menos 1 número
    const passwordRegex = /^(?=.*\d).{5,}$/;

    // Regex para email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });

        // Limpiar error al escribir
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        // Validación de Email
        if (!values.email) {
            tempErrors.email = "El email es obligatorio";
            isValid = false;
        } else if (!emailRegex.test(values.email)) {
            tempErrors.email = "Formato de email inválido";
            isValid = false;
        }

        // Validación de Password
        if (!values.password) {
            tempErrors.password = "La contraseña es obligatoria";
            isValid = false;
        } else if (!passwordRegex.test(values.password)) {
            tempErrors.password = "La contraseña debe tener mín. 5 caracteres y 1 número";
            isValid = false;
        }

        // Validación de Confirmar Password
        if (values.confirmPassword !== undefined) {
            if (!values.confirmPassword) {
                tempErrors.confirmPassword = "Debes confirmar tu contraseña";
                isValid = false;
            } else if (values.password !== values.confirmPassword) {
                tempErrors.confirmPassword = "Las contraseñas no coinciden";
                isValid = false;
            }
        }

        // Validación de Nombre (Opcional, pero común en registro)
        if (values.name !== undefined && !values.name.trim()) {
            tempErrors.name = "El nombre es obligatorio";
            isValid = false;
        }

        // Validación de Usuario
        if (values.username !== undefined) {
            if (!values.username.trim()) {
                tempErrors.username = "El usuario es obligatorio";
                isValid = false;
            } else if (values.username.length < 3) {
                tempErrors.username = "El usuario debe tener al menos 3 caracteres";
                isValid = false;
            }
        }

        setErrors(tempErrors);
        return isValid;
    };

    return {
        values,
        errors,
        handleChange,
        validate,
        setValues,
        passwordRegex
    };
};

export default useFormValidation;
