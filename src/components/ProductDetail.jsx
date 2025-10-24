// src/components/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function ProductDetail({ products }) {
  const { id } = useParams();
  const navigate = useNavigate(); // Para redirigir si no existe el producto

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);

    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      setError(`Producto con ID ${id} no encontrado.`);
    }
    setLoading(false);
  }, [id, products]);

  if (loading) {
    return <p>Cargando producto...</p>;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2 style={{ color: 'red' }}>¡Producto no encontrado!</h2>
        <p>{error}</p>
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
          Volver a Productos
        </button>
      </div>
    );
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
      </div>
    </div>
  );
}

export default ProductDetail;