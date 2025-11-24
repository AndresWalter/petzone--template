// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const CartContext = createContext();

// Hook para usar el contexto
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe usarse dentro de un CartProvider');
    }
    return context;
};

// Provider del contexto
export const CartProvider = ({ children }) => {
    // Estado del carrito - cargar desde localStorage si existe
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('petzone-cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Guardar en localStorage cada vez que cambia el carrito
    useEffect(() => {
        localStorage.setItem('petzone-cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Agregar producto al carrito
    const addToCart = (product) => {
        setCartItems(prevItems => {
            // Verificar si el producto ya existe en el carrito
            const existingItem = prevItems.find(item => item.id === product.id);

            if (existingItem) {
                // Si existe, incrementar cantidad
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Si no existe, agregarlo con cantidad 1
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    // Eliminar producto del carrito
    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    // Actualizar cantidad de un producto
    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    // Vaciar carrito completo
    const clearCart = () => {
        setCartItems([]);
    };

    // Calcular total del carrito
    const cartTotal = cartItems.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
    );

    // Calcular cantidad total de items
    const cartCount = cartItems.reduce(
        (count, item) => count + item.quantity,
        0
    );

    // Valor del contexto
    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
