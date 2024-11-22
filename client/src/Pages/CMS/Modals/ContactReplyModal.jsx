import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../Components/ui/dialog';
import { Button } from '../Components/ui/button';
import { User, Mail, MessageSquare } from 'lucide-react';

const ContactReplyModal = ({
    isOpen,
    onClose,
    contact,
    onSendReply
}) => {
    const [replyMessage, setReplyMessage] = useState('');

    useEffect(() => {
        if (isOpen) {
            setReplyMessage('');
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSendReply(replyMessage);
        setReplyMessage('');
    };

    if (!isOpen || !contact) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-indigo-900">
                        Reply to Contact Request
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="mt-4 space-y-6">
                    {/* Contact Information Section */}
                    <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-700">Name:</span>
                            <span className="text-gray-900">{contact.name}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-700">Email:</span>
                            <span className="text-gray-900">{contact.email}</span>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <MessageSquare className="h-4 w-4 text-gray-500" />
                                <span className="text-gray-700">Original Message:</span>
                            </div>
                            <div className="bg-white rounded-md p-3 text-gray-900 border border-gray-200">
                                {contact.message}
                            </div>
                        </div>
                    </div>

                    {/* Reply Section */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Your Reply
                        </label>
                        <textarea
                            className="text-gray-900 w-full h-32 p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="Type your reply here..."
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button
                            type="button"
                            className="text-gray-900"
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                            disabled={!replyMessage.trim()}
                        >
                            Send Reply
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ContactReplyModal;