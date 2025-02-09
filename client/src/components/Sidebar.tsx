import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaBox, FaPlusCircle } from 'react-icons/fa';

const Sidebar: React.FC = () => {
    return (
        <div className="bg-gray-800  text-white w-64 min-h-screen p-6 mt-28 shadow-lg rounded-2xl">
            <h2 className="text-2xl font-bold mb-6">
                <span className="bg-gradient-to-r from-black to-red-600 bg-clip-text text-transparent">
                    Admin Panel
                </span>
            </h2>
            <ul>
                <li className="mb-4">
                    <Link
                        to="/admin/dashboard"
                        className="flex items-center py-2 px-4 rounded-lg hover:bg-gradient-to-r hover:from-black hover:to-red-600 transition duration-300"
                    >
                        <FaTachometerAlt className="mr-3 text-xl text-gray-300" />
                        <span className="text-lg">Dashboard</span>
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/admin/products"
                        className="flex items-center py-2 px-4 rounded-lg hover:bg-gradient-to-r hover:from-black hover:to-red-600 transition duration-300"
                    >
                        <FaBox className="mr-3 text-xl text-gray-300" />
                        <span className="text-lg">Product Management</span>
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/admin/create-product"
                        className="flex items-center py-2 px-4 rounded-lg hover:bg-gradient-to-r hover:from-black hover:to-red-600 transition duration-300"
                    >
                        <FaPlusCircle className="mr-3 text-xl text-gray-300" />
                        <span className="text-lg">Create Product</span>
                    </Link>
                </li>
                {/* Uncomment and modify as needed */}
                {/*<li className="mb-4">
                    <Link
                        to="/admin/orders"
                        className="flex items-center py-2 px-4 rounded-lg hover:bg-gradient-to-r hover:from-black hover:to-red-600 transition duration-300"
                    >
                        <FaShoppingCart className="mr-3 text-xl text-gray-300" />
                        <span className="text-lg">Orders</span>
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/admin/customers"
                        className="flex items-center py-2 px-4 rounded-lg hover:bg-gradient-to-r hover:from-black hover:to-red-600 transition duration-300"
                    >
                        <FaUsers className="mr-3 text-xl text-gray-300" />
                        <span className="text-lg">Customers</span>
                    </Link>
                </li>*/}
            </ul>
        </div>
    );
};

export default Sidebar;
