import React, { useEffect, useState } from 'react';

const AdminDashboard: React.FC = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const token = localStorage.getItem('auth_token'); // Get token from localStorage
                if (!token) {
                    setMessage('Access denied. Please log in.');
                    return;
                }

                const response = await fetch('http://localhost:5000/admin/dashboard', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,  // Send the token in the Authorization header
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setMessage(data.message);
                } else {
                    setMessage('Access denied. Please log in.');
                }
            } catch (err) {
                setMessage('Error fetching dashboard data.');
            }
        };


        fetchDashboard();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="mt-4">{message}</p>
        </div>
    );
};

export default AdminDashboard;
