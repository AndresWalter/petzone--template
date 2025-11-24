// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
    const { cartCount } = useCart();
    const { user, logout, isAuthenticated } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo y marca */}
                <Link to="/" className="navbar-logo">
                    <span className="logo-icon">🐾</span>
                    <span className="logo-text">PetZone</span>
                </Link>

                {/* Enlaces de navegación */}
                <div className="navbar-links">
                    <Link to="/" className="nav-link">
                        <span className="nav-icon">🏠</span>
                        Inicio
                    </Link>
                    <Link to="/products" className="nav-link">
                        <span className="nav-icon">🛍️</span>
                        Productos
                    </Link>
                    <Link to="/cart" className="nav-link cart-link">
                        <span className="nav-icon">🛒</span>
                        Carrito
                        {cartCount > 0 && (
                            <span className="cart-badge">{cartCount}</span>
                        )}
                    </Link>
                </div>

                {/* Sección de usuario */}
                <div className="navbar-user">
                    {isAuthenticated ? (
                        <div className="user-section">
                            <span className="user-greeting">
                                <span className="user-icon">👋</span>
                                Hola, <strong>{user.name}</strong>
                            </span>
                            <button onClick={logout} className="btn-logout">
                                Cerrar Sesión
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn-login">
                            Iniciar Sesión
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
