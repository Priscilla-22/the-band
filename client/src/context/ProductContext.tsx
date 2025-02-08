// src/context/ProductContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
}

interface ProductContextType {
    products: Product[];
    addToCart: (product: Product) => void;
    cartCount: number;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [cartCount, setCartCount] = useState<number>(0);

    // Fetch products from the backend API
    useEffect(() => {
        axios.get('http://localhost:5000/api/products') // Make sure this matches your Flask API
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const addToCart = (product: Product) => {
        setCartCount(cartCount + 1);
        alert(`${product.name} added to cart!`);
    };

    return (
        <ProductContext.Provider value={{ products, addToCart, cartCount }}>
            {children}
        </ProductContext.Provider>
    );
};

// Custom hook to use the ProductContext
export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
};
