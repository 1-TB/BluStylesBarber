import React from 'react';
import { MoreVertical } from 'lucide-react';

// Client information table and mapping
const ClientTable = ({ clients, onMoreClick, isLoading }) => {
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
                                More
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
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            className="text-gray-600 hover:text-gray-900"
                                            onClick={() => onMoreClick(client)}
                                        >
                                            <MoreVertical className="h-5 w-5" />
                                        </button>
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