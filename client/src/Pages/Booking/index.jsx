import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceSelection from './ServiceSelection';
import BookingForm from './BookingForm';
import { useNavigate } from 'react-router-dom';

const BookingPage = () => {
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState(null);
    const navigate = useNavigate();

    const handleServiceSelect = (service) => {
        setSelectedService(service);
        setStep(2);
    };

    const handleBookingSubmit = async (formData) => {
        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    service: selectedService,
                }),
            });

            if (response.ok) {
                navigate('/booking-confirmation');
            } else {
                throw new Error('Booking failed');
            }
        } catch (error) {
            console.error('Booking error:', error);
            // Handle error state
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <div className="container mx-auto px-4 pt-32 pb-16">
                {/* Progress Bar */}
                <div className="max-w-3xl mx-auto mb-12">
                    <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                            <div className="text-white">
                                Step {step} of 2: {step === 1 ? 'Choose Service' : 'Book Appointment'}
                            </div>
                            <div className="text-white">
                                {Math.round((step / 2) * 100)}%
                            </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-800">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: `${(step / 2) * 100}%` }}
                                transition={{ duration: 0.5 }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <AnimatePresence mode='wait'>
                    {step === 1 ? (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ServiceSelection onServiceSelect={handleServiceSelect} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <BookingForm
                                selectedService={selectedService}
                                onSubmit={handleBookingSubmit}
                                onBack={() => setStep(1)}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default BookingPage;