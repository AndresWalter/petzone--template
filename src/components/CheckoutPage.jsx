// src/components/CheckoutPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './CheckoutPage.css';

function CheckoutPage() {
    const navigate = useNavigate();
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const [orderConfirmed, setOrderConfirmed] = useState(false);

    // Si no hay productos en el carrito
    if (cartItems.length === 0 && !orderConfirmed) {
        return (
            <div className="empty-checkout-container">
                <div className="empty-checkout-content">
                    <span className="empty-icon">🛒</span>
                    <h2>Carrito vacío</h2>
                    <p>Debes agregar productos al carrito antes de proceder al pago.</p>
                    <button onClick={() => navigate('/products')} className="btn-go-products">
                        <span className="btn-icon">🛍️</span>
                        Ir a Productos
                    </button>
                </div>
            </div>
        );
    }

    // Confirmar compra
    const handleConfirmOrder = () => {
        setOrderConfirmed(true);

        // Limpiar carrito después de 2 segundos
        setTimeout(() => {
            clearCart();
            navigate('/products');
        }, 3000);
    };

    // Si la orden fue confirmada
    if (orderConfirmed) {
        return (
            <div className="order-confirmed-container fade-in">
                <div className="success-animation">
                    <span className="success-icon">✓</span>
                </div>
                <h2>¡Compra Confirmada!</h2>
                <p>Gracias por tu compra, <strong>{user.name}</strong></p>
                <p className="redirect-message">Redirigiendo a productos...</p>
            </div>
        );
    }

    return (
        <div className="checkout-page-container fade-in">
            <div className="checkout-header">
                <h2>💳 Proceder al Pago</h2>
                <p>Revisa tu pedido antes de confirmar</p>
            </div>

            <div className="checkout-content">
                {/* Resumen del pedido */}
                <div className="order-summary">
                    <h3>Resumen del Pedido</h3>

                    <div className="order-items">
                        {cartItems.map(item => (
                            <div key={item.id} className="order-item">
                                <img src={item.image} alt={item.name} className="order-item-image" />
                                <div className="order-item-info">
                                    <h4>{item.name}</h4>
                                    <p>Cantidad: {item.quantity}</p>
                                </div>
                                <div className="order-item-price">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="order-total-section">
                        <div className="total-row">
                            <span>Subtotal:</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="total-row">
                            <span>Envío:</span>
                            <span className="free-text">¡Gratis! 🎉</span>
                        </div>
                        <div className="total-divider"></div>
                        <div className="total-row total-final">
                            <span>Total:</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Información de usuario */}
                <div className="user-info-section">
                    <h3>Información de Envío</h3>
                    <div className="user-info-card">
                        <div className="info-row">
                            <span className="info-icon">👤</span>
                            <div>
                                <strong>Usuario:</strong>
                                <p>{user.name}</p>
                            </div>
                        </div>
                        <div className="info-row">
                            <span className="info-icon">📧</span>
                            <div>
                                <strong>Email:</strong>
                                <p>{user.username}@petzone.com</p>
                            </div>
                        </div>
                        <div className="info-row">
                            <span className="info-icon">📦</span>
                            <div>
                                <strong>Método de envío:</strong>
                                <p>Envío estándar (3-5 días hábiles)</p>
                            </div>
                        </div>
                    </div>

                    <div className="checkout-actions">
                        <button onClick={handleConfirmOrder} className="btn-confirm-order">
                            <span className="btn-icon">✓</span>
                            Confirmar Compra
                        </button>
                        <button onClick={() => navigate('/cart')} className="btn-back-cart">
                            ← Volver al Carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;