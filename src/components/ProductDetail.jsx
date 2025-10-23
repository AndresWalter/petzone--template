// src/components/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductDetail({ products }) {
  // Obtenemos el ID del producto desde la URL
const { id } = useParams();

  // Estado para el producto actual y manejo de carga/error
const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
    // Buscamos el producto por ID en la lista recibida
    const foundProduct = products.find(p => p.id === id);
    
    if (foundProduct) {
    setProduct(foundProduct);
    } else {
    setError(`Producto con ID ${id} no encontrado.`);
    }
    setLoading(false);
  }, [id, products]); // Se ejecuta cuando cambia el ID o los productos

if (loading) {
    return <p>Cargando producto...</p>;
}

if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
}

return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
    <img 
        src={product.image} 
        alt={product.name} 
        style={{ width: '100%', height: '300px', objectFit: 'cover', marginBottom: '15px' }} 
    />
    <h2>{product.name}</h2>
    <p><strong>Precio:</strong> ${product.price.toFixed(2)}</p>
    <p>{product.description || "Descripción no disponible."}</p>
    
    <div style={{ marginTop: '20px' }}>
        <Link to="/products" style={{
        marginRight: '10px',
        padding: '8px 16px',
        backgroundColor: '#ddd',
        textDecoration: 'none',
        borderRadius: '5px'
        }}>
        Volver a Productos
        </Link>
        {/* Aquí podrías agregar un botón para agregar al carrito */}
    </div>
    </div>
);
}

export default ProductDetail;