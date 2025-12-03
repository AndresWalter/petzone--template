import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useFormValidation from '../hooks/useFormValidation';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { FaEye, FaEyeSlash, FaCheck, FaTimes } from 'react-icons/fa';

// Reutilizamos estilos o creamos nuevos con Styled Components 
const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
  background-color: #f5f7fa;
`;

const RegisterCard = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  width: 100%;
  max-width: 500px;
`;

const Title = styled.h2`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 700;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #34495e;
  font-weight: 500;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  padding-right: 2.5rem; /* Espacio para el icono del ojo */
  border: 1px solid ${props => props.$error ? '#e74c3c' : '#bdc3c7'};
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }
`;

const EyeIcon = styled.div`
  position: absolute;
  right: 10px;
  cursor: pointer;
  color: #7f8c8d;
  display: flex;
  align-items: center;
  
  &:hover {
    color: #34495e;
  }
`;

const ErrorText = styled.span`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  display: block;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(90deg, #3498db, #2980b9);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  opacity: ${props => props.disabled ? 0.7 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: #7f8c8d;

  a {
    color: #3498db;
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ValidationRules = styled.div`
  margin-top: 0.5rem;
  font-size: 0.85rem;
  background: #f8f9fa;
  padding: 0.8rem;
  border-radius: 8px;
`;

const RuleItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.3rem;
  color: ${props => props.$valid ? '#27ae60' : '#7f8c8d'};
  font-weight: ${props => props.$valid ? '600' : '400'};
  
  svg {
    color: ${props => props.$valid ? '#27ae60' : '#e74c3c'};
    font-size: 0.9rem;
  }
`;

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { values, errors, handleChange, validate } = useFormValidation({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Validaciones en tiempo real para UI
  const password = values.password || '';
  const hasMinLength = password.length >= 5;
  const hasNumber = /\d/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setIsSubmitting(true);
      try {
        const result = await register(values);

        if (result.success) {
          toast.success('¡Registro exitoso! Bienvenido a PetZone 🐾');
          navigate('/');
        } else {
          toast.error(result.error || 'Error al registrar usuario');
        }
      } catch (error) {
        toast.error('Ocurrió un error inesperado');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.error('Por favor corrige los errores en el formulario');
    }
  };

  return (
    <RegisterContainer>
      <RegisterCard>
        <Title>Crear Cuenta</Title>
        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <FormGroup>
            <Label htmlFor="name">Nombre Completo</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              $error={errors.name}
              placeholder="Ej: Juan Pérez"
            />
            {errors.name && <ErrorText>{errors.name}</ErrorText>}
          </FormGroup>

          {/* Usuario */}
          <FormGroup>
            <Label htmlFor="username">Nombre de Usuario</Label>
            <Input
              type="text"
              id="username"
              name="username"
              value={values.username}
              onChange={handleChange}
              $error={errors.username}
              placeholder="Ej: juanperez123"
            />
            {errors.username && <ErrorText>{errors.username}</ErrorText>}
          </FormGroup>

          {/* Email */}
          <FormGroup>
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              $error={errors.email}
              placeholder="ejemplo@correo.com"
            />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </FormGroup>

          {/* Contraseña */}
          <FormGroup>
            <Label htmlFor="password">Contraseña</Label>
            <InputWrapper>
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                $error={errors.password}
                placeholder="Crea tu contraseña"
              />
              <EyeIcon onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </EyeIcon>
            </InputWrapper>

            {/* Reglas de Validación en Tiempo Real */}
            <ValidationRules>
              <RuleItem $valid={hasMinLength}>
                {hasMinLength ? <FaCheck /> : <FaTimes />} Mínimo 5 caracteres
              </RuleItem>
              <RuleItem $valid={hasNumber}>
                {hasNumber ? <FaCheck /> : <FaTimes />} Al menos 1 número
              </RuleItem>
            </ValidationRules>

            {errors.password && <ErrorText>{errors.password}</ErrorText>}
          </FormGroup>

          {/* Confirmar Contraseña */}
          <FormGroup>
            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
            <InputWrapper>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                $error={errors.confirmPassword}
                placeholder="Repite tu contraseña"
              />
              <EyeIcon onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </EyeIcon>
            </InputWrapper>
            {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
          </FormGroup>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Registrando...' : 'Registrarse'}
          </Button>
        </form>

        <LoginLink>
          ¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link>
        </LoginLink>
      </RegisterCard>
    </RegisterContainer>
  );
}

export default RegisterPage;
