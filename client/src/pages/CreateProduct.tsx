import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config'; // Import config.js

// Define the product interface
interface ProductForm {
    name: string;
    description: string;
    price: number;
    image_url: string;
    ring_size_options: string[];
    finishing_options: string[];
    more_details: string;
}

const CreateProduct: React.FC = () => {
    const [product, setProduct] = useState<ProductForm>({
        name: '',
        description: '',
        price: 0,
        image_url: '',
        ring_size_options: [],
        finishing_options: [],
        more_details: '',
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'ring_size_options' | 'finishing_options') => {
        const { value } = e.target;
        const options = value.split(',').map((item) => item.trim());
        setProduct({ ...product, [field]: options });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`${config.BASE_URL}/products`, product, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                },
            });
            setLoading(false);
            navigate('/admin/products');
        } catch (err) {
            setLoading(false);
            setError('Failed to create product');
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Product</h1>

            <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg max-w-3xl mx-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="relative">
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            className="peer w-full p-4 border border-gray-300 rounded-lg bg-transparent text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-transparent"
                            placeholder="Product Name"
                            required
                        />
                        <label
                            htmlFor="name"
                            className="absolute left-4 top-4 text-gray-500 text-sm transition-all transform -translate-y-1/2 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:left-4"
                        >
                            Name
                        </label>
                    </div>

                    {/* Price Field */}
                    <div className="relative">
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            className="peer w-full p-4 border border-gray-300 rounded-lg bg-transparent text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-transparent"
                            placeholder="Product Price"
                            required
                        />
                        <label
                            htmlFor="price"
                            className="absolute left-4 top-4 text-gray-500 text-sm transition-all transform -translate-y-1/2 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:left-4"
                        >
                            Price
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Description Field */}
                    <div className="relative">
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            className="peer w-full p-4 border border-gray-300 rounded-lg bg-transparent text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-transparent"
                            rows={2}
                            placeholder="Brief description of the product"
                            required
                        />
                        <label
                            htmlFor="description"
                            className="absolute left-4 top-4 text-gray-500 text-sm transition-all transform -translate-y-1/2 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:left-4"
                        >
                            Description
                        </label>
                    </div>

                    {/* Image URL Field */}
                    <div className="relative">
                        <input
                            type="url"
                            name="image_url"
                            value={product.image_url}
                            onChange={handleChange}
                            className="peer w-full p-4 border border-gray-300 rounded-lg bg-transparent text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-transparent"
                            placeholder="Product Image URL"
                        />
                        <label
                            htmlFor="image_url"
                            className="absolute left-4 top-4 text-gray-500 text-sm transition-all transform -translate-y-1/2 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:left-4"
                        >
                            Image URL
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Ring Size Options Field */}
                    <div className="relative">
                        <input
                            type="text"
                            name="ring_size_options"
                            value={product.ring_size_options.join(', ')}
                            onChange={(e) => handleArrayChange(e, 'ring_size_options')}
                            className="peer w-full p-4 border border-gray-300 rounded-lg bg-transparent text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-transparent"
                            placeholder="E.g., 6, 7, 8"
                        />
                        <label
                            htmlFor="ring_size_options"
                            className="absolute left-4 top-4 text-gray-500 text-sm transition-all transform -translate-y-1/2 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:left-4"
                        >
                            Ring Size Options
                        </label>
                    </div>

                    {/* Finishing Options Field */}
                    <div className="relative">
                        <input
                            type="text"
                            name="finishing_options"
                            value={product.finishing_options.join(', ')}
                            onChange={(e) => handleArrayChange(e, 'finishing_options')}
                            className="peer w-full p-4 border border-gray-300 rounded-lg bg-transparent text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-transparent"
                            placeholder="E.g., Matte, Glossy"
                        />
                        <label
                            htmlFor="finishing_options"
                            className="absolute left-4 top-4 text-gray-500 text-sm transition-all transform -translate-y-1/2 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:left-4"
                        >
                            Finishing Options
                        </label>
                    </div>
                </div>

                {/* More Details Field */}
                <div className="relative">
                    <textarea
                        name="more_details"
                        value={product.more_details}
                        onChange={handleChange}
                        className="peer w-full p-4 border border-gray-300 rounded-lg bg-transparent text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-transparent"
                        rows={4}
                        placeholder="Any additional details?"
                    />
                    <label
                        htmlFor="more_details"
                        className="absolute left-4 top-4 text-gray-500 text-sm transition-all transform -translate-y-1/2 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:left-4"
                    >
                        More Details
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`w-full p-3 bg-gradient-to-r from-black to-red-600 text-white rounded-lg hover:bg-gradient-to-r hover:from-black hover:to-red-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Creating Product...' : 'Create Product'}
                </button>

                {/* Error Message */}
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            </form>
        </div>
    );
};

export default CreateProduct;
