import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Luxury Auto Spa" className="w-12 h-12 object-contain rounded-lg" />
            <span className="text-xl font-bold text-luxury-black">Luxury Auto Spa</span>
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-luxury-orange transition-colors">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-luxury-orange transition-colors">About</Link>
            <Link to="/services" className="text-gray-700 hover:text-luxury-orange transition-colors">Services</Link>
            <Link to="/courses" className="text-gray-700 hover:text-luxury-orange transition-colors">Courses</Link>
            <Link to="/contact" className="text-gray-700 hover:text-luxury-orange transition-colors">Contact</Link>
          </div>
          <button className="btn-primary">Book Appointment</button>
        </div>
      </div>
    </nav>
  );
};

export default Header; 