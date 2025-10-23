// src/components/CartPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function CartPage({ cartItems, onRemoveFromCart }) {
  // Calcular total
const total = cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);

if (cartItems.length === 0) {
    return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Carrito de Compras</h2>
        <p>No hay productos en el carrito.</p>
        <Link to="/products" style={{
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        fontWeight: 'bold'
        }}>
        Seguir comprando
        </Link>
    </div>
    );
}

return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
    <h2>Carrito de Compras</h2>
    <ul style={{ listStyle: 'none', padding: 0 }}>
        {cartItems.map(item => (
        <li key={item.id} style={{
            marginBottom: '15px',
            padding: '15px',
            border: '1px solid #ddd',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img 
                src={item.image} 
                alt={item.name} 
                style={{ width: '60px', height: '60px', objectFit: 'cover' }} 
            />
            <div>
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
            </div>
            </div>
            <button 
            onClick={() => onRemoveFromCart(item.id)}
            style={{
                padding: '5px 10px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
            }}
            >
            Quitar
            </button>
        </li>
        ))}
    </ul>

    <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#f5f5f5',
        borderRadius: '5px',
        textAlign: 'right'
    }}>
        <strong>Total: ${total}</strong>
    </div>

    <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button style={{
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px'
        }}>
        Proceder al Pago
        </button>
    </div>

    <div style={{ marginTop: '20px' }}>
        <Link to="/products" style={{
        padding: '8px 16px',
        backgroundColor: '#ddd',
        textDecoration: 'none',
        borderRadius: '5px'
        }}>
        Seguir comprando
        </Link>
    </div>
    </div>
);
}

export default CartPage;