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
      <header className="absolute top-0 left-0 right-0 z-50 p-4 flex justify-between items-center">
        <div className="w-24 h-24">
          <img 
            src={logoTransparent} 
            alt="Blu Styles Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex items-center space-x-6">
          <NavBar />
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
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 italic" style={{ 
            fontFamily: 'cursive',
            background: 'linear-gradient(to right, #e2e8f0, #ffffff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Blu Styles
          </h1>
          <h2 className="text-5xl md:text-6xl font-bold mb-8 italic" style={{ 
            fontFamily: 'cursive',
            background: 'linear-gradient(to right, #e2e8f0, #ffffff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Barbershop
          </h2>
          <p className="text-xl mb-8 tracking-wider">
            "WE WANT YOU TO LEAVE BETTER THAN YOU CAME!"
          </p>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded transition-colors duration-200">
            CALL US TODAY
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 bg-transparent text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Address */}
            <div>
              <h3 className="font-bold mb-2">ADDRESS</h3>
              <p>223 E COMMERCIAL</p>
              <p>ST, SPRINGFIELD, MO,</p>
              <p>UNITED STATES,</p>
              <p>MISSOURI</p>
            </div>

            {/* Call Us */}
            <div>
              <h3 className="font-bold mb-2">CALL US</h3>
              <p className="text-xl mb-1">417-227-0001</p>
              <p>FOR BOOKING</p>
            </div>

            {/* Hours */}
            <div>
              <h3 className="font-bold mb-2">HOURS</h3>
              <p>MONDAY THROUGH</p>
              <p>SATURDAY 9 AM - 5 PM</p>
              <p>SUNDAY CLOSED</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;