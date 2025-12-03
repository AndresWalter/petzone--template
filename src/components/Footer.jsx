import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTiktok, FaPaw, FaCreditCard, FaCcVisa, FaCcMastercard, FaMoneyBillWave, FaTruck, FaEnvelope, FaStore } from 'react-icons/fa';

// ==========================================
// COMPONENTES ESTILIZADOS
// ==========================================

const FooterContainer = styled.footer`
  background-color: #2c3e50; /* Color secundario/oscuro del tema */
  color: #ecf0f1;
  padding-top: 4rem;
  margin-top: auto; /* Para que se empuje al fondo si usamos flex column en el layout */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const FooterContent = styled.div`
  padding-bottom: 3rem;
`;

const BrandSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const BrandLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.8rem;
  font-weight: 800;
  color: #3498db; /* Color primario del tema */
  
  svg {
    font-size: 2rem;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.95rem;
  color: #bdc3c7;
  
  svg {
    color: #f1c40f; /* Acento amarillo */
  }

  a {
    color: #bdc3c7;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: white;
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: white;
    transition: all 0.3s ease;
    font-size: 1.2rem;

    &:hover {
      background-color: #3498db;
      transform: translateY(-3px);
    }
  }
`;

const FooterTitle = styled.h4`
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.8rem;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 30px;
    height: 3px;
    background-color: #3498db;
    border-radius: 2px;
  }
`;

const FooterLinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const FooterLink = styled(Link)`
  color: #bdc3c7;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  display: inline-block;

  &:hover {
    color: #3498db;
    transform: translateX(5px);
  }
`;

const PaymentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 1rem;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    padding: 0.5rem;
    border-radius: 6px;
    color: #2c3e50;
    font-size: 1.5rem;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

const BottomBar = styled.div`
  background-color: #1a252f; /* Un tono más oscuro para la barra inferior */
  padding: 1.5rem 0;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const CopyrightText = styled.p`
  color: #7f8c8d;
  font-size: 0.9rem;
  margin: 0;
`;

const DevLogos = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  span {
    color: #7f8c8d;
    font-size: 0.85rem;
  }
  
  div {
    background: #34495e;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: bold;
    color: white;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent className="container">
        <div className="row gy-4">
          {/* Columna 1: Marca y Contacto */}
          <div className="col-12 col-md-3">
            <BrandSection>
              <BrandLogo>
                <FaPaw /> PetZone
              </BrandLogo>
              <p style={{ color: '#95a5a6', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Tu tienda de confianza para el cuidado y felicidad de tus mascotas. Calidad y amor en cada producto.
              </p>

              <ContactItem>
                <FaStore />
                <Link to="/sucursales">Nuestras Sucursales</Link>
              </ContactItem>

              <ContactItem>
                <FaEnvelope />
                <a href="mailto:contacto@petzone.com">contacto@petzone.com</a>
              </ContactItem>

              <SocialIcons>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><FaTiktok /></a>
              </SocialIcons>
            </BrandSection>
          </div>

          {/* Columna 2: Sobre Nosotros */}
          <div className="col-12 col-md-3">
            <FooterTitle>Sobre Nosotros</FooterTitle>
            <FooterLinkList>
              <li><FooterLink to="/about">Quiénes somos</FooterLink></li>
              <li><FooterLink to="/proveedores">Proveedores</FooterLink></li>
              <li><FooterLink to="/terms">Términos y Condiciones</FooterLink></li>
              <li><FooterLink to="/payment-methods">Métodos de Pago</FooterLink></li>
              <li><FooterLink to="/returns">Solicitud de Devolución</FooterLink></li>
              <li><FooterLink to="/benefits">Beneficios</FooterLink></li>
              <li><FooterLink to="/shipping">Método de Envío</FooterLink></li>
            </FooterLinkList>
          </div>

          {/* Columna 3: Tu Mascota */}
          <div className="col-12 col-md-3">
            <FooterTitle>Tu Mascota</FooterTitle>
            <FooterLinkList>
              <li><FooterLink to="/products?category=perros">Perros</FooterLink></li>
              <li><FooterLink to="/products?category=gatos">Gatos</FooterLink></li>
              <li><FooterLink to="/products?category=otros">Otros Animales</FooterLink></li>
              <li><FooterLink to="/products?category=accesorios">Accesorios</FooterLink></li>
              <li><FooterLink to="/products?category=salud">Salud e Higiene</FooterLink></li>
            </FooterLinkList>
          </div>

          {/* Columna 4: Medios de Pago */}
          <div className="col-12 col-md-3">
            <FooterTitle>Medios de Pago</FooterTitle>
            <p style={{ color: '#bdc3c7', fontSize: '0.9rem' }}>Aceptamos todas las tarjetas y pagos digitales.</p>
            <PaymentGrid>
              <div title="Visa"><FaCcVisa color="#1a1f71" /></div>
              <div title="Mastercard"><FaCcMastercard color="#eb001b" /></div>
              <div title="American Express"><FaCreditCard color="#2e77bc" /></div>
              <div title="Efectivo"><FaMoneyBillWave color="#27ae60" /></div>
              <div title="MercadoPago"><FaCreditCard color="#009ee3" /></div>
              <div title="Envío"><FaTruck color="#e67e22" /></div>
            </PaymentGrid>
          </div>
        </div>
      </FooterContent>

      {/* Barra Inferior */}
      <BottomBar>
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <CopyrightText>
              &copy; {new Date().getFullYear()} PetZone. Todos los derechos reservados.
            </CopyrightText>

            <DevLogos>
              <span>Desarrollado por:</span>
              <div>Andres Walter</div>

            </DevLogos>
          </div>
        </div>
      </BottomBar>
    </FooterContainer>
  );
}

export default Footer;
