import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';  // Import useNavigate and useParams
import config from '../config'; // Import config.js

const EditProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();  // Use useNavigate hook

    const [product, setProduct] = useState({
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

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                    },
                });
                setProduct(response.data);
            } catch (err) {
                setError('Failed to fetch product');
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
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

    return (
        <div className="container">
            <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

            <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded">
                {/* Form fields pre-filled with product data */}
                {/* Similar to CreateProduct form */}

                <button
                    type="submit"
                    className={`p-2 bg-blue-500 text-white rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
