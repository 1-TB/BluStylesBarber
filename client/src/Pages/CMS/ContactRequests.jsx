import { useState, useEffect, useCallback } from 'react';
import { Search, Filter, ArrowUp, ArrowDown, Check } from 'lucide-react';
import { Button } from './Components/ui/button';
import DropdownMenu from './Components/ui/DropdownMenu';
import ContactRequestCard from './Components/ContactRequestCard';
import ContactReplyModal from './Modals/ContactReplyModal';
import { useAuth } from './AuthContext';

const ContactRequests = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateSort, setDateSort] = useState('newest');
    const { user } = useAuth();

    const statusFilterItems = [
        {
            label: 'All Requests',
            onClick: () => setStatusFilter('all'),
            icon: statusFilter === 'all' ? <Check className="h-4 w-4" /> : null
        },
        {
            label: 'Unread',
            onClick: () => setStatusFilter('new'),
            icon: statusFilter === 'new' ? <Check className="h-4 w-4" /> : null
        },
        {
            label: 'Read',
            onClick: () => setStatusFilter('read'),
            icon: statusFilter === 'read' ? <Check className="h-4 w-4" /> : null
        },
        {
            label: 'Responded',
            onClick: () => setStatusFilter('responded'),
            icon: statusFilter === 'responded' ? <Check className="h-4 w-4" /> : null
        }
    ];

    const dateSortItems = [
        {
            label: 'Newest First',
            onClick: () => setDateSort('newest'),
            icon: dateSort === 'newest' ? <Check className="h-4 w-4" /> : null
        },
        {
            label: 'Oldest First',
            onClick: () => setDateSort('oldest'),
            icon: dateSort === 'oldest' ? <Check className="h-4 w-4" /> : null
        }
    ];

    const fetchContacts = useCallback(async () => {
        if (!user?.token) return;

        try {
            const queryParams = new URLSearchParams();
            if (statusFilter !== 'all') {
                queryParams.append('status', statusFilter);
            }

            const response = await fetch(`/api/contact?${queryParams.toString()}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch contacts');
            }

            const data = await response.json();
            const sortedData = [...(Array.isArray(data) ? data : [])].sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return dateSort === 'newest' ? dateB - dateA : dateA - dateB;
            });
            setContacts(sortedData);
        } catch (error) {
            console.error('Error fetching contacts:', error);
            setContacts([]);
        } finally {
            setIsLoading(false);
        }
    }, [user?.token, statusFilter, dateSort]);

    useEffect(() => {
        fetchContacts();
    }, [fetchContacts]);

    const filteredContacts = () => {
        if (!searchQuery) return contacts;

        return contacts.filter(contact =>
            contact.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.message?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    // mark as read
    const handleMarkAsRead = async (contactId) => {
        try {
            const response = await fetch(`/api/contact/${contactId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ status: 'read' })
            });

            if (!response.ok) throw new Error('Failed to mark contact as read');
            fetchContacts();
        } catch (error) {
            console.error('Error marking contact as read:', error);
        }
    };

    // respond
    const handleRespond = (contact) => {
        setSelectedContact(contact);
        setIsReplyModalOpen(true);
    };

    // status change
    const handleStatusChange = async (contactId, newStatus) => {
        try {
            const response = await fetch(`/api/contact/${contactId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) throw new Error('Failed to update contact status');
            fetchContacts();
        } catch (error) {
            console.error('Error updating contact status:', error);
        }
    };

    // Delete
    const handleDelete = async (contactId) => {
        try {
            const response = await fetch(`/api/contact/${contactId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (!response.ok) throw new Error('Failed to delete contact');
            fetchContacts();
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    // Handle reply submission
    const handleSendReply = async (replyMessage) => {
        try {
            const response = await fetch(`/api/contact/${selectedContact._id}/reply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    email: selectedContact.email,
                    message: replyMessage
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to send reply');
            }

            await handleStatusChange(selectedContact._id, 'responded');
            setIsReplyModalOpen(false);
        } catch (error) {
            console.error('Error sending reply:', error);
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
                        <div className="flex gap-2">
                            <DropdownMenu
                                items={statusFilterItems}
                                trigger={
                                    <Button variant="outline" className="flex items-center gap-2">
                                        <Filter className="h-4 w-4" />
                                        Status
                                    </Button>
                                }
                            />

                            <DropdownMenu
                                items={dateSortItems}
                                trigger={
                                    <Button variant="outline" className="flex items-center gap-2">
                                        {dateSort === 'newest' ?
                                            <ArrowDown className="h-4 w-4" /> :
                                            <ArrowUp className="h-4 w-4" />
                                        }
                                        Date
                                    </Button>
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Requests List */}
                <div className="space-y-4">
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : filteredContacts().length === 0 ? (
                        <div>No contact requests found</div>
                    ) : (
                        filteredContacts().map((contact) => (
                            <ContactRequestCard
                                key={contact._id}
                                contact={contact}
                                onMarkAsRead={handleMarkAsRead}
                                onRespond={handleRespond}
                                onStatusChange={handleStatusChange}
                                onDelete={handleDelete}
                            />
                        ))
                    )}
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