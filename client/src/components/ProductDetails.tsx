//src/components/ProductDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from "../config";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
}

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`${config.BASE_URL}/products/${id}`);
            const data = await response.json();
            setProduct(data);
        };

        fetchProduct();
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className="p-8">
            <img src={product.image_url} alt={product.name} className="w-full h-64 object-cover mb-4" />
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-xl text-gray-700 mb-4">{product.description}</p>
            <span className="text-2xl font-bold">${product.price}</span>
        </div>
    );
}

export default ProductDetailPage;
