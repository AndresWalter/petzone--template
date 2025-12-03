// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Reviews from './Reviews'; // Importar Reseñas
import SubscriptionBanner from './SubscriptionBanner';

const HeroSection = styled.div`
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
  background-size: cover;
  background-position: center;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
`;

const CTAButton = styled(Link)`
  background: #f1c40f;
  color: #2c3e50;
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  text-decoration: none;
  border-radius: 50px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    background: #f39c12;
    color: #2c3e50;
  }
`;

function Home() {
  return (
    <>
      <HeroSection>
        <HeroContent>
          <Title>PetZone 🐶🐱</Title>
          <Subtitle>Tu tienda favorita para mascotas</Subtitle>
          <CTAButton to="/products">Ver Productos</CTAButton>
        </HeroContent>
      </HeroSection>

      {/* Sección de Reseñas */}
      <Reviews />

      {/* Banner de Suscripción */}
      <SubscriptionBanner />
    </>
  );
}

export default Home;