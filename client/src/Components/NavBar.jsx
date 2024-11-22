import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Facebook } from 'lucide-react';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navigationItems = [
        { name: 'HOME', path: '/' },
        { name: 'OUR CUTS', path: '/our-cuts' },
        { name: 'BOOK NOW', path: '/booking' },
        { name: 'ABOUT', path: '/about' },
        { name: 'CONTACT US', path: '/contact' }
    ];

    return (
        <div className="relative">
            {/* Menu Button */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-black/30"
            >
                {isMenuOpen ? (
                    <X className="h-6 w-6" />
                ) : (
                    <Menu className="h-6 w-6" />
                )}
            </button>

            {/* Sliding Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-black p-8 transform transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                } z-50`}
            >
                <nav className="mt-12">
                    <ul className="space-y-4">
                        {navigationItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={item.path}
                                    className={`block w-full text-white hover:text-gray-300 transition-colors duration-200 ${
                                        location.pathname === item.path ? 'text-gray-300' : ''
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="absolute bottom-8 left-8">
                    <Facebook className="text-blue-400 hover:text-gray-300 cursor-pointer" size={24} />
                </div>
            </div>

            {/* Overlay */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}
        </div>
    );
};

export default NavBar;