import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

// ==========================================
// COMPONENTES ESTILIZADOS
// ==========================================

const BannerWrapper = styled.div`
  background-color: #3498db; /* Color Primario de la marca */
  padding: 3rem 0;
  margin-top: 2rem;
  color: white;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 20px;
`;

const BannerContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    margin-bottom: 0;
    text-align: left;
  }
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.3;
  margin: 0;
`;

const Highlight = styled.span`
  color: #f1c40f; /* Amarillo/Dorado para resaltar */
  font-weight: 800;
  font-size: 2rem;
`;

const FormColumn = styled.div`
  display: flex;
  align-items: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem; /* Reducir gap */
  width: 100%;
  align-items: center;

  @media (min-width: 1200px) { /* Aumentar breakpoint para nowrap */
    flex-wrap: nowrap;
  }
`;

const InputGroup = styled.div`
  flex: 1;
  min-width: 150px; /* Reducir ancho mínimo */
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 50px;
  font-size: 0.95rem;
  outline: none;
  transition: box-shadow 0.2s;

  &:focus {
    box-shadow: 0 0 0 3px rgba(241, 196, 15, 0.5);
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 50px;
  font-size: 0.95rem;
  outline: none;
  background-color: white;
  cursor: pointer;
  color: #7f8c8d;

  &:focus {
    box-shadow: 0 0 0 3px rgba(241, 196, 15, 0.5);
  }
`;

const SubmitButton = styled.button`
  background-color: #f1c40f;
  color: #2c3e50;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  width: 100%;

  @media (min-width: 768px) {
    width: auto;
  }

  &:hover {
    background-color: #f39c12;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

function SubscriptionBanner() {
  const [formData, setFormData] = useState({
    petName: '',
    email: '',
    petType: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple
    if (!formData.petName || !formData.email || !formData.petType) {
      toast.warning('Por favor completa todos los campos');
      return;
    }

    // Simulación de envío
    console.log('Datos de suscripción:', formData);
    toast.success('¡Gracias! Tu cupón ha sido enviado 🎟️');

    // Limpiar formulario
    setFormData({
      petName: '',
      email: '',
      petType: ''
    });
  };

  return (
    <BannerWrapper>
      <BannerContainer>
        <div className="row align-items-center">
          {/* Columna Izquierda: Texto */}
          <div className="col-12 col-md-5">
            <TextColumn>
              <Title>
                ¡Completá tus datos y recibí tu cupón de <Highlight>15% OFF</Highlight> en tu primera compra!
              </Title>
            </TextColumn>
          </div>

          {/* Columna Derecha: Formulario */}
          <div className="col-12 col-md-7">
            <FormColumn>
              <StyledForm onSubmit={handleSubmit}>
                <InputGroup>
                  <StyledInput
                    type="text"
                    name="petName"
                    placeholder="Nombre mascota"
                    value={formData.petName}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>

                <InputGroup>
                  <StyledInput
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>

                <InputGroup>
                  <StyledSelect
                    name="petType"
                    value={formData.petType}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Tu mascota</option>
                    <option value="perro">Perro</option>
                    <option value="gato">Gato</option>
                    <option value="otro">Otro</option>
                  </StyledSelect>
                </InputGroup>

                <SubmitButton type="submit">
                  Registrate
                </SubmitButton>
              </StyledForm>
            </FormColumn>
          </div>
        </div>
      </BannerContainer>
    </BannerWrapper>
  );
}

export default SubscriptionBanner;
