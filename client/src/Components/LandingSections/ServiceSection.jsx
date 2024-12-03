import React from 'react';
import { Scissors, Zap } from 'lucide-react';
import { motion } from "framer-motion";

const services = [
  {
    id: 1,
    title: "HAIRCUT STYLES",
    description: "Get a fresh look with our wide range of haircut styles...",
    icon: Scissors
  },
  {
    id: 2,
    title: "SHAVING",
    description: "Experience a smooth and comfortable shave...",
    icon: Scissors
  },
  {
    id: 3,
    title: "TRIMMING",
    description: "Maintain a neat and tidy appearance...",
    icon: Scissors
  },
  {
    id: 4,
    title: "STYLING",
    description: "Let our expert stylists create a look that's uniquely yours...",
    icon: Scissors
  }
];

export default function ServiceSection({ pricingRef }) {
  return (
    <section className='min-h-screen bg-[#9DAED0] w-full py-16 md:py-24 content-center'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col items-center space-y-16'>
          {/* Header */}
          <div className='text-center space-y-4'>
            <h2 
              className="text-5xl md:text-6xl lg:text-7xl text-[#001528] uppercase"
              style={{ 
                fontFamily: "Teko",
                textShadow: '0 5px 2px rgba(63, 105, 183, 0.2)'
              }}
            >
              Our Services
            </h2>
            <Zap className="w-8 h-8 text-white mx-auto" />
            <p 
              className="text-2xl text-[#001528] uppercase tracking-[0.1em]"
              style={{ fontFamily: "Teko" }}
            >
              Find it all at BluStyles
            </p>
          </div>

          {/* Services Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl'>
            {services.map((service) => (
              <div 
                key={service.id} 
                className="bg-[#001528] p-8 flex flex-col items-center text-center space-y-6 group"
              >
                <service.icon className="w-8 h-8 text-blue-400" />
                
                <h4 
                  className="text-3xl text-white uppercase tracking-wide"
                  style={{ fontFamily: "Teko" }}
                >
                  {service.title}
                </h4>
                
                <p 
                  className="text-gray-400 text-lg"
                  style={{ fontFamily: "Teko", letterSpacing: "0.05em" }}
                >
                  {service.description}
                </p>

                <button
                  className="text-blue-400 uppercase text-lg tracking-wide hover:text-white transition-colors duration-300"
                  style={{ fontFamily: "Teko" }}
                  onClick={() => {
                    if (pricingRef?.current) {
                      pricingRef.current.scrollIntoView({
                        behavior: 'smooth',
                      });
                    }
                  }}
                >
                  View Pricing →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}