import React from 'react';
import { Search, Filter, Plus } from 'lucide-react';

// Search bar header (searchbar, filter, add client button)
const ClientSearchBar = ({ searchQuery, setSearchQuery, onAddClick }) => {
    return (
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center flex-1 mr-4">
                <div className="relative flex-1 max-w-md">
                    <input
                        type="text"
                        placeholder="Search Clients"
                        className="w-full pl-10 pr-8 py-2 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-indigo-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    {searchQuery && (
                        <button
                            className="absolute right-10 top-2.5 text-gray-400 hover:text-gray-600"
                            onClick={() => setSearchQuery('')}
                        >
                            ×
                        </button>
                    )}
                </div>
            </div>

            <button
                onClick={onAddClick}
                className="bg-indigo-900 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-800 transition-colors"
            >
                <Plus className="h-5 w-5 mr-1" />
                Add Client
            </button>
        </div>
    );
};

export default ClientSearchBar;