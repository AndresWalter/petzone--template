// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import CartPage from './components/CartPage';

function App() {
  // Estados para productos y carrito
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Estado de carga y error para la API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect para cargar productos de la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://68f92640deff18f212b8ca24.mockapi.io/api/v1/productos');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Funciones para manejar el carrito
  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Mostrar estado de carga global
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Cargando productos...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>Error: {error}</div>;
  }

  return (
    <Router>
      <Layout>
        {/* Barra de navegación */}
        <nav style={{
          backgroundColor: '#333',
          padding: '10px 20px',
          marginBottom: '20px'
        }}>
          <Link to="/" style={{
            color: 'white',
            textDecoration: 'none',
            marginRight: '20px',
            fontWeight: 'bold'
          }}>
            Inicio
          </Link>
          <Link to="/products" style={{
            color: 'white',
            textDecoration: 'none',
            marginRight: '20px'
          }}>
            Productos
          </Link>
          <Link to="/cart" style={{
            color: 'white',
            textDecoration: 'none'
          }}>
            Carrito ({cart.length})
          </Link>
        </nav>

        {/* Definición de rutas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList onAddToCart={handleAddToCart} />} />
          <Route path="/products/:id" element={<ProductDetail products={products} />} />
          <Route path="/cart" element={<CartPage cartItems={cart} onRemoveFromCart={handleRemoveFromCart} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;