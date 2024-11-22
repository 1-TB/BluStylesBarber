import React, { useRef } from 'react';
import cutBackground from '../assets/images/blustyles_cut_01.jpg';
import IntroductionSection from "../Components/LandingSections/IntroductionSection";
import OurStaff from "../Components/LandingSections/OurStaff";
import PriceList from "../Components/LandingSections/PriceList";
import FeaturedCuts from "../Components/LandingSections/FeaturedCuts";
import { Link } from 'react-router-dom';
import ServiceSection from '../Components/LandingSections/ServiceSection';
import ReviewSection from '../Components/LandingSections/ReviewSection';

const LandingPage = () => {
  const pricingRef = useRef(null);
  const cutsRef = useRef(null);

  return (
    <>
      <main className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <img
            src={cutBackground}
            alt="Barber cutting hair"
            className="h-full w-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-[#001528]/60"></div>
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <div className="flex-1 flex flex-col justify-center items-center px-4 text-center">
            <div className="flex flex-col items-center justify-center space-y-6 md:space-y-8">
              <h1 className="text-center pt-20">
                <span 
                  className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white font-normal"
                  style={{
                    fontFamily: "Splash",
                    textShadow: '0 6px 4px rgba(63, 105, 183, 0.8)',
                  }}
                >
                  BluStyles
                </span>
                <span 
                  className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-normal mt-1 md:mt-2"
                  style={{
                    fontFamily: "Splash",
                    textShadow: '0 6px 4px rgba(63, 105, 183, 0.8)',
                  }}
                >
                  Barbershop
                </span>
              </h1>

              <div className="mt-8 md:mt-12 space-y-6 md:space-y-8">
                <p className="font-thin text-base sm:text-lg md:text-xl text-white/90 tracking-[0.2em] leading-relaxed">
                  "WE WANT YOU TO<br />
                  LEAVE BETTER THAN<br />
                  YOU CAME!"
                </p>
                <Link 
                  to="/booking"
                  className="inline-block"
                >
                  <button 
                    className="bg-transparent text-white border border-white/40 px-8 sm:px-12 md:px-16 py-3 md:py-4 uppercase text-base sm:text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                    style={{ fontFamily: "Teko", letterSpacing: "0.1em" }}
                  >
                    CALL US TODAY
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Footer Content */}
          <div className="mt-auto w-full py-8 md:py-12 bg-black/20">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 text-center text-white relative">
                <div className="hidden md:block absolute left-1/3 top-0 bottom-0 w-px bg-blue-400/30"></div>
                <div className="hidden md:block absolute left-2/3 top-0 bottom-0 w-px bg-blue-400/30"></div>

                {/* Address */}
                <div className="space-y-3 md:space-y-4 py-4 md:py-0" style={{ fontFamily: "Teko" }}>
                  <h3 className="text-blue-400 uppercase tracking-[0.1em] text-lg md:text-xl font-medium">
                    Address
                  </h3>
                  <div className="space-y-0.5 md:space-y-1 uppercase text-base md:text-lg tracking-[0.05em] text-gray-300">
                    <p>223 E COMMERCIAL</p>
                    <p>ST, SPRINGFIELD, MO,</p>
                    <p>UNITED STATES,</p>
                    <p>MISSOURI</p>
                  </div>
                </div>

                {/* Call Us */}
                <div className="space-y-3 md:space-y-4 py-4 md:py-0 border-t border-b md:border-0 border-blue-400/30" style={{ fontFamily: "Teko" }}>
                  <h3 className="text-blue-400 uppercase tracking-[0.1em] text-lg md:text-xl font-medium">
                    Call Us
                  </h3>
                  <div className="space-y-1 md:space-y-2">
                    <p className="text-4xl md:text-5xl font-medium tracking-wide">417-227-0001</p>
                    <p className="uppercase text-base md:text-lg tracking-[0.05em] text-blue-400">FOR BOOKING</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="space-y-3 md:space-y-4 py-4 md:py-0" style={{ fontFamily: "Teko" }}>
                  <h3 className="text-blue-400 uppercase tracking-[0.1em] text-lg md:text-xl font-medium">
                    Hours
                  </h3>
                  <div className="space-y-0.5 md:space-y-1 uppercase text-base md:text-lg tracking-[0.05em] text-gray-300">
                    <p>MONDAY THROUGH</p>
                    <p>SATURDAY 9 AM - 5 PM</p>
                    <p>SUNDAY CLOSED</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <IntroductionSection cutsRef={cutsRef} />
      <ServiceSection pricingRef={pricingRef} />
      <OurStaff />
      <PriceList priceRef={pricingRef} />
      <FeaturedCuts cutsRef={cutsRef} />
      <ReviewSection />
    </>
  );
};

export default LandingPage;