import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../config';
import { FaEllipsisV, FaEdit, FaTrashAlt } from 'react-icons/fa';
import Modal from '../components/Modal';

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
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [productToDelete, setProductToDelete] = useState<number | null>(null);

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

    const handleDelete = async () => {
        if (productToDelete === null) return;

        try {
            await axios.delete(`${config.BASE_URL}/products/${productToDelete}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                },
            });
            setProducts(products.filter((product) => product.id !== productToDelete));
            setShowModal(false);
        } catch (err) {
            alert('Failed to delete the product');
            setShowModal(false);
        }
    };

    const toggleDropdown = (id: number) => {
        setOpenDropdown(openDropdown === id ? null : id);
    };

    return (
        <div className="container mt-28">
            <h1 className="text-2xl font-bold mb-4">Product Management</h1>
            <Link to="/admin/create-product" className={`w-full p-3 mb-10 bg-gradient-to-r from-black to-red-600 text-white rounded-lg hover:bg-gradient-to-r hover:from-black hover:to-red-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                Add New Product
            </Link>

            {loading ? (
                <p>Loading products...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <table className="min-w-full bg-white shadow-md rounded-lg mt-10">
                    <thead className="bg-black text-white">
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
                                {/* 3-Dots Button */}
                                <div className="relative">
                                    <button
                                        className="text-gray-500 hover:text-gray-700"
                                        onClick={() => toggleDropdown(product.id)}
                                    >
                                        <FaEllipsisV className="text-xl" />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {openDropdown === product.id && (
                                        <div className="absolute right-0 w-40 mt-2 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                                            <ul className="py-1">
                                                {/* Edit Option */}
                                                <li className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                                                    <Link to={`/admin/edit-product/${product.id}`} className="flex items-center w-full">
                                                        <FaEdit className="mr-2 text-blue-500" />
                                                        Edit
                                                    </Link>
                                                </li>

                                                {/* Delete Option */}
                                                <li
                                                    className="flex items-center px-4 py-2 text-sm text-red-500 hover:bg-gray-100 cursor-pointer"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setProductToDelete(product.id);
                                                        setShowModal(true);
                                                    }}
                                                >
                                                    <FaTrashAlt className="mr-2" />
                                                    Delete
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {/* Modal for Delete Confirmation */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <div>
                    <h3 className="text-lg font-semibold text-gray-700">Are you sure you want to delete this product?</h3>
                    <div className="mt-4 flex justify-end space-x-4">
                        <button
                            className="bg-gray-200 px-4 py-2 rounded-md text-sm"
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-red-600 text-white px-4 py-2 rounded-md text-sm"
                            onClick={handleDelete}
                        >
                            Confirm Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ProductManagement;
