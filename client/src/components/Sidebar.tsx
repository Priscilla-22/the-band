import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div className="bg-gray-800 text-white w-64 min-h-screen p-4 mt-28">
            <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
            <ul>
                <li>
                    <Link to="/admin/dashboard" className="block py-2 px-4 rounded hover:bg-gray-600">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/admin/products" className="block py-2 px-4 rounded hover:bg-gray-600">
                        Product Management
                    </Link>
                </li>
                <li>
                    <Link to="/admin/create-product" className="block py-2 px-4 rounded hover:bg-gray-600">
                        Create Product
                    </Link>
                </li>
                {/*<li>*/}
                {/*    <Link to="/admin/orders" className="block py-2 px-4 rounded hover:bg-gray-600">*/}
                {/*        Orders*/}
                {/*    </Link>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*    <Link to="/admin/customers" className="block py-2 px-4 rounded hover:bg-gray-600">*/}
                {/*        Customers*/}
                {/*    </Link>*/}
                {/*</li>*/}
            </ul>
        </div>
    );
};

export default Sidebar;