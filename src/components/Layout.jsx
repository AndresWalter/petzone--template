// src/components/Layout.jsx
import React from 'react';

function Layout({ children }) {
return (
    <div style={{
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh'
    }}>
      {/* Encabezado */}
    <header style={{
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '20px',
        textAlign: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
        <h1>PetZone 🐶🐱</h1>
        <p>Tu tienda favorita para mascotas</p>
    </header>

      {/* Contenido principal */}
    <main style={{
        marginTop: '20px',
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap'
    }}>
        {children}
    </main>

      {/* Pie de página */}
    <footer style={{
        marginTop: '30px',
        textAlign: 'center',
        color: '#666',
        padding: '15px',
        borderTop: '1px solid #ddd'
    }}>
        © 2025 PetZone - Todos los derechos reservados
    </footer>
    </div>
);
}

export default Layout;