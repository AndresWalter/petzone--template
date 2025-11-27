// src/components/ProductList.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaPlus, FaShoppingCart, FaCheck } from 'react-icons/fa';

// Contextos
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';

// Componentes
import FormModal from './FormModal'; // Importar FormModal
import ConfirmationModal from './ConfirmationModal';

// Styled Components
import {
  StyledPageContainer,
  StyledHeader,
  StyledCard,
  StyledCardImage,
  StyledCardBody,
  StyledProductTitle,
  StyledProductPrice,
  StyledButton,
  StyledIconButton
} from './styles/StyledComponents';

function ProductList() {
  // ============================================
  // CONTEXTOS
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

  // Verificar si es admin
  const isAdmin = user?.username === 'admin';

  // ============================================
  // HANDLERS
  // ============================================

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedProduct(product.id);
    toast.success(`¡${product.name} agregado al carrito! 🛒`);

    setTimeout(() => {
      setAddedProduct(null);
    }, 1000);
  };

  const handleNewProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteClick = (product) => {
    setDeleteModal({ isOpen: true, product });
  };

  const handleConfirmDelete = async () => {
    const productToDelete = deleteModal.product;
    setDeleteModal({ isOpen: false, product: null });

    const result = await eliminarProducto(productToDelete.id);

    if (result.success) {
      toast.success('Producto eliminado correctamente 🗑️');
    } else {
      toast.error(`Error al eliminar: ${result.error}`);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModal({ isOpen: false, product: null });
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingProduct(null);
    toast.success(editingProduct ? 'Producto actualizado correctamente ✨' : 'Producto creado exitosamente 🎉');
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  // ============================================
  // RENDERIZADO
  // ============================================

  if (loading) {
    return (
      <StyledPageContainer className="d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </StyledPageContainer>
    );
  }

  // Nota: Si hay error en API, ProductContext ahora usa fallback, así que 'error' será null usualmente.

  return (
    <StyledPageContainer>
      <Helmet>
        <title>Catálogo de Productos | PetZone</title>
        <meta name="description" content="Explora nuestro catálogo de productos premium para mascotas." />
      </Helmet>

      <div className="container">
        {/* Header Section */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-8">
            <StyledHeader className="text-md-start text-center mb-0">
              <h2>🐾 Productos Disponibles</h2>
              <p>Encuentra todo lo que tu mascota necesita</p>
            </StyledHeader>
          </div>
          <div className="col-md-4 text-center text-md-end">
            {isAdmin && (
              <StyledButton
                $variant="primary"
                onClick={handleNewProduct}
                aria-label="Agregar nuevo producto"
              >
                <FaPlus /> Nuevo Producto
              </StyledButton>
            )}
          </div>
        </div>

        {/* 
           MODAL DE FORMULARIO 
           Reemplaza al formulario en línea anterior
        */}
        <FormModal
          isOpen={showForm}
          onClose={handleFormClose}
          currentProduct={editingProduct}
          onSuccess={handleFormSuccess}
        />

        {/* Products Grid */}
        <div className="row g-4">
          {products.map(product => (
            <div key={product.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <StyledCard>
                <StyledCardImage>
                  <img src={product.image} alt={product.name} onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=No+Image'; }} />
                </StyledCardImage>

                <StyledCardBody>
                  <StyledProductTitle>{product.name}</StyledProductTitle>
                  <StyledProductPrice>${product.price.toFixed(2)}</StyledProductPrice>

                  <div className="mt-auto d-flex flex-column gap-2">
                    <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                      <StyledButton $variant="secondary" $fullWidth>
                        Ver Detalle
                      </StyledButton>
                    </Link>

                    <StyledButton
                      $variant={addedProduct === product.id ? "success" : "primary"}
                      $fullWidth
                      onClick={() => handleAddToCart(product)}
                      disabled={addedProduct === product.id}
                    >
                      {addedProduct === product.id ? <FaCheck /> : <FaShoppingCart />}
                      {addedProduct === product.id ? '¡Agregado!' : 'Agregar'}
                    </StyledButton>

                    {isAdmin && (
                      <div className="d-flex gap-2 mt-2 pt-2 border-top">
                        <StyledIconButton
                          $variant="warning"
                          onClick={() => handleEditProduct(product)}
                          aria-label={`Editar ${product.name}`}
                          style={{ flex: 1 }}
                        >
                          <FaEdit />
                        </StyledIconButton>
                        <StyledIconButton
                          $variant="danger"
                          onClick={() => handleDeleteClick(product)}
                          aria-label={`Eliminar ${product.name}`}
                          style={{ flex: 1 }}
                        >
                          <FaTrash />
                        </StyledIconButton>
                      </div>
                    )}
                  </div>
                </StyledCardBody>
              </StyledCard>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        title="Eliminar Producto"
        message={`¿Estás seguro de que deseas eliminar "${deleteModal.product?.name}"?`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </StyledPageContainer>
  );
}

export default ProductList;