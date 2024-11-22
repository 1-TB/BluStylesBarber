import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '../Components/ui/dialog';
import { Button } from '../Components/ui/button';
import {
    Calendar,
    Clock,
    User,
    Phone,
    Mail,
    FileText,
    History,
    Pencil,
    Trash2
} from 'lucide-react';


const DialogFooter = ({ children, className = '' }) => (
    <div className={`flex flex-col-reverse sm:flex-row sm:justify-between space-y-2 space-y-reverse sm:space-y-0 sm:space-x-2 ${className}`}>
        {children}
    </div>
);

const InfoRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-center py-2 border-b border-gray-100 last:border-0">
        <Icon className="h-4 w-4 text-gray-500 mr-2" />
        <span className="w-24 font-medium text-gray-600">{label}:</span>
        <span className="text-gray-900 flex-1">{value}</span>
    </div>
);

const ClientInfoModal = ({
    isOpen,
    onClose,
    client,
    onEdit,
    onDelete,
    onVisitHistory
}) => {
    if (!isOpen || !client) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-indigo-900">
                        Client Information
                    </DialogTitle>
                </DialogHeader>

                <div className="py-4">
                    <div className="space-y-1">
                        <InfoRow
                            icon={User}
                            label="Name"
                            value={client.name}
                        />
                        <InfoRow
                            icon={Phone}
                            label="Phone"
                            value={client.phone}
                        />
                        <InfoRow
                            icon={Mail}
                            label="Email"
                            value={client.email}
                        />
                        <InfoRow
                            icon={Calendar}
                            label="Last Visit"
                            value={client.lastVisit || 'Not available'}
                        />
                        <InfoRow
                            icon={Clock}
                            label="Next Visit"
                            value={client.nextVisit || 'Not scheduled'}
                        />
                        <div className="flex items-start py-2 border-b border-gray-100 last:border-0">
                            <FileText className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                            <span className="w-24 font-medium text-gray-600">Notes:</span>
                            <span className="text-gray-900 flex-1">
                                {client.notes || 'No notes available'}
                            </span>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        onClick={() => onVisitHistory(client)}
                        variant="outline"
                        className="text-indigo-600 hover:bg-indigo-50"
                    >
                        <History className="h-4 w-4 mr-2" />
                        Visit History
                    </Button>
                    <div className="flex space-x-2">
                        <Button
                            onClick={() => onEdit(client)}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                        </Button>
                        <Button
                            onClick={() => {
                                onDelete(client);
                                onClose();
                            }}
                            variant="destructive"
                            className="bg-red-600 hover:bg-red-700"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ClientInfoModal;