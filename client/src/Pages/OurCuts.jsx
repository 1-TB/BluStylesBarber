import React from 'react';

const OurCuts = () => {
    return (
        <div className="pt-32 container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-12 text-center">
        <span className="bg-gradient-to-r from-slate-200 to-white bg-clip-text text-transparent">
          Our Signature Cuts
        </span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {['Classic Fade', 'Modern Pompadour', 'Textured Crop', 'Taper Cut', 'Buzz Cut', 'Beard Trim'].map((style) => (
                    <div key={style} className="bg-gray-900 p-6 rounded-lg">
                        <div className="aspect-w-1 aspect-h-1 mb-4 bg-gray-800 rounded-lg"></div>
                        <h3 className="text-xl font-bold mb-2">{style}</h3>
                        <p className="text-gray-400">Professional cuts tailored to your style and preferences.</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OurCuts;
