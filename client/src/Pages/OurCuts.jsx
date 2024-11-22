import React from 'react';
import { ZapIcon, Scissors } from 'lucide-react';

const OurCuts = () => {
    const cuts = [
        {
            name: 'Classic Fade',
            description: 'Professional cuts tailored to your style and preferences.',
            price: '$68.75',
            duration: '45 mins'
        },
        {
            name: 'Modern Pompadour',
            description: 'Professional cuts tailored to your style and preferences.',
            price: '$33.75',
            duration: '30 mins'
        },
        {
            name: 'Textured Crop',
            description: 'Professional cuts tailored to your style and preferences.',
            price: '$28.75',
            duration: '35 mins'
        },
        {
            name: 'Taper Cut',
            description: 'Professional cuts tailored to your style and preferences.',
            price: '$33.75',
            duration: '30 mins'
        },
        {
            name: 'Buzz Cut',
            description: 'Professional cuts tailored to your style and preferences.',
            price: '$28.75',
            duration: '25 mins'
        },
        {
            name: 'Beard Trim',
            description: 'Professional cuts tailored to your style and preferences.',
            price: '$23.75',
            duration: '20 mins'
        }
    ];

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-32 pb-16">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center space-y-4 mb-16">
                    <h1 
                        className="text-5xl md:text-6xl lg:text-7xl text-blue-400 uppercase"
                        style={{ fontFamily: "Teko" }}
                    >
                        Featured Cuts
                    </h1>
                    <ZapIcon className="w-6 h-6 text-blue-500 mx-auto" />
                </div>

                {/* Cuts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                    {cuts.map((cut) => (
                        <div 
                            key={cut.name} 
                            className="bg-black p-8 flex flex-col space-y-4 rounded-lg border border-blue-400/70 hover:border-blue-400 transition-transform duration-300 hover:scale-110"
                        >
                            <div className="aspect-w-1 aspect-h-1 mb-4 bg-[#262E3C] relative rounded-lg">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Scissors className="w-12 h-12 text-blue-500/30" />
                                </div>
                            </div>

                            <h3 
                                className="text-3xl text-center text-white uppercase tracking-wide"
                                style={{ fontFamily: "Teko" }}
                            >
                                {cut.name}
                            </h3>

                            <p 
                                className="text-gray-400 text-center flex-grow text-lg"
                                style={{ fontFamily: "Abel" }}
                            >
                                {cut.description}
                            </p>

                            <div 
                                className="flex justify-between items-center pt-4"
                                style={{ fontFamily: "Teko" }}
                            >
                                <span className="text-blue-500 text-xl">{cut.price}</span>
                                <span className="text-gray-400">{cut.duration}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurCuts;
