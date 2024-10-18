import React, { useState } from 'react';
import { Facebook, Menu, X, Search } from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="relative h-screen bg-gray-900 text-white overflow-hidden">
      {/* Main content */}
      <div className="h-full">
        {/* Header */}
        <header className="p-4 flex justify-between items-center">
          <div className="w-12 h-12 bg-black flex items-center justify-center">
            <span className="text-xs">Blu Styles</span>
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
        <main className="flex-1 flex flex-col justify-center items-center text-center p-8">
          <h1 className="text-5xl font-bold mb-4">Blu Styles Barbershop</h1>
          <p className="text-xl mb-8">"WE WANT YOU TO LEAVE BETTER THAN YOU CAME!"</p>
          <button className="bg-white text-black px-6 py-2 rounded">CALL US TODAY</button>
        </main>

        {/* Footer */}
        <footer className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center text-sm">
          <div>
            <p>223 E COMMERCIAL ST, SPRINGFIELD, MO,</p>
            <p>UNITED STATES, MISSOURI</p>
          </div>
          <div className="text-center">
            <p className="text-blue-400">417-227-0001</p>
            <p>FOR BOOKING</p>
          </div>
          <div className="text-right">
            <p>MONDAY THROUGH</p>
            <p>SATURDAY 9 AM - 5 PM</p>
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