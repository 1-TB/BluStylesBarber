import { useState, useEffect } from 'react';
import { Button } from './Components/ui/button';
import { Search, Filter, ArrowUp, ArrowDown, Check } from 'lucide-react';
import DropdownMenu from './Components/ui/DropdownMenu';
import BookingCard from './Components/BookingCard';
import EditBookingModal from './Modals/EditBookingModal';
import { useAuth } from './AuthContext';

const Bookings = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateSort, setDateSort] = useState('newest');
    const { user } = useAuth();

    const statusFilterItems = [
        {
            label: 'All Bookings',
            onClick: () => setStatusFilter('all'),
            icon: statusFilter === 'all' ? <Check className="h-4 w-4" /> : null
        },
        {
            label: 'Pending',
            onClick: () => setStatusFilter('pending'),
            icon: statusFilter === 'pending' ? <Check className="h-4 w-4" /> : null
        },
        {
            label: 'Confirmed',
            onClick: () => setStatusFilter('confirmed'),
            icon: statusFilter === 'confirmed' ? <Check className="h-4 w-4" /> : null
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

    useEffect(() => {
        fetchBookings();
    }, [statusFilter]);

    const fetchBookings = async () => {
        try {
            const queryParams = new URLSearchParams();
            if (statusFilter !== 'all') {
                queryParams.append('status', statusFilter);
            }

            const response = await fetch(`/api/bookings?${queryParams.toString()}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (!response.ok) throw new Error('Failed to fetch bookings');
            const data = await response.json();

            const sortedData = [...data].sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateSort === 'newest' ? dateB - dateA : dateA - dateB;
            });

            setBookings(sortedData);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredBookings = () => {
        if (!searchQuery) return bookings;

        return bookings.filter(booking =>
            booking.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.phone?.includes(searchQuery)
        );
    };

    useEffect(() => {
        setBookings(prevBookings => {
            const sorted = [...prevBookings].sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateSort === 'newest' ? dateB - dateA : dateA - dateB;
            });
            return sorted;
        });
    }, [dateSort]);

    // Handle confirm
    const handleConfirmBooking = async (bookingId) => {
        try {
            const response = await fetch(`/api/bookings/${bookingId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ status: 'confirmed' })
            });

            if (!response.ok) throw new Error('Failed to confirm booking');

            setBookings(prevBookings =>
                prevBookings.map(booking =>
                    booking._id === bookingId
                        ? { ...booking, status: "confirmed" }
                        : booking
                )
            );
        } catch (error) {
            console.error('Error confirming booking:', error);
        }
    };

    // Handle delete
    const handleDeleteBooking = async (bookingId) => {
        try {
            const response = await fetch(`/api/bookings/${bookingId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (!response.ok) throw new Error('Failed to delete booking');

            setBookings(prevBookings =>
                prevBookings.filter(booking => booking._id !== bookingId)
            );
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    // Handle edit
    const handleEditClick = (booking) => {
        setSelectedBooking(booking);
        setIsEditModalOpen(true);
    };

    // Handle save edit
    const handleSaveBooking = async (updatedBooking) => {
        console.log('handleSaveBooking - Starting with data:', updatedBooking);
        try {
            const response = await fetch(`/api/bookings/${updatedBooking._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(updatedBooking)
            });
    
            console.log('handleSaveBooking - Response status:', response.status);
            const responseData = await response.json();
            console.log('handleSaveBooking - Response data:', responseData);
    
            if (!response.ok) {
                throw new Error('Failed to update booking');
            }
    
            // Close modal
            setIsEditModalOpen(false);
            
            console.log('handleSaveBooking - About to fetch bookings');
            await fetchBookings();
            console.log('handleSaveBooking - Fetch bookings completed');
    
        } catch (error) {
            console.error('handleSaveBooking - Error:', error);
        }
    };

    //Handle status change
    const handleStatusChange = async (bookingId, newStatus) => {
        console.log('BookingId:', bookingId);
        try {
            const response = await fetch(`/api/bookings/${bookingId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) throw new Error('Failed to update booking status');

            setBookings(prevBookings =>
                prevBookings.map(booking =>
                    booking._id === bookingId
                        ? { ...booking, status: newStatus }
                        : booking
                )
            );
        } catch (error) {
            console.error('Error updating booking status:', error);
        }
    };

    if (isLoading) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
    }

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
                                placeholder="Search bookings..."
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

                {/* Bookings List */}
                <div className="space-y-4">
                    {filteredBookings().map((booking) => (
                        <BookingCard
                            key={booking._id}
                            booking={booking}
                            onConfirm={(id) => handleStatusChange(id, 'confirmed')}
                            onStatusChange={handleStatusChange}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteBooking}
                        />
                    ))}
                </div>
            </main>

            {/* Edit Modal */}
            <EditBookingModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                booking={selectedBooking}
                onSave={handleSaveBooking}
                onCancel={() => setIsEditModalOpen(false)}
            />
        </div>
    );
};

export default Bookings;