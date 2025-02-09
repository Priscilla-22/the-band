import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-900 via-gray-700 to-black text-white py-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column - Company Info */}
                    <div className="font-delius">
                        <img
                            src="/logo192.png"
                            alt="MyStore Logo"
                            className="w-32 h-auto bg-gray-400 p-3 rounded-3xl" // You can adjust the width and height here
                        />
                        <p className="text-sm mt-3 font-delius">Subscribe to our newsletter for updates on our latest products, offers, and more.</p>
                    </div>

                    {/* Center Column - Links */}
                    <div>
                        <h3 className="text-xl font-semibold font-delius mb-3">Links</h3>
                        <ul className="space-y-2 text-sm font-delius">
                            <li><a href="/home" className="hover:text-gray-300">Home</a></li>
                            <li><a href="/services" className="hover:text-gray-300">Services</a></li>
                            <li><a href="/about" className="hover:text-gray-300">About Us</a></li>
                            <li><a href="/features" className="hover:text-gray-300">Features</a></li>
                            <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
                        </ul>
                    </div>

                    {/* Right Column - Newsletter & Social Media */}
                    <div>
                        <h3 className="text-xl font-semibold font-delius mb-3">Newsletter</h3>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="p-3 rounded-l-md w-64 focus:outline-none font-delius"
                            />
                            <button className="bg-red-600 text-white p-3 rounded-r-md hover:bg-red-700 focus:outline-none font-delius">
                                Subscribe
                            </button>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-xl font-semibold mb-3 font-delius">Follow Us</h3>
                            <div className="flex space-x-4 font-delius">
                                <a href="#" className="text-white hover:text-gray-400">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" className="text-white hover:text-gray-400">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="#" className="text-white hover:text-gray-400">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#" className="text-white hover:text-gray-400">
                                    <i className="fab fa-youtube"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Horizontal Line in the center */}
                <div className="flex justify-center mt-6">
                    <div className="w-1/2 border-t-2 border-gray-600"></div> {/* Horizontal Line */}
                </div>

                {/* Footer Bottom - Copyright */}
                <div className="mt-6 flex justify-center items-center">
                    <div className="ml-6 text-sm font-delius">
                        <p>&copy; 2025 MyStore. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
