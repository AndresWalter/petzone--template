// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

function Home() {
    const { user, isAuthenticated } = useAuth();

    return (
        <div className="home-container">
            <div className="hero-section fade-in">
                <div className="hero-content">
                    <span className="hero-icon">🐾</span>
                    <h1>Bienvenido a PetZone</h1>
                    {isAuthenticated && (
                        <p className="welcome-message">
                            ¡Hola <strong>{user.name}</strong>! 👋
                        </p>
                    )}
                    <p className="hero-subtitle">
                        Tu tienda favorita para mascotas, con los mejores productos para tu compañero.
                    </p>

                    <div className="hero-actions">
                        <Link to="/products" className="btn-primary">
                            <span className="btn-icon">🛍️</span>
                            Explorar Productos
                        </Link>
                        {!isAuthenticated && (
                            <Link to="/login" className="btn-secondary">
                                <span className="btn-icon">🔐</span>
                                Iniciar Sesión
                            </Link>
                        )}
                    </div>
                </div>

                <div className="hero-features">
                    <div className="feature-card">
                        <span className="feature-icon">🚚</span>
                        <h3>Envío Gratis</h3>
                        <p>En todos tus pedidos</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">⭐</span>
                        <h3>Calidad Premium</h3>
                        <p>Los mejores productos</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">💳</span>
                        <h3>Pago Seguro</h3>
                        <p>Protección garantizada</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;