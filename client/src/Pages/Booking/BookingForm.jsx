// Pages/Booking/BookingForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Mail, Phone } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = ({ selectedService, onSubmit, onBack }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: null,
        time: null
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.date) newErrors.date = 'Date is required';
        if (!formData.time) newErrors.time = 'Time is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    // Filter available dates (exclude Sundays and past dates)
    const filterDate = (date) => {
        const day = date.getDay();
        return day !== 0 && date >= new Date();
    };

    // Generate available time slots
    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 9; hour < 17; hour++) {
            slots.push(`${hour}:00`);
            slots.push(`${hour}:30`);
        }
        return slots;
    };

    return (
        <div className="max-w-2xl mx-auto">
            <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-400 hover:text-white mb-6"
            >
                <ArrowLeft size={20} />
                <span>Back to Services</span>
            </button>

            {/* Selected Service Summary */}
            <div className="bg-gray-900 rounded-lg p-6 mb-8 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-2">Selected Service</h3>
                <div className="flex justify-between items-center text-gray-300">
                    <span>{selectedService.name}</span>
                    <span>${selectedService.price}</span>
                </div>
                <div className="text-gray-400 text-sm mt-2">
                    Duration: {selectedService.duration} minutes
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                    <div>
                        <label className="flex items-center space-x-2 text-gray-300 mb-2">
                            <User size={18} />
                            <span>Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="flex items-center space-x-2 text-gray-300 mb-2">
                            <Mail size={18} />
                            <span>Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="flex items-center space-x-2 text-gray-300 mb-2">
                            <Phone size={18} />
                            <span>Phone</span>
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                </div>

                {/* Date and Time Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="flex items-center space-x-2 text-gray-300 mb-2">
                            <Calendar size={18} />
                            <span>Preferred Date</span>
                        </label>
                        <DatePicker
                            selected={formData.date}
                            onChange={(date) => setFormData(prev => ({ ...prev, date }))}
                            filterDate={filterDate}
                            minDate={new Date()}
                            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white"
                            placeholderText="Select date"
                        />
                        {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                    </div>

                    <div>
                        <label className="flex items-center space-x-2 text-gray-300 mb-2">
                            <Clock size={18} />
                            <span>Preferred Time</span>
                        </label>
                        <select
                            name="time"
                            value={formData.time || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white"
                        >
                            <option value="">Select time</option>
                            {generateTimeSlots().map(slot => (
                                <option key={slot} value={slot}>{slot}</option>
                            ))}
                        </select>
                        {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                    <span>Request Booking</span>
                </button>
            </form>
        </div>
    );
};

export default BookingForm;