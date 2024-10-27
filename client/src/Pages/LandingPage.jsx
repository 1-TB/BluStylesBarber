import React from 'react';
import { Search } from 'lucide-react';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import logoTransparent from '../assets/images/blustyles_logo_transparent.png';
import cutBackground from '../assets/images/blustyles_cut_01.jpg';

const LandingPage = () => {
  return (
      <div className="relative min-h-screen bg-black text-white">
        {/* Header with Logo and Icons */}
        <header className="absolute top-0 left-0 right-0 z-50 p-4">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="w-20 h-20 md:w-24 md:h-24">
              <img
                  src={logoTransparent}
                  alt="Blu Styles Logo"
                  className="w-full h-full object-contain"
              />
            </div>
            <div className="flex items-center">
              <NavBar />
            </div>
          </div>
        </header>

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

                <button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded transition-colors duration-200">
                  CALL US TODAY
                </button>
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
      </div>
  );
};

export default LandingPage;