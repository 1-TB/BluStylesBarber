import React from 'react';
import { ZapIcon } from 'lucide-react';
import HoverButton from '../Components/HoverButton';
import leftSideImage from '../assets/images/blustyles_cuttype_02.jpg';

const services = [
  { name: "Haircut", price: 40, time: 30 },
  { name: "Shave", price: 35, time: 20 },
  { name: "Haircut + Shave", price: 70, time: 50 },
  { name: "Trim (Back and Sides)", price: 25, time: 30 },
  { name: "Beard Trim", price: 15, time: 20 },
];

const PriceList = () => {
  return (
    <div className="min-h-screen bg-slate-800 flex">
      {/* Left side image */}
      <div className="hidden md:block w-1/2 contrast-125 ">
        <img
          src={leftSideImage}
          alt="Barber at work"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side prices */}
      <div className="w-full md:w-1/2 bg-slate-300/90 p-8 md:p-16 flex flex-col justify-center">
        <div className="max-w-lg mx-auto w-full">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Prices List</h2>
            <ZapIcon className="w-8 h-8 mb-2 text-blue-400 animate-pulse" />
            <p className="text-slate-600">
              Dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut.
            </p>
          </div>

          {/* Price List */}
          <div className="space-y-6 mb-12">
            {services.map((service) => (
                <div
                key={service.name}
                className="flex justify-between pb-2 border-b border-slate-400"
                >
                <div className="flex flex-col">
                    <span className="text-slate-800 font-medium">{service.name}</span>
                    <span className="text-blue-500 text-xs">{service.time} mins</span>
                </div>
                <span className="text-blue-500 font-semibold">${service.price}</span>
                </div>
            ))}
            </div>
          {/* Call button - note: trigger phone number dial screen on phone? */}
          <HoverButton 
            onClick={() => console.log('Call initiate.')}
            className="w-full sm:w-auto">
            Call to Book
          </HoverButton>
        </div>
      </div>
    </div>
  );
};

export default PriceList;