import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FaPaw, FaHome, FaShoppingBag, FaShoppingCart, FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

// ==========================================
// STYLED COMPONENTS (NAVBAR)
// ==========================================

const NavContainer = styled.nav`
  background: linear-gradient(90deg, #2c3e50 0%, #3498db 100%);
  padding: 0.8rem 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: white;
  font-size: 1.5rem;
  font-weight: 800;
  transition: transform 0.3s ease;
  z-index: 1001; /* Ensure logo is above mobile menu */

  &:hover {
    transform: scale(1.05);
    color: #ecf0f1;
  }
`;

const MobileIcon = styled.div`
  display: none;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
  z-index: 1001;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 70%;
    background: #2c3e50;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(100%)')};
    transition: transform 0.3s ease-in-out;
    box-shadow: -2px 0 10px rgba(0,0,0,0.2);
  }
`;

const NavLinkItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;

  /* Efecto de fondo al hacer hover */
  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    color: white;
    transform: translateY(-2px);
  }

  /* Indicador de activo */
  ${props => props.$active && `
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    font-weight: 700;
  `}

  @media (max-width: 768px) {
    font-size: 1.2rem;
    width: 80%;
    justify-content: center;
  }
`;

const CartBadge = styled.span`
  background-color: #e74c3c;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.1rem 0.4rem;
  border-radius: 10px;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(25%, -25%);
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
     /* Move UserSection inside NavLinks for mobile or keep separate? 
        For simplicity, let's keep it visible but maybe adjust spacing.
        Actually, let's put it inside the mobile menu for cleaner look on mobile.
     */
     display: none; 
  }
`;

// Mobile User Section inside menu
const MobileUserSection = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 80%;
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 1.5rem;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const UserGreeting = styled.div`
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;

  strong {
    color: #f1c40f;
  }
`;

const LogoutButton = styled.button`
  background: rgba(0, 0, 0, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.4rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: #c0392b;
    border-color: #c0392b;
  }
`;

const LoginButton = styled(Link)`
  background: #f1c40f;
  color: #2c3e50;
  text-decoration: none;
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  font-weight: 700;
  transition: all 0.2s ease;

  &:hover {
    background: #f39c12;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
`;

function Navbar() {
  const { cartCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <NavContainer>
      <NavContent>
        {/* Logo */}
        <LogoLink to="/" onClick={closeMenu}>
          <FaPaw /> PetZone
        </LogoLink>

        {/* Mobile Icon */}
        <MobileIcon onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </MobileIcon>

        {/* Enlaces Centrales */}
        <NavLinks $isOpen={isOpen}>
          <NavLinkItem to="/" $active={location.pathname === '/'} onClick={closeMenu}>
            <FaHome /> Inicio
          </NavLinkItem>
          <NavLinkItem to="/products" $active={location.pathname === '/products'} onClick={closeMenu}>
            <FaShoppingBag /> Productos
          </NavLinkItem>
          <NavLinkItem to="/cart" $active={location.pathname === '/cart'} onClick={closeMenu}>
            <FaShoppingCart /> Carrito
            {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
          </NavLinkItem>

          {/* Mobile User Section */}
          <MobileUserSection>
            {isAuthenticated ? (
              <>
                <UserGreeting>
                  <FaUser /> Hola, <strong>{user.name}</strong>
                </UserGreeting>
                <LogoutButton onClick={() => { logout(); closeMenu(); }}>
                  <FaSignOutAlt /> Salir
                </LogoutButton>
              </>
            ) : (
              <LoginButton to="/login" onClick={closeMenu}>
                Iniciar Sesión
              </LoginButton>
            )}
          </MobileUserSection>
        </NavLinks>

        {/* Sección de Usuario (Desktop) */}
        <UserSection>
          {isAuthenticated ? (
            <>
              <UserGreeting>
                <FaUser /> Hola, <strong>{user.name}</strong>
              </UserGreeting>
              <LogoutButton onClick={logout}>
                <FaSignOutAlt /> Salir
              </LogoutButton>
            </>
          ) : (
            <LoginButton to="/login">
              Iniciar Sesión
            </LoginButton>
          )}
        </UserSection>
      </NavContent>
    </NavContainer>
  );
}

export default Navbar;
