import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../config';


interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
}

const ProductManagement: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/products`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                    },
                });
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (confirmDelete) {
            try {
                await axios.delete(`${config.BASE_URL}/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                    },
                });
                setProducts(products.filter((product) => product.id !== id));
            } catch (err) {
                alert('Failed to delete the product');
            }
        }
    };

    return (
        <div className="container mt-28">
            <h1 className="text-2xl font-bold mb-4">Product Management</h1>
            <Link to="/admin/product/create" className="text-white bg-blue-500 p-2 rounded mb-4 inline-block">Add New Product</Link>

            {loading ? (
                <p>Loading products...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border">ID</th>
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Price</th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td className="py-2 px-4 border">{product.id}</td>
                            <td className="py-2 px-4 border">{product.name}</td>
                            <td className="py-2 px-4 border">${product.price}</td>
                            <td className="py-2 px-4 border">
                                <Link to={`/admin/product/edit/${product.id}`} className="text-blue-500 mr-2">Edit</Link>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="text-red-500"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProductManagement;
