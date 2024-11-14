import { Calendar, Clock, User, Phone, Mail, CheckCircle2, Pencil, Trash2, Clock3 } from 'lucide-react';
import DropdownMenu from './ui/DropdownMenu';

const getStatusColor = (status) => {
    switch (status) {
        case 'confirmed':
            return 'bg-green-100 text-green-800';
        case 'pending':
            return 'bg-yellow-100 text-yellow-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const BookingCard = ({
    booking,
    onConfirm,
    onEdit,
    onDelete,
    onStatusChange,
}) => {
    const dropdownItems = [
        {
            label: 'Confirm',
            onClick: () => onConfirm(booking.id),
            icon: <CheckCircle2 className="h-4 w-4" />,
            className: 'text-indigo-600 hover:bg-indigo-50',
            hidden: booking.status === 'confirmed'
        },
        {
            label: 'Mark as Pending',
            onClick: () => onStatusChange(booking.id, 'pending'),
            icon: <Clock3 className="h-4 w-4" />,
            className: 'text-yellow-600 hover:bg-yellow-50',
            hidden: booking.status === 'pending'
        },
        {
            label: 'Edit',
            onClick: () => onEdit(booking),
            icon: <Pencil className="h-4 w-4" />,
            className: 'text-blue-600 hover:bg-blue-50'
        },
        {
            label: 'Delete',
            onClick: () => onDelete(booking.id),
            icon: <Trash2 className="h-4 w-4" />,
            className: 'text-red-600 hover:bg-red-50',
            variant: 'destructive'
        }
    ].filter(item => !item.hidden);

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-indigo-900">
                        {booking.service.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                        ${booking.service.price} - {booking.service.duration} mins
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm capitalize ${getStatusColor(booking.status)}`}>
                        {booking.status}
                    </span>
                    <DropdownMenu
                        items={dropdownItems}
                        align="right"
                    />
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
    );
};

export default BookingCard;