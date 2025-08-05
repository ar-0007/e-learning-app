import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MentorshipSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId, instructorName, sessionDate, sessionTime } = location.state || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <Header />

      <div className="container-custom py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your mentorship session has been successfully booked and payment processed.
          </p>

          {/* Booking Details */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-luxury-black mb-6">Session Details</h2>
            
            <div className="space-y-4 text-left">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Booking ID:</span>
                <span className="font-medium text-gray-900">{bookingId || 'N/A'}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Instructor:</span>
                <span className="font-medium text-gray-900">{instructorName || 'Your Instructor'}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium text-gray-900">
                  {sessionDate ? new Date(sessionDate).toLocaleDateString() : 'TBD'}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium text-gray-900">{sessionTime || 'TBD'}</span>
              </div>
              
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium text-gray-900">60 minutes</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">What's Next?</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div>
                  <p className="text-blue-900 font-medium">Check Your Email</p>
                  <p className="text-blue-700 text-sm">You'll receive a confirmation email with meeting details and instructions.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <p className="text-blue-900 font-medium">Prepare for Your Session</p>
                  <p className="text-blue-700 text-sm">Have your questions ready and ensure you have a stable internet connection.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div>
                  <p className="text-blue-900 font-medium">Join the Meeting</p>
                  <p className="text-blue-700 text-sm">Use the meeting link provided in your email 5 minutes before the scheduled time.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/mentorship')}
              className="bg-luxury-orange text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Book Another Session
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Back to Home
            </button>
          </div>

          {/* Contact Information */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Need help? Contact us at{' '}
              <a href="mailto:support@university.com" className="text-luxury-orange hover:underline">
                support@university.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MentorshipSuccess; 