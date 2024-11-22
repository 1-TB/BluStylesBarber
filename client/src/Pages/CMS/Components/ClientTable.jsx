import { MoreVertical, Info, Edit, History, Trash2 } from 'lucide-react';
import DropdownMenu from './ui/DropdownMenu';

const ClientTable = ({ 
    clients, 
    onInfoClick, 
    onEditClick, 
    onVisitHistoryClick, 
    onDeleteClick, 
    isLoading 
}) => {
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
                        {clients.map((client, index) => {
                            const dropdownItems = [
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

                            return (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-indigo-900">{client.name}</td>
                                    <td className="px-6 py-4 text-sm text-indigo-900">{client.phone}</td>
                                    <td className="px-6 py-4 text-sm text-indigo-900">{client.email}</td>
                                    <td className="px-6 py-4 text-sm text-indigo-900">{client.lastVisit}</td>
                                    <td className="px-6 py-4 text-sm text-indigo-900">{client.nextVisit}</td>
                                    <td className="px-6 py-4 text-right text-sm font-medium">
                                        <div className="flex justify-end">
                                            <DropdownMenu 
                                                items={dropdownItems}
                                                align="right"
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClientTable;