import { useState } from 'react';
import { Search, Filter, MoreVertical, Mail, User, Clock, MessageSquare } from 'lucide-react';
import { Button } from './Components/ui/button';

const ContactRequests = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // temp data
    const contacts = [
        {
            id: 1,
            name: "John Smith",
            email: "john@example.com",
            message: "I'm interested in learning more about your services and pricing.",
            status: "new", // new, read, responded
            createdAt: "2024-02-18T10:00:00",
            updatedAt: "2024-02-18T10:00:00"
        },
        {
            id: 2,
            name: "Cool Fella",
            email: "cool@example.com",
            message: "I'm a cool guy",
            status: "read", // new, read, responded
            createdAt: "2024-02-18T10:00:00",
            updatedAt: "2024-02-18T10:00:00"
        },

    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'new':
                return 'bg-blue-100 text-blue-800';
            case 'read':
                return 'bg-yellow-100 text-yellow-800';
            case 'responded':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto px-4 md:px-6 pt-28 md:pt-24 pb-6 md:pb-8">
                {/* Search and Filter Section */}
                <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-4 md:mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search contact requests..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button
                            variant="outline"
                            className="flex items-center gap-2 text-indigo-800"
                        >
                            <Filter className="h-4 w-4 text-indigo-800" />
                            Filter
                        </Button>
                    </div>
                </div>

                {/* Contact Requests List */}
                <div className="space-y-4">
                    {contacts.map((contact) => (
                        <div
                            key={contact.id}
                            className="bg-white rounded-lg shadow-sm p-4 md:p-6"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <User className="h-5 w-5 text-indigo-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {contact.name}
                                        </h3>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Mail className="h-4 w-4 mr-1" />
                                            {contact.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`px-3 py-1 rounded-full text-sm capitalize ${getStatusColor(contact.status)}`}>
                                        {contact.status}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                    >
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                <div className="flex items-start space-x-2">
                                    <MessageSquare className="h-4 w-4 text-gray-400 mt-1" />
                                    <p className="text-gray-700">{contact.message}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {new Date(contact.createdAt).toLocaleString()}
                                </div>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-gray-700"
                                    >
                                        Mark as Read
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="bg-indigo-600 text-white hover:bg-indigo-700"
                                    >
                                        Respond
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ContactRequests;