import React from 'react';
import { X } from 'lucide-react';
import { Dialog } from '../Components/ui/dialog';
import { DialogContent } from '../Components/ui/dialog';
import { DialogHeader } from '../Components/ui/dialog';
import { DialogTitle } from '../Components/ui/dialog';
import { Button } from '../Components/ui/button';

// Modal for displaying client information
// Includes buttons: Visit history, edit, and delete
const ClientInfoModal = ({ isOpen, onClose, client, onEdit, onDelete, onVisitHistory }) => {
    if (!isOpen || !client) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-indigo-900">Client Information</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <div className="flex">
                            <span className="w-32 font-medium text-indigo-900">Name:</span>
                            <span className="text-gray-900">{client.name}</span>
                        </div>
                        <div className="flex">
                            <span className="w-32 font-medium text-indigo-900">Phone:</span>
                            <span className="text-gray-900">{client.phone}</span>
                        </div>
                        <div className="flex">
                            <span className="w-32 font-medium text-indigo-900">Email:</span>
                            <span className="text-gray-900">{client.email}</span>
                        </div>
                        <div className="flex">
                            <span className="w-32 font-medium text-indigo-900">Last Visit:</span>
                            <span className="text-gray-900">{client.lastVisit}</span>
                        </div>
                        <div className="flex">
                            <span className="w-32 font-medium text-indigo-900">Next Visit:</span>
                            <span className="text-gray-900">{client.nextVisit}</span>
                        </div>
                        <div className="flex">
                            <span className="w-32 font-medium text-indigo-900">Notes:</span>
                            <span className="text-gray-900">{client.notes || 'No notes available'}</span>
                        </div>
                    </div>

                    <div className="flex justify-between pt-4">
                        <Button
                            onClick={() => onVisitHistory(client)}
                            className="bg-indigo-900 hover:bg-indigo-800 text-white"
                        >
                            Visit History
                        </Button>
                        <Button
                            onClick={() => onEdit(client)}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Edit
                        </Button>
                        <Button
                            onClick={() => {
                                onDelete(client);
                                onClose();
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ClientInfoModal;