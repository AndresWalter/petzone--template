// src/components/CartPage.jsx
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import './CartPage.css';

function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
    const { products } = useProducts();

    // Sincronizar datos del carrito con productos actualizados
    const syncedCartItems = useMemo(() => {
        return cartItems.map(cartItem => {
            const currentProduct = products.find(p => p.id === cartItem.id);
            if (currentProduct) {
                // Usar datos actualizados del producto
                return {
                    ...currentProduct,
                    quantity: cartItem.quantity // Mantener la cantidad del carrito
                };
            }
            // Si el producto ya no existe, mantener el item del carrito
            return cartItem;
        }).filter(item => {
            // Filtrar productos que fueron eliminados
            return products.some(p => p.id === item.id);
        });
    }, [cartItems, products]);

    // Función para manejar cambio de cantidad
    const handleQuantityChange = (productId, newQuantity) => {
        const quantity = parseInt(newQuantity);
        if (quantity > 0) {
            updateQuantity(productId, quantity);
        }
    };

    // Si el carrito está vacío
    if (syncedCartItems.length === 0) {
        return (
            <div className="empty-cart-container">
                <div className="empty-cart-content">
                    <span className="empty-cart-icon">🛒</span>
                    <h2>Tu carrito está vacío</h2>
                    <p>¡Agrega productos para comenzar a comprar!</p>
                    <Link to="/products" className="btn-continue-shopping">
                        <span className="btn-icon">🛍️</span>
                        Explorar Productos
                    </Link>
                </div>
            </div>
        );
    }

    // Si hay productos en el carrito
    return (
        <div className="cart-page-container">
            <div className="cart-header">
                <h2>🛒 Mi Carrito</h2>
                <button onClick={clearCart} className="btn-clear-cart">
                    <span className="btn-icon">🗑️</span>
                    Vaciar Carrito
                </button>
            </div>

            <div className="cart-content">
                {/* Lista de productos */}
                <div className="cart-items">
                    {syncedCartItems.map(item => (
                        <div key={item.id} className="cart-item fade-in">
                            <div className="cart-item-image">
                                <img src={item.image} alt={item.name} />
                            </div>

                            <div className="cart-item-info">
                                <h3 className="cart-item-name">{item.name}</h3>
                                <p className="cart-item-price">${item.price.toFixed(2)} c/u</p>
                            </div>

                            <div className="cart-item-quantity">
                                <label htmlFor={`quantity-${item.id}`}>Cantidad:</label>
                                <div className="quantity-controls">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="quantity-btn"
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <input
                                        id={`quantity-${item.id}`}
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                        className="quantity-input"
                                    />
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="quantity-btn"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="cart-item-total">
                                <p className="item-total-label">Subtotal:</p>
                                <p className="item-total-price">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>

                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="btn-remove-item"
                                title="Eliminar producto"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                {/* Resumen del carrito */}
                <div className="cart-summary">
                    <div className="summary-card">
                        <h3>Resumen del Pedido</h3>

                        <div className="summary-details">
                            <div className="summary-row">
                                <span>Productos:</span>
                                <span>{syncedCartItems.reduce((sum, item) => sum + item.quantity, 0)} items</span>
                            </div>

                            <div className="summary-row">
                                <span>Subtotal:</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>

                            <div className="summary-row">
                                <span>Envío:</span>
                                <span className="free-shipping">¡Gratis! 🎉</span>
                            </div>

                            <div className="summary-divider"></div>

                            <div className="summary-row summary-total">
                                <span>Total:</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <Link to="/checkout" className="btn-checkout">
                            <span className="btn-icon">💳</span>
                            Proceder al Pago
                        </Link>

                        <Link to="/products" className="btn-continue">
                            ← Seguir Comprando
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;