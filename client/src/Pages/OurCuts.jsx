import React, { useEffect, useState } from 'react';

const OurCuts = () => {
    const [cuts, setCuts] = useState([]);

    useEffect(() => {
        const storedCuts = localStorage.getItem('cuts');
        if (storedCuts) {
            setCuts(JSON.parse(storedCuts));
        }
    }, []);

    return (
        <div className="pt-32 container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-12 text-center">
                <span className="bg-gradient-to-r from-slate-200 to-white bg-clip-text text-transparent">
                    Our Signature Cuts
                </span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cuts.map((cut) => (
                    <div key={cut._id} className="bg-gray-900 p-6 rounded-lg">
                        <div className="aspect-w-1 aspect-h-1 mb-4 bg-gray-800 rounded-lg">
                            {cut.picture && <img src={cut.picture} alt={cut.name} className="w-full h-full object-cover rounded-lg" />}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{cut.name}</h3>
                        <p className="text-gray-400">{cut.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OurCuts;
