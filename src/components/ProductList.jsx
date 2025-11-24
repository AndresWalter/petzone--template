// src/components/ProductList.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import ProductForm from './ProductForm';
import ConfirmationModal from './ConfirmationModal';
import './ProductList.css';

function ProductList() {
  // ============================================
  // CONTEXTOS: Cart, Auth, Products
  // ============================================
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { products, loading, error, eliminarProducto } = useProducts();

  // ============================================
  // ESTADOS LOCALES
  // ============================================
  const [addedProduct, setAddedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, product: null });

  // Verificar si el usuario es administrador
  const isAdmin = user?.username === 'admin';

  // ============================================
  // FUNCIÓN: Agregar producto al carrito con feedback visual
  // ============================================
  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedProduct(product.id);

    // Quitar el feedback después de 1 segundo
    setTimeout(() => {
      setAddedProduct(null);
    }, 1000);
  };

  // ============================================
  // FUNCIÓN: Abrir formulario para crear nuevo producto
  // ============================================
  const handleNewProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  // ============================================
  // FUNCIÓN: Abrir formulario para editar producto
  // ============================================
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  // ============================================
  // FUNCIÓN: Abrir modal de confirmación para eliminar
  // ============================================
  const handleDeleteClick = (product) => {
    setDeleteModal({ isOpen: true, product });
  };

  // ============================================
  // FUNCIÓN: Confirmar eliminación de producto
  // ============================================
  const handleConfirmDelete = async () => {
    const productToDelete = deleteModal.product;

    // Cerrar modal
    setDeleteModal({ isOpen: false, product: null });

    // Llamar a la función de eliminación del contexto
    const result = await eliminarProducto(productToDelete.id);

    if (!result.success) {
      alert(`Error al eliminar: ${result.error}`);
    }
  };

  // ============================================
  // FUNCIÓN: Cancelar eliminación
  // ============================================
  const handleCancelDelete = () => {
    setDeleteModal({ isOpen: false, product: null });
  };

  // ============================================
  // FUNCIÓN: Cerrar formulario después de éxito
  // ============================================
  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  // ============================================
  // FUNCIÓN: Cancelar formulario
  // ============================================
  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  // ============================================
  // RENDERIZADO CONDICIONAL: Estado de carga
  // ============================================
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  // ============================================
  // RENDERIZADO CONDICIONAL: Error
  // ============================================
  if (error) {
    return (
      <div className="error-container">
        <span className="error-icon">⚠️</span>
        <p>Error al cargar productos: {error}</p>
      </div>
    );
  }

  // ============================================
  // RENDERIZADO PRINCIPAL
  // ============================================
  return (
    <div className="product-list-container">
      {/* Encabezado con botón de agregar (solo para admin) */}
      <div className="product-list-header">
        <div>
          <h2>🐾 Productos Disponibles</h2>
          <p className="product-list-subtitle">
            Encuentra todo lo que tu mascota necesita
          </p>
        </div>

        {/* Botón para agregar producto (solo visible para admin) */}
        {isAdmin && (
          <button onClick={handleNewProduct} className="btn-add-product">
            ➕ Agregar Producto
          </button>
        )}
      </div>

      {/* Formulario de producto (crear/editar) */}
      {showForm && (
        <ProductForm
          currentProduct={editingProduct}
          onCancel={handleFormCancel}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* Grid de productos */}
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card fade-in">
            <div className="product-image-container">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <div className="product-overlay">
                <Link to={`/products/${product.id}`} className="btn-view-detail">
                  Ver Detalle
                </Link>
              </div>
            </div>

            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price.toFixed(2)}</p>

              {/* Botones de administración (solo para admin) */}
              {isAdmin && (
                <div className="admin-actions">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="btn-edit"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => handleDeleteClick(product)}
                    className="btn-delete"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              )}

              {/* Botón agregar al carrito */}
              <button
                onClick={() => handleAddToCart(product)}
                className={`btn-add-cart ${addedProduct === product.id ? 'added' : ''}`}
              >
                {addedProduct === product.id ? (
                  <>
                    <span className="btn-icon">✓</span>
                    ¡Agregado!
                  </>
                ) : (
                  <>
                    <span className="btn-icon">🛒</span>
                    Agregar al Carrito
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de confirmación de eliminación */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        title="⚠️ Eliminar Producto"
        message={`¿Estás seguro de que deseas eliminar "${deleteModal.product?.name}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

export default ProductList;