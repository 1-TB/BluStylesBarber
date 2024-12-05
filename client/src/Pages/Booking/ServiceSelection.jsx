import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, Star, Scissors, Search } from 'lucide-react';

const ServiceSelection = ({ onServiceSelect }) => {
    const [services, setServices] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const storedCuts = localStorage.getItem('cuts');
        if (storedCuts) {
            setServices(JSON.parse(storedCuts));
        }
    }, []);

    const filters = [
        { id: 'all', name: 'All Services', icon: Scissors },
        { id: 'popular', name: 'Popular', icon: TrendingUp },
        { id: 'quick', name: '30 Min or Less', icon: Clock },
        { id: 'specialty', name: 'Specialty', icon: Star },
    ];

    const filteredServices = services.filter(service => {
        if (searchTerm) {
            return service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.description.toLowerCase().includes(searchTerm.toLowerCase());
        }

        switch (activeFilter) {
            case 'popular':
                return service.popular;
            case 'quick':
                return service.time <= 30;
            case 'specialty':
                return service.specialty;
            default:
                return true;
        }
    });

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    Choose Your Style
                </span>
            </h1>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-8">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search services..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
                {filters.map(({ id, name, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={() => setActiveFilter(id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${activeFilter === id
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                    >
                        <Icon size={18} />
                        <span>{name}</span>
                    </button>
                ))}
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                    <motion.div
                        key={service.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-gray-800"
                    >
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-bold text-white">{service.name}</h3>
                                {service.popular && (
                                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                                        Popular
                                    </span>
                                )}
                            </div>
                            <p className="text-gray-400">{service.description}</p>
                            <div className="flex justify-between items-center text-gray-300">
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    <span>{service.time} mins</span>
                                </div>
                                <span>${service.price}</span>
                            </div>
                            <button
                                onClick={() => onServiceSelect({
                                    name: service.name,
                                    duration: service.time,
                                    price: service.price
                                })}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-200"
                            >
                                Select Service
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ServiceSelection;