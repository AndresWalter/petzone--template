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

// Credenciales simuladas (en producción esto vendría de una API)
const MOCK_USERS = [
    { username: 'admin', password: 'admin123', name: 'Administrador' },
    { username: 'user', password: 'user123', name: 'Usuario Demo' },
    { username: 'demo', password: 'demo', name: 'Demo User' }
];

// Provider del contexto
export const AuthProvider = ({ children }) => {
    // Estado del usuario - cargar desde localStorage si existe
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('petzone-user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Guardar en localStorage cada vez que cambia el usuario
    useEffect(() => {
        if (user) {
            localStorage.setItem('petzone-user', JSON.stringify(user));
        } else {
            localStorage.removeItem('petzone-user');
        }
    }, [user]);

    // Función de login
    const login = (username, password) => {
        // Buscar usuario en las credenciales simuladas
        const foundUser = MOCK_USERS.find(
            u => u.username === username && u.password === password
        );

        if (foundUser) {
            // Login exitoso
            const userData = {
                username: foundUser.username,
                name: foundUser.name,
                loginTime: new Date().toISOString()
            };
            setUser(userData);
            return { success: true, user: userData };
        } else {
            // Login fallido
            return { success: false, error: 'Usuario o contraseña incorrectos' };
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
        login,
        logout,
        isAuthenticated
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
