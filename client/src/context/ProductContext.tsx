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

interface CartItem {
    product: Product;
    quantity: number;
}

interface ProductContextType {
    products: Product[];
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (productId: number) => void;
    cartItems: CartItem[];
    cartCount: number;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cartCount, setCartCount] = useState<number>(0);

    // Fetch products from the backend API
    useEffect(() => {
        axios.get('http://localhost:5000/api/products') // Ensure this matches your Flask API
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const addToCart = (product: Product, quantity: number) => {
        const existingItemIndex = cartItems.findIndex(item => item.product.id === product.id);

        if (existingItemIndex !== -1) {
            // Update the quantity if the product is already in the cart
            const updatedItems = [...cartItems];
            updatedItems[existingItemIndex].quantity += quantity;
            setCartItems(updatedItems);
        } else {
            // Add a new item to the cart
            setCartItems([...cartItems, { product, quantity }]);
        }
        setCartCount(cartCount + quantity);
    };

    const removeFromCart = (productId: number) => {
        const updatedItems = cartItems.filter(item => item.product.id !== productId);
        setCartItems(updatedItems);
        setCartCount(updatedItems.reduce((total, item) => total + item.quantity, 0));
    };

    return (
        <ProductContext.Provider value={{ products, addToCart, removeFromCart, cartItems, cartCount }}>
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
