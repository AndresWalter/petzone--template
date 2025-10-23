// src/components/ProductList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProductList({ onAddToCart }) {
  // Estados para manejar la carga, los datos y los errores
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

  // useEffect: se ejecuta cuando el componente se monta
useEffect(() => {
    // Función asíncrona para obtener los productos de la API
    const fetchProducts = async () => {
    try {
        // URL de MockAPI
        const response = await fetch('https://68f92640deff18f212b8ca24.mockapi.io/api/v1/productos');
        
        // Si la respuesta no es OK, lanzamos un error
        if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
        }

        // Convertimos la respuesta a JSON
        const data = await response.json();
        
        // Guardamos los productos en el estado
        setProducts(data);
        
    } catch (err) {
        // Capturamos cualquier error (red, servidor, etc.)
        setError(err.message);
    } finally {
        // Terminamos la carga, ocurra lo que ocurra
        setLoading(false);
    }
    };

    // Llamamos a la función
    fetchProducts();
  }, []); // El array vacío significa que solo se ejecuta una vez al montar

  // Mostramos estado de carga
if (loading) {
    return <p>Cargando productos...</p>;
}

  // Mostramos error si ocurrió
if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
}

  // Mostramos los productos si todo fue bien
return (
    <div>
    <h2>Productos Disponibles</h2>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
{products.map(product => (
  <div key={product.id} style={{ border: '1px solid #ddd', padding: '15px', width: '200px', textAlign: 'center' }}>
    <img src={product.image} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
    <h3>{product.name}</h3>
    <p>${product.price.toFixed(2)}</p>
    <div style={{ marginTop: '10px' }}>
      <button onClick={() => onAddToCart(product)} style={{
        marginRight: '5px',
        padding: '5px 10px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        Agregar al carrito
      </button>
      <Link to={`/products/${product.id}`} style={{
        padding: '5px 10px',
        backgroundColor: '#2196F3',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px'
      }}>
        Ver Detalle
      </Link>
    </div>
  </div>
))}
    </div>
    </div>
);
}

export default ProductList;