
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../Components/ui/dialog";
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";
import { Alert, AlertDescription } from "../Components/ui/alert";

const AddClientModal = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        lastVisit: '',
        nextVisit: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!formData.name || !formData.phone || !formData.email) {
            setError('Please fill in all required fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return;
        }

        // Phone validation
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!phoneRegex.test(formData.phone)) {
            setError('Please enter a valid phone number');
            return;
        }

        onAdd(formData);
        handleClose();
    };

    const handleClose = () => {
        setFormData({
            name: '',
            phone: '',
            email: '',
            lastVisit: '',
            nextVisit: ''
        });
        setError('');
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-gray-900">Add New Client</DialogTitle>
                </DialogHeader>

                {error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="text-gray-900"
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="text-gray-900"
                            placeholder="(123) 456-7890"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="text-gray-900"
                            placeholder="john@example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="lastVisit" className="block text-sm font-medium text-gray-700">
                            Last Visit
                        </label>
                        <Input
                            id="lastVisit"
                            name="lastVisit"
                            type="date"
                            value={formData.lastVisit}
                            onChange={handleChange}
                            className="text-gray-900"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="nextVisit" className="block text-sm font-medium text-gray-700">
                            Next Visit
                        </label>
                        <Input
                            id="nextVisit"
                            name="nextVisit"
                            type="date"
                            value={formData.nextVisit}
                            onChange={handleChange}
                            className="text-gray-900"
                        />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                            Add Client
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddClientModal;