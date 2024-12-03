import { useState } from 'react';
import { Menu, Users, Calendar, MessageSquare, Key, LogOut, CircleUserRound, Scissors } from "lucide-react";
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import DropdownMenu from './ui/DropdownMenu';

const CMSNavbar = ({
    logoSrc,
    onPasswordChange,
    onLogout,
}) => {
    const navigate = useNavigate();

    const menuItems = [
        {
            label: 'Clients',
            onClick: () => navigate('/cms'),
            icon: <Users className="h-4 w-4" />,
        },
        {
            label: 'Bookings',
            onClick: () => navigate('/cms/bookings'),
            icon: <Calendar className="h-4 w-4" />,
        },
        {
            label: 'Contact Requests',
            onClick: () => navigate('/cms/contacts'),
            icon: <MessageSquare className="h-4 w-4" />,
        },
        {
            label: 'Haircuts',
            onClick: () => navigate('/cms/cuts'),
            icon: <Scissors className="h-4 w-4" />,
        },
        {
            label: 'Staff Management',
            onClick: () => navigate('/cms/staff'),
            icon: <CircleUserRound className="h-4 w-4" />,
        },
        {
            label: '-', // Separator
            className: 'border-t my-1',
        },
        {
            label: 'Change Password',
            onClick: onPasswordChange,
            icon: <Key className="h-4 w-4" />,
        },
        {
            label: 'Logout',
            onClick: onLogout,
            icon: <LogOut className="h-4 w-4" />,
            variant: 'destructive',
            className: 'text-red-600 hover:bg-red-50',
        },
    ];

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

                <DropdownMenu
                    items={menuItems}
                    align="right"
                    className="relative"
                    trigger={
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white bg-indigo-900 hover:bg-indigo-800"
                        >
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    }
                />
            </div>
        </nav>
    );
};

export default CMSNavbar;