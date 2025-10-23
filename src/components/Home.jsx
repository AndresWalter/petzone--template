// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
    <h1>Bienvenido a PetZone 🐶🐱</h1>
    <p>Tu tienda favorita para mascotas, con los mejores productos para tu amigo peludo.</p>
    <div style={{ marginTop: '30px' }}>
        <Link to="/products" style={{
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        fontWeight: 'bold'
        }}>
        Ver Productos
        </Link>
    </div>
    </div>
);
}

export default Home;