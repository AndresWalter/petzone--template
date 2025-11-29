// src/components/SearchBar.jsx
import React from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import styled from 'styled-components';

const SearchContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 500px;
    margin: 0 auto 2rem;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 0.875rem 3rem 0.875rem 3rem;
    border: 2px solid rgba(99, 102, 241, 0.2);
    border-radius: 50px;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.1);

    &:focus {
        outline: none;
        border-color: rgba(99, 102, 241, 0.6);
        box-shadow: 0 6px 25px rgba(99, 102, 241, 0.2);
        transform: translateY(-2px);
    }

    &::placeholder {
        color: #9ca3af;
    }
`;

const SearchIcon = styled(FaSearch)`
    position: absolute;
    left: 1.2rem;
    top: 50%;
    transform: translateY(-50%);
    color: #6366f1;
    font-size: 1.1rem;
    pointer-events: none;
`;

const ClearButton = styled.button`
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    border-radius: 50%;

    &:hover {
        color: #ef4444;
        background: rgba(239, 68, 68, 0.1);
    }

    &:active {
        transform: translateY(-50%) scale(0.95);
    }
`;

function SearchBar({ searchTerm, setSearchTerm }) {
    const handleClear = () => {
        setSearchTerm('');
    };

    return (
        <SearchContainer>
            <SearchIcon />
            <SearchInput
                type="text"
                placeholder="Buscar productos por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Buscar productos"
            />
            {searchTerm && (
                <ClearButton
                    onClick={handleClear}
                    aria-label="Limpiar búsqueda"
                    type="button"
                >
                    <FaTimes />
                </ClearButton>
            )}
        </SearchContainer>
    );
}

export default SearchBar;
