import { MoreVertical, Info, Edit, History, Trash2 } from 'lucide-react';
import DropdownMenu from './ui/DropdownMenu';

const ClientTable = ({ 
    clients, 
    onInfoClick, 
    onEditClick, 
    onVisitHistoryClick, 
    onDeleteClick, 
    isLoading,
    isMobileView 
}) => {
    const dropdownItems = (client) => [
        {
            label: 'Client Info',
            onClick: () => onInfoClick(client),
            icon: <Info className="h-4 w-4" />,
            className: 'text-indigo-600 hover:bg-indigo-50',
        },
        {
            label: 'Edit Client',
            onClick: () => onEditClick(client),
            icon: <Edit className="h-4 w-4" />,
            className: 'text-blue-600 hover:bg-blue-50',
        },
        {
            label: 'Visit History',
            onClick: () => onVisitHistoryClick(client),
            icon: <History className="h-4 w-4" />,
            className: 'text-indigo-600 hover:bg-indigo-50',
        },
        {
            label: 'Delete',
            onClick: () => onDeleteClick(client),
            icon: <Trash2 className="h-4 w-4" />,
            variant: 'destructive',
        },
    ];

    if (isMobileView) {
        return (
            <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col h-[600px]">
                <div className="overflow-y-auto">
                    {clients.map((client, index) => (
                        <div key={index} className="border-b border-gray-200 p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div className="font-semibold text-indigo-900">{client.name}</div>
                                <DropdownMenu 
                                    items={dropdownItems(client)}
                                    align="right"
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Phone:</span>
                                    <span className="text-indigo-900">{client.phone}</span>
                                </div>
                                {client.email && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Email:</span>
                                        <span className="text-indigo-900">{client.email}</span>
                                    </div>
                                )}
                                {client.lastVisit && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Last Visit:</span>
                                        <span className="text-indigo-900">{client.lastVisit}</span>
                                    </div>
                                )}
                                {client.nextVisit && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Next Visit:</span>
                                        <span className="text-indigo-900">{client.nextVisit}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col h-[600px]">
            <div className="overflow-y-auto">
                <table className="min-w-full">
                    <thead className="bg-indigo-100 sticky top-0">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-900">
                                Name<span className="text-red-500">*</span>
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-900">
                                Phone<span className="text-red-500">*</span>
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-900">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-900">
                                Last Visit
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-900">
                                Next Visit
                            </th>
                            <th className="px-6 py-3 text-right text-sm font-semibold text-indigo-900">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {clients.map((client, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-indigo-900">{client.name}</td>
                                <td className="px-6 py-4 text-sm text-indigo-900">{client.phone}</td>
                                <td className="px-6 py-4 text-sm text-indigo-900">{client.email}</td>
                                <td className="px-6 py-4 text-sm text-indigo-900">{client.lastVisit}</td>
                                <td className="px-6 py-4 text-sm text-indigo-900">{client.nextVisit}</td>
                                <td className="px-6 py-4 text-right text-sm font-medium">
                                    <div className="flex justify-end">
                                        <DropdownMenu 
                                            items={dropdownItems(client)}
                                            align="right"
                                            disabled={isLoading}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClientTable;