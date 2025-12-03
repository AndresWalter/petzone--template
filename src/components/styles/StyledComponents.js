// src/components/styles/StyledComponents.js
import styled from 'styled-components';

// ==========================================
// CONTENEDORES
// ==========================================

export const StyledPageContainer = styled.div`
  padding: 2rem 0;
  min-height: 80vh;
  background-color: #f8f9fa;

  @media (max-width: 768px) {
    padding: 1rem 0; /* Menos padding vertical en móviles */
  }
`;

export const StyledHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;

  h2 {
    color: #2c3e50;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  p {
    color: #7f8c8d;
    font-size: 1.1rem;
  }
`;

// ==========================================
// TARJETAS (CARDS)
// ==========================================

export const StyledCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  width: 100%; /* Asegura que ocupe todo el ancho de la columna */
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

export const StyledCardImage = styled.div`
  width: 100%;
  height: 220px; /* Altura base */
  overflow: hidden;
  position: relative;
  background-color: #f0f0f0; /* Placeholder color */

  @media (max-width: 576px) {
    height: 180px; /* Altura ajustada para móviles */
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Mantiene la proporción y cubre el área */
    object-position: center;
    transition: transform 0.5s ease;
  }

  ${StyledCard}:hover & img {
    transform: scale(1.05);
  }
`;

export const StyledCardBody = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const StyledProductTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #34495e;
  margin-bottom: 0.5rem;
`;

export const StyledProductPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: #27ae60;
  margin-bottom: 1rem;
`;

// ==========================================
// BOTONES
// ==========================================

export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  font-size: 0.95rem;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:active {
    transform: scale(0.98);
  }

  /* Variantes */
  ${props => props.$variant === 'primary' && `
    background: linear-gradient(135deg, #3498db, #2980b9);
    color: white;
    &:hover { background: linear-gradient(135deg, #2980b9, #21618c); }
  `}

  ${props => props.$variant === 'success' && `
    background: linear-gradient(135deg, #2ecc71, #27ae60);
    color: white;
    &:hover { background: linear-gradient(135deg, #27ae60, #219150); }
  `}

  ${props => props.$variant === 'danger' && `
    background: linear-gradient(135deg, #e74c3c, #c0392b);
    color: white;
    &:hover { background: linear-gradient(135deg, #c0392b, #a93226); }
  `}

  ${props => props.$variant === 'warning' && `
    background: linear-gradient(135deg, #f1c40f, #f39c12);
    color: #2c3e50;
    &:hover { background: linear-gradient(135deg, #f39c12, #d35400); }
  `}

  ${props => props.$variant === 'secondary' && `
    background: #ecf0f1;
    color: #7f8c8d;
    &:hover { background: #bdc3c7; color: #2c3e50; }
  `}

  ${props => props.$fullWidth && `
    width: 100%;
  `}
`;

export const StyledIconButton = styled(StyledButton)`
  padding: 0.5rem;
  border-radius: 6px;
`;

// ==========================================
// FORMULARIOS
// ==========================================

export const StyledFormContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
  border: 1px solid #eee;
`;

export const StyledFormGroup = styled.div`
  margin-bottom: 1.2rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #34495e;
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }

  &.error {
    border-color: #e74c3c;
  }
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }

  &.error {
    border-color: #e74c3c;
  }
`;

export const StyledErrorMessage = styled.span`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 0.4rem;
  display: block;
  font-weight: 500;
`;

// ==========================================
// MODALES
// ==========================================

export const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const StyledModalContent = styled.div`
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

export const StyledModalHeader = styled.div`
  padding: 1.5rem;
  background: ${props => props.$variant === 'danger' ? '#fff5f5' : '#f8f9fa'};
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  gap: 1rem;

  h3 {
    margin: 0;
    font-size: 1.25rem;
    color: ${props => props.$variant === 'danger' ? '#c0392b' : '#2c3e50'};
  }
`;

export const StyledModalBody = styled.div`
  padding: 2rem 1.5rem;
  color: #555;
  font-size: 1.05rem;
  line-height: 1.6;
`;

export const StyledModalFooter = styled.div`
  padding: 1rem 1.5rem;
  background: #f8f9fa;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;
