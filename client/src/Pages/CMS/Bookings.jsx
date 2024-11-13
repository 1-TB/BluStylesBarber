import { useState } from 'react';
import { Button } from './Components/ui/button';
import { Search, Filter, MoreVertical, Calendar, Clock, User, Phone, Mail } from 'lucide-react';

const Bookings = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // temp data
    const bookings = [
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
    ];

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
                        <div
                            key={booking.id}
                            className="bg-white rounded-lg shadow-sm p-4 md:p-6"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {booking.service.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        ${booking.service.price} - {booking.service.duration} mins
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`px-3 py-1 rounded-full text-sm ${booking.status === 'pending'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-green-100 text-green-800'
                                        }`}>
                                        {booking.status}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                    >
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center text-gray-600">
                                        <User className="h-4 w-4 mr-2" />
                                        {booking.name}
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Phone className="h-4 w-4 mr-2" />
                                        {booking.phone}
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Mail className="h-4 w-4 mr-2" />
                                        {booking.email}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center text-gray-600">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        {booking.date}
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Clock className="h-4 w-4 mr-2" />
                                        {booking.time}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Bookings;