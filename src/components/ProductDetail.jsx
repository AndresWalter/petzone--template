// src/components/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://68f92640deff18f212b8ca24.mockapi.io/api/v1/productos/${id}`);

        if (!response.ok) {
          throw new Error(`Producto no encontrado`);
        }

        const data = await response.json();
        // Normalizar datos igual que en el contexto
        const normalizedProduct = {
          ...data,
          image: data.image || data.imagen || 'https://via.placeholder.com/300',
          description: data.description || data.descripcion || ''
        };
        setProduct(normalizedProduct);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    fetchProduct();
  }, [id]);

  // Scroll al inicio al cargar el componente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <span className="error-icon">😿</span>
        <h2>¡Producto no encontrado!</h2>
        <p>{error || 'El producto que buscas no existe'}</p>
        <button onClick={() => navigate('/products')} className="btn-back">
          Volver a Productos
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-container fade-in">
      <div className="product-detail-card">
        <div className="product-detail-image">
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=No+Image'; }}
          />
        </div>

        <div className="product-detail-info">
          <h1>{product.name}</h1>

          <div className="product-price-section">
            <span className="price-label">Precio:</span>
            <span className="price-value">${product.price.toFixed(2)}</span>
          </div>

          <div className="product-description">
            <h3>Descripción</h3>
            <p>{product.description || "Este es un producto premium para tu mascota. ¡A tu amigo peludo le encantará!"}</p>
          </div>

          <div className="product-actions">
            <button
              onClick={handleAddToCart}
              className={`btn-add-to-cart ${addedToCart ? 'added' : ''}`}
            >
              {addedToCart ? (
                <>
                  <span className="btn-icon">✓</span>
                  ¡Agregado al Carrito!
                </>
              ) : (
                <>
                  <span className="btn-icon">🛒</span>
                  Agregar al Carrito
                </>
              )}
            </button>

            <Link to="/products" className="btn-back-link">
              ← Volver a Productos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;