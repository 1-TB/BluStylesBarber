// Components/MSC/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar';
import logoTransparent from '../../assets/images/blustyles_logo_transparent.png';
import Footer from "../Footer";
import {Link} from "react-router-dom"

const Layout = () => {
    return (
        <div className="relative min-h-screen bg-black text-white">
            {/* Header with Logo and Icons */}
            <header className="absolute top-0 left-0 right-0 z-50 p-4">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <Link to="">
                    <div className="w-20 h-20 md:w-24 md:h-24">
                        <img
                            src={logoTransparent}
                            alt="Blu Styles Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    </Link>
                    <div className="flex items-center">
                        <NavBar />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <Outlet />
            <Footer />
        </div>

    );
};

export default Layout;