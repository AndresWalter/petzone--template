// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './components/LoginPage';

function App() {
  // Estados para productos y carrito
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  // Estado de autenticación
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  // Cargar estado de login desde localStorage
  const savedLogin = localStorage.getItem('petzone-logged-in');
  if (savedLogin === 'true') {
    setIsLoggedIn(true);
  }

}, []);

  // Funciones para manejar el carrito
  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };
  const handleLogin = () => {
  setIsLoggedIn(true);
  // Opcional: guardar en localStorage para persistencia
  localStorage.setItem('petzone-logged-in', 'true');
};

const handleLogout = () => {
  setIsLoggedIn(false);
  localStorage.removeItem('petzone-logged-in');
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
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}}>
  <div>
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
  </div>

  <div>
    {isLoggedIn ? (
      <>
        <span style={{ color: 'white', marginRight: '15px' }}>Hola, Usuario 🐶</span>
        <button 
          onClick={handleLogout}
          style={{
            padding: '5px 10px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Cerrar Sesión
        </button>
      </>
    ) : (
      <Link to="/login" style={{
        color: 'white',
        textDecoration: 'none',
        padding: '5px 10px',
        backgroundColor: '#2196F3',
        borderRadius: '5px'
      }}>
        Iniciar Sesión
      </Link>
    )}
  </div>
</nav>

        {/* Definición de rutas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList onAddToCart={handleAddToCart} />} />
          <Route path="/products/:id" element={<ProductDetail products={products} />} />
          <Route path="/cart" element={<CartPage cartItems={cart} onRemoveFromCart={handleRemoveFromCart} />} />
          <Route path="/checkout" element={<CheckoutPage cartItems={cart} />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/checkout" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <CheckoutPage />
            </ProtectedRoute>
          } />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;