import React, { useState } from 'react';
import { Facebook, Menu, X, Search } from 'lucide-react';

// Import images
import logo from '../assets/images/blustyles_logo.jpg';
import logoTransparent from '../assets/images/bluestyles_logo'
import cut01 from '../assets/images/bluestlyes_cut_01.jpg';
import cut02 from '../assets/images/blustyles_cut_02.jpg';
import cutType01 from '../assets/images/blustyles_cuttype_01.jpg';
import cutType02 from '../assets/images/blustyles_cuttype_02.jpg';
import cutType03 from '../assets/images/blustyles_cuttype_03.jpg';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Main content */}
      <div className="min-h-screen">
        {/* Header */}
        <header className="p-4 flex justify-between items-center">
          <div className="w-16 h-16 bg-black flex items-center justify-center overflow-hidden rounded-full">
            <img src={logo} alt="Blu Styles Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex space-x-4">
            <button className="p-2">
              <Search className="h-6 w-6" />
            </button>
            <button className="p-2" onClick={toggleMenu}>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex flex-col items-center text-center p-8">
          <h1 className="text-5xl font-bold mb-4">Blu Styles Barbershop</h1>
          <p className="text-xl mb-8">"WE WANT YOU TO LEAVE BETTER THAN YOU CAME!"</p>
          <button className="bg-white text-black px-6 py-2 rounded mb-12">CALL US TODAY</button>

          {/* Featured cuts */}
          <div className="w-full max-w-4xl">
            <h2 className="text-3xl font-semibold mb-6">Our Signature Cuts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img src={cut01} alt="Signature Cut 1" className="w-full h-64 object-cover rounded-lg mb-4" />
                <p className="text-lg">Classic Fade</p>
              </div>
              <div>
                <img src={cut02} alt="Signature Cut 2" className="w-full h-64 object-cover rounded-lg mb-4" />
                <p className="text-lg">Modern Pompadour</p>
              </div>
            </div>
          </div>

          {/* Cut types */}
          <div className="w-full max-w-4xl mt-16">
            <h2 className="text-3xl font-semibold mb-6">Styles We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <img src={cutType01} alt="Cut Type 1" className="w-full h-48 object-cover rounded-lg mb-4" />
                <p className="text-lg">Taper Fade</p>
              </div>
              <div>
                <img src={cutType02} alt="Cut Type 2" className="w-full h-48 object-cover rounded-lg mb-4" />
                <p className="text-lg">Textured Crop</p>
              </div>
              <div>
                <img src={cutType03} alt="Cut Type 3" className="w-full h-48 object-cover rounded-lg mb-4" />
                <p className="text-lg">Slick Back</p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-4 mt-16 flex flex-col md:flex-row justify-between items-center text-sm bg-black">
          <div className="mb-4 md:mb-0">
            <p>223 E COMMERCIAL ST, SPRINGFIELD, MO,</p>
            <p>UNITED STATES, MISSOURI</p>
          </div>
          <div className="text-center mb-4 md:mb-0">
            <p className="text-blue-400">417-227-0001</p>
            <p>FOR BOOKING</p>
          </div>
          <div className="text-center md:text-right">
            <p>MONDAY THROUGH SATURDAY 9 AM - 5 PM</p>
            <p>SUNDAY CLOSED</p>
          </div>
        </footer>
      </div>

      {/* Sliding menu */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-black p-8 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button onClick={toggleMenu} className="absolute top-4 right-4">
          <X className="h-6 w-6" />
        </button>
        <nav className="mt-12">
          <ul className="space-y-4">
            <li><a href="#" className="hover:text-gray-300">HOME</a></li>
            <li><a href="#" className="hover:text-gray-300">FEATURES</a></li>
            <li><a href="#" className="hover:text-gray-300">BLOG</a></li>
            <li><a href="#" className="hover:text-gray-300">ABOUT</a></li>
            <li><a href="#" className="hover:text-gray-300">SHOP</a></li>
            <li><a href="#" className="hover:text-gray-300">CONTACT US</a></li>
          </ul>
        </nav>
        <div className="absolute bottom-8 left-8">
          <Facebook size={24} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;