// src/components/Cart.jsx
import React from 'react';

function Cart({ cartItems, onRemoveFromCart }) {
  // Si no hay productos en el carrito, mostramos un mensaje
if (cartItems.length === 0) {
    return <p>No hay productos en el carrito.</p>;
}

return (
    <div>
    <h2>Carrito de Compras</h2>
    <ul style={{ listStyle: 'none', padding: 0 }}>
        {cartItems.map(item => (
        <li key={item.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', display: 'flex', justifyContent: 'space-between' }}>
            <span>{item.name} - ${item.price.toFixed(2)}</span>
            <button onClick={() => onRemoveFromCart(item.id)}>Quitar</button>
        </li>
        ))}
    </ul>
    </div>
);
}

export default Cart;