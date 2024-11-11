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
        <div className="flex flex-col h-screen">
            <div className="flex-none p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-indigo-900">
                        BLUSTYLES BARBERSHOP CLIENT MANAGEMENT
                    </h1>
                    <Button 
                        onClick={handleLogout}
                        variant="outline"
                        className="ml-4"
                    >
                        Logout
                    </Button>
                </div>

                {error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <ClientSearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onAddClick={() => setIsAddModalOpen(true)}
                />

                <div className="flex-1 px-6 pb-6 overflow-hidden">
                    <ClientTable
                        clients={clients}
                        onEdit={handleEditClick}
                        onMoreClick={handleMoreClick}
                        isLoading={isLoading}
                    />
                </div>

                {isLoading && <LoadingOverlay />}

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
            </div>
        </div>
    );
};

export default CMSHome;