// Components/MSC/Layout.jsx
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import NavBar from '../NavBar';
import logoTransparent from '../../assets/images/blustyles_logo_transparent.png';
import Footer from "../Footer";

const Layout = () => {
    const location = useLocation();
    const isCMSPage = location.pathname.includes('/cms');

    return (
        <div className="relative min-h-screen bg-black text-white">
            {/* Header with Logo and Icons - Hidden on CMS pages */}
            {!isCMSPage && (
                <header className="absolute top-0 left-0 right-0 z-50 p-4">
                    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="w-20 h-20 md:w-24 md:h-24">
                            <Link to={""}>
                                <img
                                    src={logoTransparent}
                                    alt="Blu Styles Logo"
                                    className="w-full h-full object-contain"
                                />
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <NavBar />
                        </div>
                    </div>
                </header>
            )}
            {/* Main Content */}
            <Outlet />
            {/* Footer - Hidden on CMS pages */}
            {!isCMSPage && <Footer />}
        </div>
    );
};

export default Layout;