import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import config from "../config";


interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
    ring_size_options: string[];
    finishing_options: string[];
    more_details: string;
}

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedSize, setSelectedSize] = useState<string>('Pick your size');
    const [selectedFinishing, setSelectedFinishing] = useState<string>('Shiny');
    const [quantity, setQuantity] = useState<number>(1);
    const { addToCart } = useProductContext();


    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`${config.BASE_URL}/api/products/${id}`);
            const data = await response.json();
            setProduct(data);
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity);
        }
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-detail-container p-10 mt-28">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Product Image and Gallery */}
                <div className="product-images col-span-2">
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-96 object-cover mb-4 rounded-lg shadow-lg"
                    />
                    <div className="image-gallery flex space-x-4">
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-20 object-cover rounded-lg shadow-md mb-4"
                        />
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-20 object-cover rounded-lg shadow-md mb-4"
                        />
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-20 object-cover rounded-lg shadow-md"
                        />
                    </div>

                    {/* More Details Section (Below Product Image and Information) */}
                    <div className="more-details mt-10 w-full justify-items-start">
                        <h2 className="text-3xl font-semibold text-gray-800">Detailed Information</h2>
                        <hr className="my-4 border-t-2 border-red-500 w-[160px]" />
                        <p className="text-lg text-gray-700 mt-4 text-left">{product.more_details}</p>
                    </div>
                </div>

                {/* Product Information */}
                <div className="product-info ml-20">
                    <h1 className="text-4xl font-semibold text-gray-800 text-start">{product.name}</h1>
                    <p className="text-lg text-gray-700 mt-4 text-start" >{product.description}</p>
                    <p className="text-2xl font-bold text-gray-800 mt-6 text-start">${product.price}</p>

                    {/* Size Selection */}
                    <div className="size-selection mt-6 flex items-center">
                        <label htmlFor="ring-size" className="block text-lg font-medium text-gray-700 mr-4">Ring Size</label>
                        <select
                            id="ring-size"
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            className="mt-2 p-3 border rounded-md w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            <option disabled>Pick your size</option>
                            {product.ring_size_options.map((size, index) => (
                                <option key={index} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>

                    {/* Finishing Selection */}
                    <div className="finishing-selection mt-6 flex items-center">
                        <label htmlFor="finishing" className="block text-lg font-medium text-gray-700 mr-4">Finishing</label>
                        <div className="flex space-x-4">
                            {product.finishing_options.map((finish, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedFinishing(finish)}
                                    className={`p-3 border rounded-full focus:outline-none focus:ring-2 transition-colors 
                            ${selectedFinishing === finish
                                        ? "bg-gradient-to-r from-red-600 to-black text-white"
                                        : "bg-white text-gray-700"}`}
                                >
                                    {finish}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="quantity-selector mt-6 flex items-center">
                        <label htmlFor="quantity" className="block text-lg font-medium text-gray-700 mr-4">Quantity</label>
                        <input
                            id="quantity"
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                            className="w-20 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                    </div>

                    {/* Add to Cart Button */}
                    <div className="mt-8">
                        <button
                            onClick={handleAddToCart}
                            className="bg-red-600 text-white py-3 px-6 rounded-lg w-full hover:bg-red-700 focus:outline-none"
                        >
                            Add to Cart
                        </button>
                    </div>

                    {/* Optional Guarantee & Rush Order */}
                    {/*<div className="mt-8 space-y-4">*/}
                    {/*    <div className="guarantee-option">*/}
                    {/*        <p className="text-lg text-gray-700">Extend Guarantee Time: <span className="font-semibold">$120</span></p>*/}
                    {/*        <button className="bg-gray-800 text-white py-2 px-4 rounded-md mt-2 hover:bg-gray-700">Add</button>*/}
                    {/*    </div>*/}
                    {/*    <div className="rush-order-option">*/}
                    {/*        <p className="text-lg text-gray-700">Rush Order: <span className="font-semibold">$50</span></p>*/}
                    {/*        <button className="bg-gray-800 text-white py-2 px-4 rounded-md mt-2 hover:bg-gray-700">Add</button>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/* Shipping & Guarantee Information */}
                    <div className="mt-20 flex space-x-6">
                        <div className="flex items-center space-x-2 border-r-2 pr-6">
                            <i className="fas fa-shield-alt text-gray-600"></i>
                            <span className="text-sm text-gray-600">Guarantee for 30 days</span>
                        </div>
                        <div className="flex items-center space-x-2 border-r-2 pr-6">
                            <i className="fas fa-box-open text-gray-600"></i>
                            <span className="text-sm text-gray-600">Shipped on Dec 24, 2023</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-gem text-gray-600"></i>
                            <span className="text-sm text-gray-600">Made-to-order jewelry</span>
                        </div>
                    </div>


                </div>
            </div>
        </div>

    );
};

export default ProductDetailPage;
