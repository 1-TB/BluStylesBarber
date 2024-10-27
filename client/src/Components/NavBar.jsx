import React, { useState } from 'react';
import { Menu, X, Facebook } from 'lucide-react';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger Menu Button */}
      <button 
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 p-2 rounded-lg hover:bg-gray-100"
      >
        {isMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Sliding menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black p-8 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="mt-12">
          <ul className="space-y-4">
            {[
              'HOME',
              'OUR CUTS',
              'ABOUT',
              'CONTACT US'
            ].map((item) => (
              <li key={item}>
                <a 
                  href="#" 
                  className="text-white hover:text-gray-300 transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-8 left-8">
          <Facebook className="text-white hover:text-gray-300 cursor-pointer" size={24} />
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default NavBar;