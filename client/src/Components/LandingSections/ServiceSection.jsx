import React from 'react';
import { Scissors, Zap } from 'lucide-react';
import { motion } from "framer-motion";
const services = [
  {
    id: 1,
    title: "Haircut Styles",
    description: "Get a fresh look with our wide range of haircut styles...",
    image: Scissors
  },
  {
    id: 2,
    title: "Shaving",
    description: "Experience a smooth and comfortable shave...",
    image: Scissors
  },
  {
    id: 3,
    title: "Trimming",
    description: "Maintain a neat and tidy appearance...",
    image: Scissors
  },
  {
    id: 4,
    title: "Styling",
    description: "Let our expert stylists create a look that’s uniquely yours...",
    image: Scissors
  }
];

export default function ServiceSection({ pricingRef }) {
  return (
    <div className='w-full min-h-screen bg-[#9DAED0] pb-8 lg:pb-0 lg:flex lg:items-center'>
      <motion.div 
       initial={{ opacity: 0, y: -100 }}
       whileInView={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
       viewport={{ once: true }}
       transition={{staggerChildren: 0.2}}
      className='w-full flex flex-col justify-center items-center space-y-4 p-2'>
        <div className='font-teko text-4xl text-[#262E3C] mt-4 font-bold'>Our Services</div>
        <Zap className="w-8 h-8 text-blue-400 mx-auto animate-pulse" />
        <h1 className='font-bold text-4xl text-center'>Beyond <span className=' text-slate-800'>Expectations</span></h1>
        <p className='text-center max-w-md sm:max-w-2xl text-[#2A78D0] font-abel text-lg sm:text-xl'>
          Step into a space where style meets precision...
        </p>
        <div
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-md lg:max-w-7xl sm:max-w-xl'>
          {services.map((service) => (
            <div key={service.id} className="p-6 bg-gray-800 rounded-lg shadow-lg text-center flex flex-col justify-center items-center">
              <div className="text-blue-400 mb-4">
                  <service.image size={32} /> 
              </div>
              <h4 className="text-2xl font-bold text-white uppercase font-teko">{service.title}</h4>
              <p className="text-gray-400 mt-2 mb-4 font-abel">{service.description}</p>
              <button
                onClick={() => {
                  if (pricingRef != null) {
                    pricingRef.current.scrollIntoView({
                      behavior: 'smooth',
                    });
                  }
                }}
              >
                View Pricing &rarr;
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
