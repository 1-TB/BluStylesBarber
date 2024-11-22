import React from 'react';
import { motion } from 'framer-motion';
import { Check, Calendar, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const BookingConfirmation = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-32 px-4">
            <div className="max-w-2xl mx-auto text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-20 h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-8"
                >
                    <Check className="w-10 h-10 text-white" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6"
                >
                    <h1 className="text-4xl font-bold text-white">
                        Booking Request Received!
                    </h1>

                    <p className="text-xl text-gray-300">
                        Thank you for choosing Blu Styles Barbershop.
                    </p>

                    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 max-w-md mx-auto">
                        <p className="text-gray-300 mb-4">
                            Our team will contact you shortly to confirm your appointment time and date.
                        </p>

                        <div className="flex items-center justify-center space-x-4 text-gray-400">
                            <Phone className="w-5 h-5" />
                            <span>Expect a call from us soon</span>
                        </div>
                    </div>

                    <div className="pt-8">
                        <Link
                            to="/"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors duration-200"
                        >
                            Return to Home
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default BookingConfirmation;