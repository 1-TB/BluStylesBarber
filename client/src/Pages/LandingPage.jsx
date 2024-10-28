import React from 'react';
import cutBackground from '../assets/images/blustyles_cut_01.jpg';
import IntroductionSection from "../Components/LandingSections/IntroductionSection";
import OurStaff from "../Components/LandingSections/OurStaff";
import PriceList from "../Components/LandingSections/PriceList";
import FeaturedCuts from "../Components/LandingSections/FeaturedCuts";
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
      <>
        {/* Main Hero Section */}
        <main className="relative min-h-screen">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
                src={cutBackground}
                alt="Barber cutting hair"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 flex flex-col min-h-screen">
            {/* Top Spacing for Mobile */}
            <div className="h-32 md:h-0"></div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col justify-center items-center px-4 text-center">
              <div className="space-y-8 md:space-y-12">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold italic">
                <span className="bg-gradient-to-r from-slate-200 to-white bg-clip-text text-transparent">
                  Blu Styles
                </span>
                </h1>

                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold italic">
                <span className="bg-gradient-to-r from-slate-200 to-white bg-clip-text text-transparent">
                  Barbershop
                </span>
                </h2>

                <p className="text-lg md:text-xl tracking-wider">
                  "WE WANT YOU TO LEAVE BETTER THAN YOU CAME!"
                </p>

                <Link to="/booking">
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded transition-colors duration-200">
                    BOOK NOW!
                  </button>
                </Link>
              </div>
            </div>

            {/* Footer Content */}
            <div className="mt-auto px-4 py-8 md:py-12">
              <div className="container mx-auto">
                <div className="grid grid-cols-1 gap-16 md:gap-8 md:grid-cols-3 text-center">
                  {/* Address */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg">ADDRESS</h3>
                    <div className="space-y-2">
                      <p>223 E COMMERCIAL</p>
                      <p>ST, SPRINGFIELD, MO,</p>
                      <p>UNITED STATES,</p>
                      <p>MISSOURI</p>
                    </div>
                  </div>

                  {/* Call Us */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg">CALL US</h3>
                    <div className="space-y-2">
                      <p className="text-2xl font-semibold">417-227-0001</p>
                      <p>FOR BOOKING</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg">HOURS</h3>
                    <div className="space-y-2">
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
        <IntroductionSection />
        <OurStaff />
        <PriceList />
        <FeaturedCuts />
      </>
  );
};

export default LandingPage;