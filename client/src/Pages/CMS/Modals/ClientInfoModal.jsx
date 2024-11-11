import React from 'react';
import { X } from 'lucide-react';

// Modal for displaying client information
// Includes buttons: Visit history, edit, and delete
const ClientInfoModal = ({ isOpen, onClose, client, onEdit, onDelete, onVisitHistory }) => {
    if (!isOpen || !client) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-100 rounded-lg w-full max-w-md p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                    <X className="h-6 w-6" />
                </button>
                <h2 className="text-xl font-bold text-indigo-900 mb-6">
                    CLIENT INFORMATION
                </h2>

                <div className="space-y-4">
                    <div className="flex">
                        <span className="w-32 text-indigo-900 font-medium">Name:</span>
                        <span className="text-blue-600">{client.name}</span>
                    </div>

                    <div className="flex">
                        <span className="w-32 text-indigo-900 font-medium">Phone:</span>
                        <span className="text-blue-600">{client.phone}</span>
                    </div>

                    <div className="flex">
                        <span className="w-32 text-indigo-900 font-medium">Email:</span>
                        <span className="text-blue-600">{client.email}</span>
                    </div>

                    <div className="flex">
                        <span className="w-32 text-indigo-900 font-medium">Last Visit:</span>
                        <span className="text-blue-600">{client.lastVisit}</span>
                    </div>

                    <div className="flex">
                        <span className="w-32 text-indigo-900 font-medium">Next Visit:</span>
                        <span className="text-blue-600">{client.nextVisit}</span>
                    </div>

                    <div className="flex">
                        <span className="w-32 text-indigo-900 font-medium">Notes:</span>
                        <span className="text-blue-600">{client.notes || 'No notes available'}</span>
                    </div>
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        onClick={() => onVisitHistory(client)}
                        className="bg-indigo-900 text-white px-4 py-2 rounded-lg hover:bg-indigo-800 transition-colors"
                    >
                        Visit History
                    </button>
                    <button
                        onClick={() => onEdit(client)}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => {
                            onDelete(client);
                            onClose();
                        }}
                        className="bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-900 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClientInfoModal;