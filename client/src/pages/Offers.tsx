import React from 'react';
import { Link } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
}

const OfferPage: React.FC = () => {
    const { products } = useProductContext();

    const getSimulatedDiscount = (product: Product): number => {

        if (product.price > 100) {
            return 10;
        }

        if (product.price < 50) {
            return 20;
        }

        return 0;
    };


    const productsWithDiscounts = products.map((product) => ({
        ...product,
        discount: getSimulatedDiscount(product),
    }));

    // Filter products with discounts
    const discountedProducts = productsWithDiscounts.filter((product) => product.discount && product.discount > 0);

    return (
        <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('/images/redbottom.jpg')` }}>

            {/* Content Container */}
            <div className="relative container mx-auto p-8 mt-28 z-10">

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-600">Special Offers</h1>
                    <p className="text-gray-800 font-cursive mt-2">Explore our exclusive deals and discounts!</p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {discountedProducts.map((product) => (
                        <div key={product.id} className="bg-black text-white p-4 rounded-lg shadow-lg relative">
                            {/* Discount Badge */}
                            {product.discount && (
                                <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                                    {product.discount}% OFF
                                </div>
                            )}

                            {/* Product Image */}
                            <Link to={`/product/${product.id}`} className="block">
                                <img
                                    src={product.image_url}
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                />
                            </Link>

                            {/* Product Details */}
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p className="text-sm text-gray-300 mb-4">{product.description}</p>

                            {/* Price Section */}
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-bold">
                                    ${(product.price * (1 - (product.discount || 0) / 100)).toFixed(2)}
                                </span>
                                {product.discount && (
                                    <span className="text-sm text-gray-400 line-through">${product.price}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Offers Message */}
                {discountedProducts.length === 0 && (
                    <div className="text-center text-gray-400 mt-12">
                        <p>No special offers available at the moment. Check back later!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OfferPage;
