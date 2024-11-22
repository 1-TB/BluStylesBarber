import React, { useState } from 'react';
import { Menu, X, Facebook } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavigation = (path) => {
        console.log('Navigating to:', path); // Debug log
        setIsMenuOpen(false);
        navigate(path);
    };

    const navigationItems = [
        { name: 'HOME', path: '/' },
        { name: 'OUR CUTS', path: '/our-cuts' },
        { name: 'BOOK NOW', path: '/booking' },
        { name: 'ABOUT', path: '/about' },
        { name: 'CONTACT US', path: '/contact' }
    ];

    return (
        <div className="relative">
            <button
                onClick={toggleMenu}
                className="fixed top-4 right-4 z-50 p-2 rounded-lg hover:bg-gray-100"
            >
                {isMenuOpen ? (
                    <X className="h-6 w-6" />
                ) : (
                    <Menu className="h-6 w-6" />
                )}
            </button>

            <div
                className={`fixed top-0 right-0 h-full w-64 bg-black p-8 transform transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                } z-40`}
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
                    <Facebook className="text-white hover:text-gray-300 cursor-pointer" size={24} />
                </div>
            </div>

            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}
        </div>
    );
};

export default NavBar;