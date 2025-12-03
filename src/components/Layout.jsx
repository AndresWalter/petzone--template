// src/components/Layout.jsx
import React from 'react';

function Layout({ children }) {
    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            minHeight: '100vh'
        }}>


            {/* Contenido principal */}
            <main style={{
                marginTop: '20px',
                minHeight: '80vh',
                paddingBottom: '20px'
            }}>
                {children}
            </main>


        </div>
    );
}

export default Layout;