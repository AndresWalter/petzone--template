// src/components/LoginPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function LoginPage({ onLogin }) {
return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
    <h2>Iniciar Sesión</h2>
    <p>Simulando inicio de sesión...</p>
    <button 
        onClick={onLogin}
        style={{
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
        }}
    >
        Iniciar Sesión como Usuario
    </button>

    <div style={{ marginTop: '20px' }}>
        <Link to="/" style={{
        textDecoration: 'none',
        color: '#666'
        }}>
        ← Volver al inicio
        </Link>
    </div>
    </div>
);
}

export default LoginPage;