// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, isLoggedIn }) {
  // Si no está logueado, redirige a /login
if (!isLoggedIn) {
    return <Navigate to="/login" />;
}

  // Si está logueado, muestra el contenido (children)
return children;
}

export default ProtectedRoute;