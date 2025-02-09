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
    isProductListingPage?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isProductListingPage }) => {
    return (
        <div className={`p-4 rounded-lg shadow-lg w-full sm:w-80 md:w-60 lg:w-72 m-4 ${isProductListingPage ? 'bg-white text-black' : 'bg-black text-white'}`}>
            <Link to={`/product/${product.id}`} className="block">
                <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className={`text-sm mb-4 ${isProductListingPage ? 'text-gray-700' : 'text-gray-300'}`}>{product.description}</p>
                <span className="text-xl font-bold">${product.price}</span>
            </Link>
        </div>
    );
}

export default ProductCard;
