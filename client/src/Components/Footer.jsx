import React from 'react';
import { Phone, Clock, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white p-8 mt-16">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
          {/* Address Section */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="h-5 w-5 text-blue-400" />
              <span className="font-semibold">OUR LOCATION</span>
            </div>
            <p className="text-gray-300">223 E COMMERCIAL ST,</p>
            <p className="text-gray-300">SPRINGFIELD, MO,</p>
            <p className="text-gray-300">UNITED STATES, MISSOURI</p>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <Phone className="h-5 w-5 text-blue-400" />
              <span className="font-semibold">CONTACT US</span>
            </div>
            <a 
              href="tel:417-227-0001" 
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-lg"
            >
              417-227-0001
            </a>
            <p className="text-gray-300">FOR BOOKING</p>
          </div>

          {/* Hours Section */}
          <div className="flex flex-col space-y-2 text-right">
            <div className="flex items-center justify-end space-x-2 mb-2">
              <Clock className="h-5 w-5 text-blue-400" />
              <span className="font-semibold">HOURS</span>
            </div>
            <p className="text-gray-300">MONDAY - SATURDAY</p>
            <p className="text-gray-300">9 AM - 5 PM</p>
            <p className="text-gray-300">SUNDAY CLOSED</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Your Business Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;