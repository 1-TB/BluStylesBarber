import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import ClientTable from './Components/ClientTable';
import ClientSearchBar from './Components/ClientSearchBar';
import LoadingOverlay from './Components/LoadingOverlay';
import EditClientModal from './Modals/EditClientModal';
import ClientInfoModal from './Modals/ClientInfoModal';
import AddClientModal from './Modals/AddClientModal';
import { Button } from './Components/ui/button';
import { Alert, AlertDescription } from './Components/ui/alert';
import ChangePasswordModal from "./Modals/PasswordChangeModel";
import darkLogo from "../../assets/images/blustyles_logo_dark.png"



const CMSHome = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [error, setError] = useState(null);
    const [clients, setClients] = useState([]);
    const [visitHistory, setVisitHistory] = useState([]);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    const { user, logout } = useAuth();
    const navigate = useNavigate();


    

    // Fetch clients from backend
    const fetchClients = async (search = '') => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/clients${search ? `?search=${search}` : ''}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    logout();
                    navigate('/login');
                    throw new Error('Session expired. Please login again.');
                }
                throw new Error('Failed to fetch clients');
            }

            const data = await response.json();
            setClients(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching clients:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchClients();
    }, []);

    // Search effect with debounce
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchClients(searchQuery);
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [searchQuery]);

    // Add Client
    const handleAddClient = async (newClient) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/clients', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newClient)
            });

            if (!response.ok) {
                throw new Error('Failed to add client');
            }

            const addedClient = await response.json();
            setClients(prevClients => [...prevClients, addedClient]);
            setIsAddModalOpen(false);
            setError(null);
        } catch (err) {
            setError('Failed to add client');
            console.error('Error adding client:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Edit Client
    const handleEditClick = (client) => {
        setSelectedClient(client);
        setIsEditModalOpen(true);
    };

    // Cancel Edit
    const handleEditCancel = () => {
        setIsEditModalOpen(false);
        setIsInfoModalOpen(true);
    };

    // Delete Client
    const handleDeleteClick = async (clientToDelete) => {
        if (window.confirm(`Are you sure you want to delete ${clientToDelete.name}?`)) {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/clients/${clientToDelete._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to delete client');
                }

                setClients(prevClients => 
                    prevClients.filter(client => client._id !== clientToDelete._id)
                );
                setIsInfoModalOpen(false);
                setError(null);
            } catch (err) {
                setError('Failed to delete client');
                console.error('Error deleting client:', err);
            } finally {
                setIsLoading(false);
            }
        }
    };

    // More Button Press
    const handleMoreClick = (client) => {
        setSelectedClient(client);
        setIsInfoModalOpen(true);
    };

    // Save Client
    const handleSaveClient = async (updatedClient) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/clients/${selectedClient._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedClient)
            });

            if (!response.ok) {
                throw new Error('Failed to update client');
            }

            const updated = await response.json();
            setClients(prevClients =>
                prevClients.map(client =>
                    client._id === selectedClient._id ? updated : client
                )
            );
            setIsEditModalOpen(false);
            setSelectedClient(null);
            setError(null);
        } catch (err) {
            setError('Failed to update client');
            console.error('Error updating client:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVisitHistory = async (client) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/clients/${client._id}/history`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch visit history');
            }
    
            const history = await response.json();
            setVisitHistory(history);
            setIsHistoryModalOpen(true);
        } catch (err) {
            setError('Failed to fetch visit history');
            console.error('Error fetching visit history:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle logout
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation Bar */}
            <nav className="bg-white border-b shadow-sm px-6 py-4">
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                    <div className="flex items-center">
                        <img 
                            src={darkLogo}
                            alt="BluStyles Logo" 
                            className="h-10 w-auto mr-4"
                        />
                        <h1 className="text-2xl font-bold text-indigo-900">
                            BLUSTYLES BARBERSHOP CMS
                        </h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button
                            onClick={() => setIsPasswordModalOpen(true)}
                            variant="outline"
                            className="flex items-center"
                        >
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                                />
                            </svg>
                            Change Password
                        </Button>
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="flex items-center text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                            Logout
                        </Button>
                    </div>
                </div>
            </nav>
    
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Error Alert */}
                {error && (
                    <Alert variant="destructive" className="mb-6 animate-in fade-in slide-in-from-top">
                        <AlertDescription className="flex items-center">
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            {error}
                        </AlertDescription>
                    </Alert>
                )}
    
                {/* Search and Add Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <ClientSearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        onAddClick={() => setIsAddModalOpen(true)}
                    />
                </div>
    
                {/* Table Section */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <ClientTable
                        clients={clients}
                        onEdit={handleEditClick}
                        onMoreClick={handleMoreClick}
                        isLoading={isLoading}
                    />
                </div>
    
                {/* Loading Overlay */}
                {isLoading && (
                    <LoadingOverlay>
                        <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mb-4"></div>
                            <p className="text-indigo-900 font-medium">Loading...</p>
                        </div>
                    </LoadingOverlay>
                )}
    
                {/* Modals */}
                <EditClientModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onCancel={handleEditCancel}
                    client={selectedClient}
                    onSave={handleSaveClient}
                />
    
                <ClientInfoModal
                    isOpen={isInfoModalOpen}
                    onClose={() => setIsInfoModalOpen(false)}
                    client={selectedClient}
                    onEdit={() => {
                        setIsInfoModalOpen(false);
                        setIsEditModalOpen(true);
                    }}
                    onDelete={handleDeleteClick}
                    onVisitHistory={handleVisitHistory}
                />
    
                <AddClientModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onAdd={handleAddClient}
                />
    
                <ChangePasswordModal
                    isOpen={isPasswordModalOpen}
                    onClose={() => setIsPasswordModalOpen(false)}
                />
            </main>

        </div>
    );
};

export default CMSHome;