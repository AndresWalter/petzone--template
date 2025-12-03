// src/components/Reviews.jsx
import React from 'react';
import styled from 'styled-components';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const ReviewsContainer = styled.section`
  padding: 4rem 0;
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 3rem;
  font-weight: 700;
  
  span {
    color: #3498db;
  }
`;

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 0 1rem;
`;

const ReviewCard = styled.div`
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
  }
`;

const QuoteIcon = styled(FaQuoteLeft)`
  color: #e1e8ed;
  font-size: 3rem;
  position: absolute;
  top: 1rem;
  right: 1.5rem;
`;

const ReviewText = styled.p`
  color: #555;
  font-style: italic;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-weight: 700;
  color: #2c3e50;
`;

const Stars = styled.div`
  color: #f1c40f;
  display: flex;
  gap: 2px;
  font-size: 0.9rem;
`;

const reviewsData = [
  {
    id: 1,
    name: "María González",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "¡Me encanta PetZone! Encontré la cama perfecta para mi Golden Retriever. La calidad es excelente y el envío fue súper rápido.",
    rating: 5
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "La variedad de juguetes es increíble. Mi gato nunca había estado tan entretenido. Definitivamente volveré a comprar.",
    rating: 5
  },
  {
    id: 3,
    name: "Ana Martínez",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "Excelente atención al cliente y productos de primera. El alimento premium que compré aquí mejoró mucho el pelaje de mi perro.",
    rating: 4
  }
];

function Reviews() {
  return (
    <ReviewsContainer>
      <div className="container">
        <SectionTitle>Lo que dicen nuestros <span>Clientes</span></SectionTitle>
        <ReviewsGrid>
          {reviewsData.map(review => (
            <ReviewCard key={review.id}>
              <QuoteIcon />
              <ReviewText>"{review.text}"</ReviewText>
              <UserInfo>
                <Avatar src={review.image} alt={review.name} />
                <UserDetails>
                  <UserName>{review.name}</UserName>
                  <Stars>
                    {[...Array(review.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </Stars>
                </UserDetails>
              </UserInfo>
            </ReviewCard>
          ))}
        </ReviewsGrid>
      </div>
    </ReviewsContainer>
  );
}

export default Reviews;
