// src/components/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Obtener la página previa o ir a /products por defecto
    const from = location.state?.from?.pathname || '/products';

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Limpiar error al escribir
        if (error) setError('');
    };

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validación básica
        if (!formData.username || !formData.password) {
            setError('Por favor completa todos los campos');
            setLoading(false);
            return;
        }

        try {
            const result = await login(formData.username, formData.password);

            if (result.success) {
                // Login exitoso - redirigir a la página previa o productos
                navigate(from, { replace: true });
            } else {
                // Login fallido - mostrar error
                setError(result.error);
            }
        } catch (err) {
            setError('Ocurrió un error inesperado');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page-container">
            <div className="login-card fade-in">
                <div className="login-header">
                    <span className="login-icon">🐾</span>
                    <h2>Iniciar Sesión</h2>
                    <p>Accede a tu cuenta de PetZone</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">
                            <span className="label-icon">👤</span>
                            Usuario
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Ingresa tu usuario"
                            disabled={loading}
                            autoComplete="username"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            <span className="label-icon">🔒</span>
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Ingresa tu contraseña"
                            disabled={loading}
                            autoComplete="current-password"
                        />
                    </div>

                    {error && (
                        <div className="error-message slide-in">
                            <span className="error-icon">⚠️</span>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className={`btn-submit ${loading ? 'loading' : ''}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Iniciando sesión...
                            </>
                        ) : (
                            <>
                                <span className="btn-icon">🚀</span>
                                Iniciar Sesión
                            </>
                        )}
                    </button>
                </form>

                <div className="login-footer">
                    <div className="demo-credentials">
                        <p className="demo-title">💡 Credenciales de prueba:</p>
                        <div className="demo-list">
                            <code>admin / admin123</code>
                            <code>demo / demo</code>
                        </div>
                    </div>

                    <Link to="/" className="back-link">
                        ← Volver al inicio
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;