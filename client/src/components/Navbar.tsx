import React, { useState } from 'react';

// Type for each navigation item
interface NavItem {
    name: string;
    path: string;
}

interface NavbarProps {
    cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Navigation items
    const navItems: NavItem[] = [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'Offers', path: '/offers' },
        { name: 'About', path: '/about' }
    ];

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Reusable component for each nav item with bouncing dots on hover
    const NavLink: React.FC<{ name: string; path: string }> = ({ name, path }) => (
        <li className="relative group">
            <a href={path} className="hover:text-gray-200 mb-2">{name}</a>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-1 group-hover:opacity-100 opacity-0 transition-all duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce200"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce400"></span>
            </div>
        </li>
    );

    return (
        <header className="absolute top-0 left-0 w-full bg-black/40 text-white p-4 flex justify-between items-center z-50">
            {/* Logo Section */}
            <div className="flex items-center space-x-2">
                <img
                    src="/logo192.png"  // Public folder path
                    alt="Logo"
                    className="w-10 h-10"
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
                    <i className="fas fa-bars"></i> {/* Hamburger icon */}
                </div>

                <div className="relative">
                    <div className="bg-black px-4 py-2 rounded-full">
                        <i className="fa fa-shopping-cart"></i>
                    </div>

                    {/* Cart Count (Inside the Cart Icon) */}
                    {cartCount > 0 && (
                        <span className="absolute top-0 right-0 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
