// src/components/Pagination.jsx
import React from 'react';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-top: 3rem;
    flex-wrap: wrap;
`;

const PaginationButton = styled.button`
    padding: 0.625rem 1rem;
    border: 2px solid ${props => props.$active ? '#6366f1' : 'rgba(99, 102, 241, 0.2)'};
    background: ${props => props.$active ?
        'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' :
        'rgba(255, 255, 255, 0.95)'};
    color: ${props => props.$active ? '#ffffff' : '#6366f1'};
    border-radius: 12px;
    cursor: pointer;
    font-weight: ${props => props.$active ? '700' : '600'};
    font-size: 0.95rem;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: ${props => props.$isNav ? 'auto' : '45px'};
    justify-content: center;
    backdrop-filter: blur(10px);
    box-shadow: ${props => props.$active ?
        '0 4px 15px rgba(99, 102, 241, 0.4)' :
        '0 2px 8px rgba(99, 102, 241, 0.1)'};

    &:hover:not(:disabled) {
        background: ${props => props.$active ?
        'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' :
        'rgba(99, 102, 241, 0.1)'};
        border-color: #6366f1;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(99, 102, 241, 0.3);
    }

    &:active:not(:disabled) {
        transform: translateY(0);
    }

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
        transform: none;
    }

    @media (max-width: 576px) {
        padding: 0.5rem 0.75rem;
        font-size: 0.875rem;
        min-width: ${props => props.$isNav ? 'auto' : '40px'};
    }
`;

const PageInfo = styled.span`
    color: #6b7280;
    font-size: 0.95rem;
    font-weight: 500;
    padding: 0 0.5rem;
    
    @media (max-width: 576px) {
        font-size: 0.875rem;
    }
`;

function Pagination({ currentPage, productsPerPage, totalProducts, paginate }) {
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    // No mostrar paginación si solo hay una página
    if (totalPages <= 1) return null;

    // Calcular qué páginas mostrar
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            // Mostrar todas las páginas
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Mostrar páginas con elipsis
            if (currentPage <= 3) {
                // Inicio
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                // Final
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                // Medio
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <PaginationContainer>
            {/* Botón Anterior */}
            <PaginationButton
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                $isNav={true}
                aria-label="Página anterior"
            >
                <FaChevronLeft /> <span className="d-none d-sm-inline">Anterior</span>
            </PaginationButton>

            {/* Números de página */}
            {pageNumbers.map((page, index) => {
                if (page === '...') {
                    return (
                        <PageInfo key={`ellipsis-${index}`}>
                            ...
                        </PageInfo>
                    );
                }

                return (
                    <PaginationButton
                        key={page}
                        onClick={() => paginate(page)}
                        $active={currentPage === page}
                        aria-label={`Ir a página ${page}`}
                        aria-current={currentPage === page ? 'page' : undefined}
                    >
                        {page}
                    </PaginationButton>
                );
            })}

            {/* Botón Siguiente */}
            <PaginationButton
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                $isNav={true}
                aria-label="Página siguiente"
            >
                <span className="d-none d-sm-inline">Siguiente</span> <FaChevronRight />
            </PaginationButton>
        </PaginationContainer>
    );
}

export default Pagination;
