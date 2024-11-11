import React, { useState } from 'react';
import ClientTable from './Components/ClientTable';
import ClientSearchBar from './Components/ClientSearchBar';
import LoadingOverlay from './Components/LoadingOverlay';
import EditClientModal from './Modals/EditClientModal';
import ClientInfoModal from './Modals/ClientInfoModal';
import AddClientModal from './Modals/AddClientModal';

const CMSHome = () => {
    // States

    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [error, setError] = useState(null);
    // Temp hardcoded client info
    const [clients, setClients] = useState([{
        name: 'John Doe',
        phone: '(123)-123-1234',
        email: 'JohnD@gmail.com',
        lastVisit: '2-04-2023',
        nextVisit: '12-02-2024'
    },
    {
        name: 'John Bro',
        phone: '(123)-123-1234',
        email: 'JohnD@gmail.com',
        lastVisit: '2-04-2023',
        nextVisit: '12-02-2024'
    },
    {
        name: 'Jon Go',
        phone: '(123)-123-1234',
        email: 'JohnD@gmail.com',
        lastVisit: '2-04-2023',
        nextVisit: '12-02-2024'
    },
    {
        name: 'Dohn Joe',
        phone: '(123)-123-1234',
        email: 'JohnD@gmail.com',
        lastVisit: '2-04-2023',
        nextVisit: '12-02-2024'
    }]);


    // Handlers

    // Add Client
    const handleAddClient = (newClient) => {
        setIsLoading(true);
        try {
            // Add the new client to the existing clients
            setClients(prevClients => [...prevClients, newClient]);
            setIsAddModalOpen(false);
            console.log('Successfully added ', newClient);
        } catch (err) {
            setError('Failed to add client');
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
                const updatedClients = clients.filter(client =>
                    !(client.name === clientToDelete.name &&
                        client.phone === clientToDelete.phone &&
                        client.email === clientToDelete.email)
                );
                setClients(updatedClients);
                console.log('deleted ', clientToDelete.name);
            } catch (err) {
                setError('Failed to delete client');
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

    // Save Button Press
    const handleSaveClient = (updatedClient) => {
        setIsLoading(true);
        try {
            const updatedClients = clients.map(client =>
                client.name === selectedClient.name ? updatedClient : client
            );
            setClients(updatedClients);
            setIsEditModalOpen(false);
            setSelectedClient(null);
            console.log('Edit saved successfully. Info: ', updatedClient);
        } catch (err) {
            setError('Failed to update client');
        } finally {
            setIsLoading(false);
        }
    };

    // Client Visit History
    const handleVisitHistory = (client) => {
        // Placeholder for visit history in the database (if we add this)
        console.log('View visit history for:', client);
    };

    // Filter Clients (based off of search)
    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-none p-6">
                <h1 className="text-2xl font-bold text-center text-indigo-900 mb-6">
                    BLUSTYLES BARBERSHOP CLIENT MANAGEMENT
                </h1>

                <ClientSearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onAddClick={() => setIsAddModalOpen(true)}
                />

                <div className="flex-1 px-6 pb-6 overflow-hidden"> {/* Scrollable table section */}
                    <ClientTable
                        clients={filteredClients}
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