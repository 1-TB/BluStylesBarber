import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Pages/CMS/AuthContext";
import CMSNavbar from "../../Pages/CMS/Components/CMSNavbar";
import logoTransparent from '../../assets/images/blustyles_logo_transparent.png';
import ChangePasswordModal from "../../Pages/CMS/Modals/PasswordChangeModel";

const CMSLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    return (
        <>
            <CMSNavbar
                logoSrc={logoTransparent}
                onPasswordChange={() => setIsPasswordModalOpen(true)}
                onLogout={() => {
                    logout();
                    navigate('/login');
                }}
            />
            <Outlet />

            <ChangePasswordModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
            />
        </>
    );
};

export default CMSLayout;