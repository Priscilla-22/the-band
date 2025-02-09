import React, { useState } from 'react';
import { useProductContext } from '../context/ProductContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Modal from './Modal';
import AdminLogin from './AdminLogin';

interface NavItem {
    name: string;
    path: string;
}

interface NavbarProps {
    cartCount: number;
}

const Navbar: React.FC<NavbarProps> = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const { cartCount } = useProductContext();
    const [cartAnimation, setCartAnimation] = useState<boolean>(false);
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location (path)

    // nav items
    const navItems: NavItem[] = [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'Offers', path: '/offers' },
        { name: 'About', path: '/about' },
    ];

    if (isAuthenticated) {
        navItems.push({ name: 'Dashboard', path: '/admin/dashboard' });
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    React.useEffect(() => {
        if (cartCount > 0) {
            setCartAnimation(true);
            setTimeout(() => setCartAnimation(false), 1000);
        }
    }, [cartCount]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const NavLink: React.FC<{ name: string; path: string }> = ({ name, path }) => (
        <li className="relative group">
            <a href={path} className="hover:text-gray-200 font-bold text-2xl mb-2 mr-8">{name}</a>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-1 group-hover:opacity-100 opacity-0 transition-all duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce200"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce400"></span>
            </div>
        </li>
    );

    // Check if the current page is the product listing page
    const isProductPage = location.pathname.includes('/products');

    return (
        <header
            className={`absolute top-0 left-0 w-full bg-black/40 text-white p-8 flex justify-between items-center z-50 font-delius ${isProductPage ? 'shadow-b-md shadow-gray-300' : ''}`}
        >
            {/* Logo Section */}
            <div className="flex items-center space-x-2">
                <img
                    src="/logo192.png"
                    alt="Logo"
                    className="w-10 h-10 bg-white"
                />
                <div className="text-xl font-bold">MyStore</div>
            </div>

            {/* Navigation Menu */}
            <nav className={`md:flex ${isMobileMenuOpen ? 'flex' : 'hidden'} space-x-8`}>
                <ul className="flex space-x-4">
                    {navItems.map((item) => (
                        <NavLink key={item.name} name={item.name} path={item.path} />
                    ))}
                </ul>
            </nav>

            {/* Cart & Mobile Menu */}
            <div className="flex items-center space-x-4">
                {/* Mobile Hamburger Menu */}
                <div className="md:hidden text-xl cursor-pointer" onClick={toggleMobileMenu}>
                    <i className="fas fa-bars"></i>
                </div>

                <div className="relative">
                    <div className="bg-black px-4 py-2 rounded-full">
                        <i className="fa fa-shopping-cart"></i>
                    </div>

                    {/* Cart Count (Inside the Cart Icon) */}
                    {cartCount > 0 && (
                        <span
                            className={`absolute top-0 right-0 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center ${cartAnimation ? 'animate-bounce' : ''}`}
                        >
                            {cartCount}
                        </span>
                    )}
                </div>

                {/* Login Button */}
                {!isAuthenticated ? (
                    <button
                        onClick={() => setIsLoginModalOpen(true)} // Open the login modal
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Login
                    </button>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                        Logout
                    </button>
                )}
            </div>

            {/* Login Modal */}
            <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
                <AdminLogin onSuccess={() => setIsLoginModalOpen(false)} />
            </Modal>
        </header>
    );
};

export default Navbar;
