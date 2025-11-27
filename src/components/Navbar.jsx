// src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FaPaw, FaHome, FaShoppingBag, FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';

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

  &:hover {
    transform: scale(1.05);
    color: #ecf0f1;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none; /* Ocultar en móvil por simplicidad en este paso */
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

    return (
        <NavContainer>
            <NavContent>
                {/* Logo */}
                <LogoLink to="/">
                    <FaPaw /> PetZone
                </LogoLink>

                {/* Enlaces Centrales */}
                <NavLinks>
                    <NavLinkItem to="/" $active={location.pathname === '/'}>
                        <FaHome /> Inicio
                    </NavLinkItem>
                    <NavLinkItem to="/products" $active={location.pathname === '/products'}>
                        <FaShoppingBag /> Productos
                    </NavLinkItem>
                    <NavLinkItem to="/cart" $active={location.pathname === '/cart'}>
                        <FaShoppingCart /> Carrito
                        {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
                    </NavLinkItem>
                </NavLinks>

                {/* Sección de Usuario (Derecha) */}
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
