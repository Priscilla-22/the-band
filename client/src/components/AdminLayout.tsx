import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // Import the Sidebar component

const AdminLayout: React.FC = () => {
    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-8 mt-20">
                <Outlet /> {/* This will render the nested routes */}
            </div>
        </div>
    );
};

export default AdminLayout;