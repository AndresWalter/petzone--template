// src/context/ProductContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// URL base de la API de productos
const API_URL = 'https://68f92640deff18f212b8ca24.mockapi.io/api/v1/productos';

// Crear el contexto
const ProductContext = createContext();

// Hook para usar el contexto
export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts debe usarse dentro de un ProductProvider');
    }
    return context;
};

// Provider del contexto
export const ProductProvider = ({ children }) => {
    // Estados del contexto
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ============================================
    // FUNCIÓN: Obtener todos los productos (GET)
    // ============================================
    const obtenerProductos = async () => {
        try {
            setLoading(true);
            setError(null);

            // Realizar petición GET a MockAPI
            const response = await fetch(API_URL);

            // Verificar si la respuesta fue exitosa
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            // Convertir respuesta a JSON
            const data = await response.json();

            // Actualizar estado con los productos
            setProducts(data);

        } catch (err) {
            // Capturar y guardar el error
            console.error('Error al obtener productos:', err);
            setError(err.message);
        } finally {
            // Finalizar estado de carga
            setLoading(false);
        }
    };

    // ============================================
    // FUNCIÓN: Agregar un nuevo producto (POST)
    // ============================================
    const agregarProducto = async (nuevoProducto) => {
        try {
            setLoading(true);
            setError(null);

            // Realizar petición POST a MockAPI
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoProducto),
            });

            // Verificar si la respuesta fue exitosa
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            // Convertir respuesta a JSON (el producto creado con su ID)
            const productoCreado = await response.json();

            // Agregar el nuevo producto al estado local
            setProducts(prevProducts => [...prevProducts, productoCreado]);

            return { success: true, data: productoCreado };

        } catch (err) {
            // Capturar y guardar el error
            console.error('Error al agregar producto:', err);
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            // Finalizar estado de carga
            setLoading(false);
        }
    };

    // ============================================
    // FUNCIÓN: Editar un producto existente (PUT)
    // ============================================
    const editarProducto = async (id, productoActualizado) => {
        try {
            setLoading(true);
            setError(null);

            // Realizar petición PUT a MockAPI
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productoActualizado),
            });

            // Verificar si la respuesta fue exitosa
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            // Convertir respuesta a JSON (el producto actualizado)
            const productoEditado = await response.json();

            // Actualizar el producto en el estado local
            setProducts(prevProducts =>
                prevProducts.map(producto =>
                    producto.id === id ? productoEditado : producto
                )
            );

            return { success: true, data: productoEditado };

        } catch (err) {
            // Capturar y guardar el error
            console.error('Error al editar producto:', err);
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            // Finalizar estado de carga
            setLoading(false);
        }
    };

    // ============================================
    // FUNCIÓN: Eliminar un producto (DELETE)
    // ============================================
    const eliminarProducto = async (id) => {
        try {
            setLoading(true);
            setError(null);

            // Realizar petición DELETE a MockAPI
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            // Verificar si la respuesta fue exitosa
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            // Eliminar el producto del estado local
            setProducts(prevProducts =>
                prevProducts.filter(producto => producto.id !== id)
            );

            return { success: true };

        } catch (err) {
            // Capturar y guardar el error
            console.error('Error al eliminar producto:', err);
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            // Finalizar estado de carga
            setLoading(false);
        }
    };

    // ============================================
    // EFECTO: Cargar productos al montar el componente
    // ============================================
    useEffect(() => {
        obtenerProductos();
    }, []); // Solo se ejecuta una vez al montar

    // Valor que se compartirá a través del contexto
    const value = {
        // Estados
        products,
        loading,
        error,
        // Funciones CRUD
        obtenerProductos,
        agregarProducto,
        editarProducto,
        eliminarProducto,
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};
