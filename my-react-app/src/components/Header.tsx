import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import guestCoursePurchaseService from '../services/guestCoursePurchaseService';
import PurchaseModal from './PurchaseModal';

const Header: React.FC = () => {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const navigate = useNavigate();

  const handleEnrollNow = () => {
    setShowSubscriptionModal(true);
  };

  const handleSubscribeMonthly = () => {
    setShowSubscriptionModal(false);
    setShowPurchaseModal(true);
  };

  const handlePurchaseSuccess = async (purchaseId: string) => {
    setShowPurchaseModal(false);
    setShowSubscriptionModal(false);
    // Navigate to checkout with monthly membership parameters
    navigate(`/course-checkout/${purchaseId}?membership=true&type=MONTHLY`);
  };

  const handleCloseModal = () => {
    setShowPurchaseModal(false);
  };

  const handleCloseSubscriptionModal = () => {
    setShowSubscriptionModal(false);
  };

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="LAS Detailers University" className="w-12 h-12 object-contain rounded-lg" />
              <span className="text-xl font-bold text-luxury-black">LAS Detailers University</span>
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-luxury-orange transition-colors">Home</Link>
              <Link to="/Courses" className="text-gray-700 hover:text-luxury-orange transition-colors">Courses</Link>
              <Link to="/mentorship" className="text-gray-700 hover:text-luxury-orange transition-colors">Mentorship</Link>
              <Link to="/about" className="text-gray-700 hover:text-luxury-orange transition-colors">About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-luxury-orange transition-colors">Contact</Link>
            </div>
            <button onClick={handleEnrollNow} className="btn-primary">Enroll Now</button>
          </div>
        </div>
      </nav>

      {/* Monthly Subscription Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Monthly All-Access Pass</h2>
              <button
                onClick={handleCloseSubscriptionModal}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            {/* Subscription Offer */}
            <div className="border-2 border-luxury-orange rounded-lg p-6 mb-6 bg-gradient-to-r from-orange-50 to-yellow-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">🎯 Monthly Subscription</h3>
                <div className="bg-luxury-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ALL COURSES
                </div>
              </div>
              
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-luxury-orange mb-2">$49.99/month</div>
                <p className="text-sm text-gray-600">Billed monthly • Cancel anytime</p>
              </div>
              
              <div className="space-y-2 mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">What's included:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Access to all current and future courses</li>
                  <li>• HD video streaming on all devices</li>
                  <li>• Certificate of completion for each course</li>
                  <li>• Priority customer support</li>
                  <li>• Downloadable resources and templates</li>
                  <li>• Monthly live Q&A sessions</li>
                </ul>
              </div>

              <button
                onClick={handleSubscribeMonthly}
                className="w-full bg-luxury-orange text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition-all"
              >
                Start Monthly Subscription - $1200/month
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <PurchaseModal
          course={null} // No specific course for subscription
          onSuccess={handlePurchaseSuccess}
          onClose={handleCloseModal}
          isSubscription={true}
        />
      )}
    </>
  );
};

export default Header;