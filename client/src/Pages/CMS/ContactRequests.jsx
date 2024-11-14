import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from './Components/ui/button';
import ContactRequestCard from './Components/ContactRequestCard';
import ContactReplyModal from './Modals/ContactReplyModal';

const ContactRequests = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    // temp data
    const [contacts, setContacts] = useState([
        {
            id: 1,
            name: "John Smith",
            email: "john@example.com",
            message: "I'm interested in learning more about your services and pricing.",
            status: "new",
            createdAt: "2024-02-18T10:00:00",
            updatedAt: "2024-02-18T10:00:00"
        },
        {
            id: 2,
            name: "Cool Fella",
            email: "cool@example.com",
            message: "I'm a cool guy",
            status: "read",
            createdAt: "2024-02-18T10:00:00",
            updatedAt: "2024-02-18T10:00:00"
        },
    ]);

    // mark as read
    const handleMarkAsRead = (contactId) => {
        setContacts(contacts.map(contact =>
            contact.id === contactId
                ? { ...contact, status: 'read' }
                : contact
        ));
         // NOTE: connect backend
         console.log('Marking contact as read:', contactId);
    };

    // respond
    const handleRespond = (contact) => {
        setSelectedContact(contact);
        setIsReplyModalOpen(true);
    };

    // status change
    const handleStatusChange = (contactId, newStatus) => {
        setContacts(contacts.map(contact =>
            contact.id === contactId
                ? { ...contact, status: newStatus }
                : contact
        ));
        // NOTE: connect backend
        console.log('Changing contact status:', contactId, 'to', newStatus);
    };

    // Delete
    const handleDelete = (contactId) => {
        setContacts(contacts.filter(contact => contact.id !== contactId));
        // NOTE: connect backend
        console.log('Deleting contact:', contactId);
    };

    // Handle reply submission
    const handleSendReply = (replyMessage) => {
        console.log('Sending reply to:', selectedContact?.email);
        console.log('Reply message:', replyMessage);
        handleStatusChange(selectedContact?.id, 'responded');
        setIsReplyModalOpen(false);
        // NOTE: connect backend
        console.log('Sending reply to:', selectedContact.email);
        console.log('Reply message:', replyMessage);
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
                        <ContactRequestCard
                            key={contact.id}
                            contact={contact}
                            onMarkAsRead={handleMarkAsRead}
                            onRespond={handleRespond}
                            onStatusChange={handleStatusChange}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>

                {/* Reply Modal */}
                <ContactReplyModal
                    isOpen={isReplyModalOpen}
                    onClose={() => setIsReplyModalOpen(false)}
                    contact={selectedContact}
                    onSendReply={handleSendReply}
                />
            </main>
        </div>
    );
};

export default ContactRequests;