import { useState } from 'react';
import { Button } from './Components/ui/button';
import { Search, Filter } from 'lucide-react';
import BookingCard from './Components/BookingCard';
import EditBookingModal from './Modals/EditBookingModal';

const Bookings = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    const [bookings, setBookings] = useState([
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            phone: "417-555-0123",
            date: "12-02-2024",
            time: "14:00",
            service: {
                name: "Haircut",
                duration: 30,
                price: 25
            },
            status: "pending",
            createdAt: "2024-02-18",
            updatedAt: "2024-02-18"
        },
        {
            id: 2,
            name: "John Deere",
            email: "johnn@example.com",
            phone: "417-000-0123",
            date: "12-01-2024",
            time: "12:00",
            service: {
                name: "Haircut",
                duration: 35,
                price: 30
            },
            status: "pending",
            createdAt: "2024-02-18",
            updatedAt: "2024-02-18"
        },
    ]);

    // Handle confirm
    const handleConfirmBooking = (bookingId) => {
        setBookings(prevBookings =>
            prevBookings.map(booking =>
                booking.id === bookingId
                    ? { ...booking, status: "confirmed" }
                    : booking
            )
        );
        // NOTE: connect backend
        console.log('Confirming booking:', bookingId);
    };

    // Handle delete
    const handleDeleteBooking = (bookingId) => {
        setBookings(prevBookings =>
            prevBookings.filter(booking => booking.id !== bookingId)
        );
        // NOTE: connect backend
        console.log('Deleting booking:', bookingId);
    };

    // Handle edit
    const handleEditClick = (booking) => {
        setSelectedBooking(booking);
        setIsEditModalOpen(true);
    };

    // Handle save edit
    const handleSaveBooking = (updatedBooking) => {
        setBookings(prevBookings =>
            prevBookings.map(booking =>
                booking.id === updatedBooking.id
                    ? { ...updatedBooking, updatedAt: new Date().toISOString() }
                    : booking
            )
        );
        setIsEditModalOpen(false);
        //NOTE: comnect backend
        console.log('Saving updated booking:', updatedBooking);
    };

    //Handle status change
    const handleStatusChange = (bookingId, newStatus) => {
        setBookings(prevBookings =>
            prevBookings.map(booking =>
                booking.id === bookingId
                    ? { ...booking, status: newStatus }
                    : booking
            )
        );
        // NOTE: connect backend
        console.log('Changing booking status:', bookingId, 'to', newStatus);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
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
                        <Button
                            variant="outline"
                            className="flex items-center gap-2 text-indigo-800"
                        >
                            <Filter className="h-4 w-4 text-indigo-800" />
                            Filter
                        </Button>
                    </div>
                </div>

                {/* Bookings List */}
                <div className="space-y-4">
                    {bookings.map((booking) => (
                        <BookingCard
                        key={booking.id}
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