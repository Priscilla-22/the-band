import React from 'react';
import { Link } from 'react-router-dom';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
}

interface ProductCardProps {
    product: Product;
    addToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
    return (
        <div className="bg-black text-white p-4 rounded-lg shadow-lg w-full sm:w-80 md:w-60 lg:w-48 m-4">
            <Link to={`/product/${product.id}`} className="block">
                <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-300 mb-4">{product.description}</p>
                <span className="text-xl font-bold">${product.price}</span>
            </Link>
            <button
                onClick={() => addToCart(product)}
                className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 w-full"
            >
                Add to Cart
            </button>
        </div>
    );
}

export default ProductCard;
