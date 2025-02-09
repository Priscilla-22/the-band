import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import config from '../config';

const EditProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,
        image_url: '',
        ring_size_options: '',
        finishing_options: '',
        more_details: '',
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [imagePreview, setImagePreview] = useState<string>(''); // State to store the image preview URL

    // Fetch product data based on the ID from the URL
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                    },
                });
                setProduct(response.data);
                setImagePreview(response.data.image_url); // Set the initial image preview
                setLoading(false); // Set loading to false once data is fetched
            } catch (err) {
                setError('Failed to fetch product');
                setLoading(false); // Stop loading on error
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });

        // If the field is 'image_url', update the image preview as well
        if (name === 'image_url') {
            setImagePreview(value); // Update the image preview
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await axios.put(`${config.BASE_URL}/products/${id}`, product, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                },
            });
            setLoading(false);
            navigate('/admin/products'); // Redirect to the product list after updating
        } catch (err) {
            setLoading(false);
            setError('Failed to update product');
        }
    };

    // If loading, show a loading spinner
    if (loading) {
        return <p>Loading...</p>;
    }

    // If there's an error, display it
    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="container">
            <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

            <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded">
                {/* Form fields pre-filled with product data */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="ring_size_options" className="block text-sm font-medium text-gray-700">Ring Size Options</label>
                        <input
                            type="text"
                            id="ring_size_options"
                            name="ring_size_options"
                            value={product.ring_size_options}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="e.g., 5, 6, 7, 8"
                        />
                    </div>

                    <div>
                        <label htmlFor="finishing_options" className="block text-sm font-medium text-gray-700">Finishing Options</label>
                        <input
                            type="text"
                            id="finishing_options"
                            name="finishing_options"
                            value={product.finishing_options}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="e.g., Glossy, Matte"
                        />
                    </div>

                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Image URL and Preview */}
                    <div>
                        <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">Image URL</label>
                        <input
                            type="text"
                            id="image_url"
                            name="image_url"
                            value={product.image_url}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter image URL"
                        />
                    </div>

                    {imagePreview && (
                        <div className="mt-4">
                            <h3 className="text-sm font-medium text-gray-700">Image Preview</h3>
                            <img src={imagePreview} alt="Product Preview" className="mt-2 w-full max-h-96 object-contain border border-gray-300 rounded-md" />
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className={`mt-20 p-2 bg-gradient-to-r from-black to-red-600 text-white rounded-lg hover:bg-gradient-to-r hover:from-black hover:to-red-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update Product'}
                </button>

                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default EditProduct;
