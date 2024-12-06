import {React} from 'react';
import { Link } from 'react-router-dom';
import { ZapIcon } from 'lucide-react';
import HoverButton from '../MSC/HoverButton';
import leftSideImage from '../../assets/images/blustyles_cuttype_02.jpg';

const services = [
  { name: "Haircut", price: 40, time: 30 },
  { name: "Shave", price: 35, time: 20 },
  { name: "Haircut + Shave", price: 70, time: 50 },
  { name: "Trim (Back and Sides)", price: 25, time: 30 },
  { name: "Beard Trim", price: 15, time: 20 },
];

const PriceList = ( { priceRef } ) => {
  return (
    <div className="min-h-screen bg-[#9DAED0] flex" ref={priceRef}>
      {/* Left side image */}
      <div className="hidden md:block w-1/2 contrast-125 ">
        <img
          src={leftSideImage}
          alt="Barber at work"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side prices */}
      <div className="w-full md:w-1/2 bg-[#9DAED0] p-8 md:p-16 flex flex-col justify-center">
        <div className="max-w-lg mx-auto w-full">
          {/* Header */}
          <div className="mb-12">
          <h2 
              className="text-5xl md:text-6xl lg:text-7xl text-[#001528] uppercase"
              style={{ 
                fontFamily: "Teko",
                textShadow: '0 5px 2px rgba(63, 105, 183, 0.2)'
              }}
            >
              The Prices
            </h2>
            <ZapIcon className="w-10 h-10 text-white pb-2" />
            <p className="text-[#001528] font-semibold text-lg" style={{fontFamily: "Abel"}}>
            At BluStyles, we believe in transparent pricing and exceptional value. Our services are designed to give you exactly what you need, from a quick trim to a complete grooming experience.
            </p>
          </div>

          {/* Price List */}
          <div className="space-y-6 mb-12" >
            {services.map((service) => (
                <div
                key={service.name}
                className="flex justify-between pb-2 border-b border-white/50"
                >
                <div className="flex flex-col">
                    <span className="text-[#001528] font-bold text-lg" style={{fontFamily: "Abel"}}>{service.name}</span>
                    <span className="text-blue-500 text-xs">{service.time} mins</span>
                </div>
                <span className="text-[#001528] text-lg">${service.price}</span>
                </div>
            ))}
            </div>
          <Link 
                  to="/booking"
                  className="inline-block"
                >
                  <button 
                    className="bg-[#001528] text-white border border-[#001528]/40 px-8 sm:px-12 md:px-16 py-3 md:py-4 uppercase text-base sm:text-xl hover:bg-[#001528]/80 transition-all duration-300"
                    style={{ fontFamily: "Teko", letterSpacing: "0.1em" }}
                  >
                    BOOK TODAY
                  </button>
                </Link>
        </div>
      </div>
    </div>
  );
};

export default PriceList;