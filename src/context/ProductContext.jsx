// src/context/ProductContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// URL base de la API de productos
const API_URL = 'https://68f92640deff18f212b8ca24.mockapi.io/api/v1/productos';

// Datos de respaldo por si falla la API
const FALLBACK_PRODUCTS = [
    {
        id: '1',
        name: 'Alimento Premium Perro',
        price: 45.99,
        description: 'Alimento balanceado de alta calidad para perros adultos. Saco de 15kg.',
        image: 'https://images.unsplash.com/photo-1589924691195-41432c84c161?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: '2',
        name: 'Rascador para Gatos',
        price: 35.50,
        description: 'Rascador tipo torre con 3 niveles y juguetes colgantes.',
        image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: '3',
        name: 'Cama Ortopédica',
        price: 59.99,
        description: 'Cama con espuma viscoelástica para máximo confort.',
        image: 'https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: '4',
        name: 'Juguete Kong',
        price: 12.99,
        description: 'Juguete resistente de caucho natural para morder y rellenar.',
        image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
];

// Contexto
const ProductContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts debe usarse dentro de un ProductProvider');
    }
    return context;
};

export const ProductProvider = ({ children }) => {
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

            // Intentar fetch a MockAPI
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const data = await response.json();

            // Normalizar datos (API usa 'imagen' y 'descripcion' a veces)
            const normalizedData = data.map(prod => ({
                ...prod,
                image: prod.image || prod.imagen || 'https://via.placeholder.com/300',
                description: prod.description || prod.descripcion || ''
            }));

            setProducts(normalizedData);

        } catch (err) {
            console.error('Error al obtener productos (usando fallback):', err);
            // En caso de error, usar datos de respaldo para que la UI no quede vacía
            setProducts(FALLBACK_PRODUCTS);
            // No seteamos error global para que no muestre la alerta roja, 
            // pero podríamos mostrar un toast informativo si quisiéramos.
        } finally {
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
