// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};

// URL de la API para usuarios
// Asumimos que la variable de entorno apunta a .../productos, así que la ajustamos para .../users
const API_URL = process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL.replace('/productos', '/users')
    : 'https://68f92640deff18f212b8ca24.mockapi.io/api/v1/users';

// Credenciales de respaldo (para admin/demo si no están en la API)
const FALLBACK_USERS = [
    { username: 'admin', password: 'admin123', name: 'Administrador', role: 'admin' },
    { username: 'demo', password: 'demo', name: 'Demo User', role: 'user' }
];

// Provider del contexto
export const AuthProvider = ({ children }) => {
    // Estado del usuario - cargar desde localStorage si existe
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('petzone-user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Guardar en localStorage cada vez que cambia el usuario
    useEffect(() => {
        if (user) {
            localStorage.setItem('petzone-user', JSON.stringify(user));
        } else {
            localStorage.removeItem('petzone-user');
        }
    }, [user]);

    // Función de registro
    const register = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            // Preparamos el objeto de usuario
            const newUser = {
                name: userData.name,
                email: userData.email,
                username: userData.username, // Usamos el username proporcionado por el usuario
                password: userData.password, // NOTA: En producción, NUNCA guardar contraseñas en texto plano
                role: 'user',
                createdAt: new Date().toISOString()
            };

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('El endpoint /users no existe en MockAPI. Por favor créalo.');
                }
                throw new Error('Error al registrar el usuario en la API');
            }

            const createdUser = await response.json();

            // Login automático después del registro
            setUser(createdUser);
            return { success: true, user: createdUser };

        } catch (err) {
            console.error("Error en registro:", err);
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    // Función de login
    const login = async (usernameOrEmail, password) => {
        setLoading(true);
        setError(null);

        let apiUsers = [];
        try {
            // 1. Intentar buscar en la API
            const response = await fetch(API_URL);
            if (response.ok) {
                apiUsers = await response.json();
            } else {
                console.warn(`API Error: ${response.status} - Usando usuarios de respaldo.`);
            }
        } catch (err) {
            console.warn("API no disponible o error de conexión - Usando usuarios de respaldo.", err);
        }

        try {
            // Buscamos coincidencia en API (si se cargaron)
            const foundUser = apiUsers.find(u =>
                (u.email === usernameOrEmail || u.username === usernameOrEmail) &&
                u.password === password
            );

            if (foundUser) {
                setUser(foundUser);
                return { success: true, user: foundUser };
            }

            // 2. Si no está en API, buscar en FALLBACK_USERS (para admin/demo)
            const fallbackUser = FALLBACK_USERS.find(
                u => u.username === usernameOrEmail && u.password === password
            );

            if (fallbackUser) {
                setUser(fallbackUser);
                return { success: true, user: fallbackUser };
            }

            return { success: false, error: 'Usuario o contraseña incorrectos' };

        } catch (err) {
            console.error("Error en login:", err);
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    // Función de logout
    const logout = () => {
        setUser(null);
    };

    // Verificar si está autenticado
    const isAuthenticated = user !== null;

    // Valor del contexto
    const value = {
        user,
        loading,
        error,
        login,
        logout,
        register,
        isAuthenticated
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
