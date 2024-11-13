
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
            <DialogContent className="w-[95vw] max-w-[425px] p-4 md:p-6 rounded-lg">
                <DialogHeader className="space-y-2 mb-4">
                    <DialogTitle className="text-lg md:text-xl font-bold text-gray-900 text-center md:text-left">
                        Add New Client
                    </DialogTitle>
                </DialogHeader>

                {error && (
                    <Alert variant="destructive" className="mb-4 text-sm">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4">
                        {/* Name Field */}
                        <div className="space-y-1.5">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="text-gray-900 h-9 md:h-10"
                                placeholder="John Doe"
                                autoComplete="name"
                            />
                        </div>

                        {/* Phone Field */}
                        <div className="space-y-1.5">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="text-gray-900 h-9 md:h-10"
                                placeholder="(123) 456-7890"
                                type="tel"
                                autoComplete="tel"
                            />
                        </div>

                        {/* Email Field */}
                        <div className="space-y-1.5">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="text-gray-900 h-9 md:h-10"
                                placeholder="john@example.com"
                                autoComplete="email"
                            />
                        </div>

                        {/* Date Fields Container */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Last Visit Field */}
                            <div className="space-y-1.5">
                                <label htmlFor="lastVisit" className="block text-sm font-medium text-gray-700">
                                    Last Visit
                                </label>
                                <Input
                                    id="lastVisit"
                                    name="lastVisit"
                                    type="date"
                                    value={formData.lastVisit}
                                    onChange={handleChange}
                                    className="text-gray-900 h-9 md:h-10"
                                />
                            </div>

                            {/* Next Visit Field */}
                            <div className="space-y-1.5">
                                <label htmlFor="nextVisit" className="block text-sm font-medium text-gray-700">
                                    Next Visit
                                </label>
                                <Input
                                    id="nextVisit"
                                    name="nextVisit"
                                    type="date"
                                    value={formData.nextVisit}
                                    onChange={handleChange}
                                    className="text-gray-900 h-9 md:h-10"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col-reverse md:flex-row justify-end gap-2 md:gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full md:w-auto text-gray-900"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white">
                            Add Client
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddClientModal;