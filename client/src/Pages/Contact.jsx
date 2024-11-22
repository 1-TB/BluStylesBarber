import React, { useState } from 'react';
import { Mail, Phone, Clock, MapPin, Send, Loader2 } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: 'Message sent successfully!' });
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus({ type: 'error', message: data.message || 'Failed to send message.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
        }

        setIsLoading(false);
    };

    return (
        <div className="relative min-h-screen">
            {/* Background Gradient */}
            <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 z-0"></div>

            <div className="relative z-10 pt-32 container mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-12 text-center">
                    <span className="bg-gradient-to-r from-slate-200 to-white bg-clip-text text-transparent">
                        Get in Touch
                    </span>
                </h1>

                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Information */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="bg-black bg-opacity-50 p-6 rounded-lg backdrop-blur-sm border border-gray-800">
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <MapPin className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <h2 className="text-xl font-bold mb-2 text-white">Location</h2>
                                            <p className="text-gray-300">223 E COMMERCIAL</p>
                                            <p className="text-gray-300">ST, SPRINGFIELD, MO,</p>
                                            <p className="text-gray-300">UNITED STATES</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <Clock className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <h2 className="text-xl font-bold mb-2 text-white">Hours</h2>
                                            <p className="text-gray-300">Monday - Saturday: 9 AM - 5 PM</p>
                                            <p className="text-gray-300">Sunday: Closed</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <Phone className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <h2 className="text-xl font-bold mb-2 text-white">Phone</h2>
                                            <p className="text-2xl text-gray-300">417-227-0001</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-black bg-opacity-50 p-8 rounded-lg backdrop-blur-sm border border-gray-800">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-300">Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 h-40 text-white"
                                            required
                                        ></textarea>
                                    </div>

                                    {status.message && (
                                        <div className={`p-4 rounded-lg ${
                                            status.type === 'success' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'
                                        }`}>
                                            {status.message}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200 disabled:opacity-50"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="animate-spin" />
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                <span>Send Message</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;