import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SubscriptionSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subscriptionId, subscriptionType, customerEmail } = location.state || {};

  const getSubscriptionDetails = () => {
    switch (subscriptionType) {
      case '3_MONTH':
        return {
          duration: '3 Months',
          price: '$1200.00',
          description: 'All-Access Pass'
        };
      default:
        return {
          duration: '3 Months',
          price: '$1200.00',
          description: 'All-Access Pass'
        };
    }
  };

  const subscriptionDetails = getSubscriptionDetails();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <Header />

      <div className="container-custom py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-luxury-black mb-4">
            🎉 Subscription Activated!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Welcome to your all-access membership! You now have unlimited access to all courses.
          </p>

          {/* Subscription Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-luxury-black mb-4">Subscription Details</h2>
            <div className="space-y-3 text-left">
              {subscriptionId && (
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-600">Subscription ID:</span>
                  <span className="text-luxury-black font-mono text-sm">{subscriptionId}</span>
                </div>
              )}
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-medium text-gray-600">Plan:</span>
                <span className="text-luxury-black">{subscriptionDetails.description}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-medium text-gray-600">Duration:</span>
                <span className="text-luxury-black">{subscriptionDetails.duration}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-medium text-gray-600">Amount Paid:</span>
                <span className="text-luxury-orange font-bold">{subscriptionDetails.price}</span>
              </div>
              {customerEmail && (
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium text-gray-600">Email:</span>
                  <span className="text-luxury-black">{customerEmail}</span>
                </div>
              )}
            </div>
          </div>

          {/* What's Included */}
          <div className="bg-luxury-orange bg-opacity-10 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-luxury-black mb-4">What's Included in Your Subscription</h3>
            <ul className="space-y-3 text-left">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Access to ALL courses (current and future)</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Downloadable resources and templates</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Priority support and mentorship</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Early access to new content</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Certificate of completion for all courses</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => navigate('/courses')}
              className="w-full bg-luxury-orange text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
              Start Learning Now
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Back to Home
            </button>
          </div>

          {/* Support Information */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Need help getting started? Contact our support team at{' '}
              <a href="mailto:support@example.com" className="text-luxury-orange hover:underline">
                support@example.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SubscriptionSuccess;