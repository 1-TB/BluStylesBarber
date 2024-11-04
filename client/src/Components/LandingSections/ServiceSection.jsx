import React from 'react'
import { Scissors, ZapIcon } from 'lucide-react';

const services = [
  {
    id: 1,
    title: "Haircut Styles",
    description: "Get a fresh look with our wide range of haircut styles, customized to match your unique personality and preferences. From classic cuts to the latest trends, we ensure you leave looking sharp and confident.",
    image: Scissors 
  },
  {
    id: 2,
    title: "Shaving",
    description: "Experience a smooth and comfortable shave with our professional-grade techniques. Our barbers provide a meticulous, close shave, leaving your skin feeling refreshed and rejuvenated.",
    image: Scissors // Replace with another icon if desired
  },
  {
    id: 3,
    title: "Trimming",
    description: "Maintain a neat and tidy appearance with our precision trimming services. Whether it’s a beard trim, mustache grooming, or sideburn shaping, we keep you looking your best.",
    image: Scissors // Replace with another icon if desired
  },
  {
    id: 4,
    title: "Styling",
    description: "Let our expert stylists create a look that’s uniquely yours. From everyday styling to special event prep, we use top-quality products to give your hair the perfect finish.",
    image: Scissors // Replace with another icon if desired
  }
];


export default function ServiceSection({pricingRef}) {
  return (
    <div className='w-full min-h-screen bg-[#9DAED0]  pb-8 lg:pb-0 lg:flex lg:items-center'>
      <div className='w-full flex flex-col justify-center items-center space-y-4 p-2'>
        <div className='font-teko text-4xl text-[#262E3C] mt-4 font-bold'>Our Services</div>
        <ZapIcon className="w-8 h-8 text-blue-400 mx-auto animate-pulse" />
        <h1 className='font-bold text-4xl text-center'>Beyond <span className=' text-slate-800'>Expectations</span></h1>
        <p className='text-center max-w-md sm:max-w-2xl text-[#2A78D0] font-abel text-lg sm:text-xl'>
          Step into a space where style meets precision. Our team is dedicated to providing exceptional grooming experiences that leave you looking—and feeling—your absolute best.
        </p>
        <div className='grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-md lg:max-w-7xl sm:max-w-xl ' >
          {services.map((service) => (
            <div key={service.id} className="p-6 bg-gray-800 rounded-lg shadow-lg text-center flex flex-col justify-center items-center">
              <div className=" text-blue-400  mb-4">
                <service.image size={32} /> {/* Render the icon */}
              </div>
              <h4 className="text-2xl font-bold text-white uppercase font-teko">{service.title}</h4>
              <p className="text-gray-400 mt-2 mb-4 font-abel">{service.description}</p>
              <button
              onClick={() => {
                if(pricingRef != null){
                  pricingRef.current.scrollIntoView({
                    behavior: 'smooth',
                  })
                }
              }}
              >
                View Pricing &rarr;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
