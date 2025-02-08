// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-red-600 text-white py-6 mt-8">
            <div className="text-center mb-4">
                <p>© 2025 MyStore. All Rights Reserved.</p>
            </div>
            <div className="text-center space-x-4">
                <a href="#" className="hover:text-gray-200">Facebook</a>
                <a href="#" className="hover:text-gray-200">Instagram</a>
                <a href="#" className="hover:text-gray-200">Twitter</a>
            </div>
        </footer>
    );
}

export default Footer;
