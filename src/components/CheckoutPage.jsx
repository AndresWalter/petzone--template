// src/components/CheckoutPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function CheckoutPage({ cartItems }) {
const navigate = useNavigate();

  // Si no hay productos en el carrito, redirigimos a la página de productos
if (cartItems.length === 0) {
    return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2 style={{ color: 'red' }}>Carrito vacío</h2>
        <p>Debes agregar productos al carrito antes de proceder al pago.</p>
        <button 
        onClick={() => navigate('/products')}
        style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
        }}
        >
        Ir a Productos
        </button>
    </div>
    );
}

return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
    <h2>Proceder al Pago</h2>
    <p>Gracias por tu compra. Estás a punto de finalizar tu pedido.</p>

      {/* Mostrar resumen del carrito */}
    <ul style={{ listStyle: 'none', padding: 0 }}>
        {cartItems.map(item => (
        <li key={item.id} style={{
            marginBottom: '10px',
            padding: '10px',
            border: '1px solid #ddd',
            display: 'flex',
            justifyContent: 'space-between'
        }}>
            <span>{item.name} - ${item.price.toFixed(2)}</span>
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
        <strong>Total: ${cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</strong>
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
        Confirmar Compra
        </button>
    </div>

    <div style={{ marginTop: '20px' }}>
        <button 
        onClick={() => navigate('/cart')}
        style={{
            padding: '8px 16px',
            backgroundColor: '#ddd',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
        }}
        >
        Volver al Carrito
        </button>
    </div>
    </div>
);
}

export default CheckoutPage;