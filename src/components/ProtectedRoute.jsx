// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  // Si no está logueado, redirige a /login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está logueado, muestra el contenido (children)
  return children;
}

export default ProtectedRoute;