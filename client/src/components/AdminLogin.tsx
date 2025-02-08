import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface AdminLoginProps {
    onSuccess: () => void; // Callback to close the modal on successful login
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();
            const token = data.token;

            // Save token to localStorage
            login(token);

            onSuccess(); // Close the modal on successful login
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;