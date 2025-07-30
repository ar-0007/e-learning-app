import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-luxury-black text-white py-12">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="Luxury Auto Spa" className="w-12 h-12 object-contain rounded-lg" />
              <span className="text-xl font-bold text-white">Luxury Auto Spa</span>
            </Link>
            <p className="text-gray-400">
              Empowering the next generation of car detailing professionals with expert training and mentorship.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/services" className="hover:text-luxury-orange transition-colors">Paint Protection Film</Link></li>
              <li><Link to="/services" className="hover:text-luxury-orange transition-colors">Ceramic Coating</Link></li>
              <li><Link to="/services" className="hover:text-luxury-orange transition-colors">Mobile Detailing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Learning</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/courses" className="hover:text-luxury-orange transition-colors">Courses</Link></li>
              <li><Link to="/mentorship" className="hover:text-luxury-orange transition-colors">Mentorship</Link></li>
              <li><Link to="#" className="hover:text-luxury-orange transition-colors">Certification</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/contact" className="hover:text-luxury-orange transition-colors">Contact</Link></li>
              <li><Link to="#" className="hover:text-luxury-orange transition-colors">Help Center</Link></li>
              <li><Link to="#" className="hover:text-luxury-orange transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Luxury Auto Spa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 