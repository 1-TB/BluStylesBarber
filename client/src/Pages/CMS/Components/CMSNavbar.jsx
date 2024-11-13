import { useState } from 'react';
import { Menu, Users, Calendar, MessageSquare, Key, LogOut } from "lucide-react";
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const CMSNavbar = ({
    logoSrc,
    onPasswordChange,
    onLogout,
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 left-0 right-0 bg-indigo-900 border-b shadow-sm px-4 md:px-6 py-3 md:py-4 z-50">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center">
                    <img
                        src={logoSrc}
                        alt="BluStyles Logo"
                        className="h-8 md:h-10 w-auto mr-3 md:mr-4"
                    />
                    <h1 className="text-xl md:text-2xl font-bold text-white truncate">
                        BLUSTYLES CMS
                    </h1>
                </div>

                {/* Hamburger Menu */}
                <div className="relative">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-indigo-800"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Open menu</span>
                    </Button>

                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1" role="menu">
                                {/* Main Management Options */}
                                <button
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => {
                                        navigate('/cms');
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    <Users className="mr-2 h-4 w-4" />
                                    <span>Clients</span>
                                </button>

                                <button
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => {
                                        navigate('/cms/bookings');
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    <Calendar className="mr-2 h-4 w-4" />
                                    <span>Bookings</span>
                                </button>

                                <button
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => {
                                        navigate('/cms/contacts');
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    <span>Contact Requests</span>
                                </button>

                                <hr className="my-1" />

                                {/* Account Options */}
                                <button
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => {
                                        onPasswordChange();
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    <Key className="mr-2 h-4 w-4" />
                                    <span>Change Password</span>
                                </button>

                                <button
                                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    onClick={() => {
                                        onLogout();
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default CMSNavbar;