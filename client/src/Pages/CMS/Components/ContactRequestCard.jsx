import { Mail, User, Clock, MessageSquare, MoreVertical, CheckCircle2, Circle, SendHorizontal, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import DropdownMenu from './ui/DropdownMenu';

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

const ContactRequestCard = ({
    contact,
    onMarkAsRead,
    onRespond,
    onStatusChange,
    onDelete,
}) => {
    const dropdownItems = [
        {
            label: 'Mark as Unread',
            onClick: () => onStatusChange(contact._id, 'new'),
            icon: <Clock className="h-4 w-4" />,
            className: 'text-blue-600 hover:bg-blue-50',
            hidden: contact.status === 'new'
        },
        {
            label: 'Mark as Read',
            onClick: () => onMarkAsRead(contact._id),
            icon: <CheckCircle2 className="h-4 w-4" />,
            className: 'text-yellow-600 hover:bg-yellow-50',
            hidden: contact.status === 'read'
        },
        {
            label: 'Delete',
            onClick: () => onDelete(contact._id),
            icon: <Trash2 className="h-4 w-4" />,
            className: 'text-red-600 hover:bg-red-50',
            variant: 'destructive'
        }
    ].filter(item => !item.hidden);

    const handleRespond = () => {
        onRespond(contact);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
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
                    <DropdownMenu
                        items={dropdownItems}
                        align="right"
                    />
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
                    {contact.status !== 'read' && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-gray-700"
                            onClick={() => onMarkAsRead(contact._id)}
                        >
                            Mark as Read
                        </Button>
                    )}
                    {contact.status !== 'responded' && (
                        <Button
                            size="sm"
                            className="bg-indigo-600 text-white hover:bg-indigo-700"
                            onClick={handleRespond}
                        >
                            Respond
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactRequestCard;