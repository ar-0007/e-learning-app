import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import guestSubscriptionService from '../services/guestSubscriptionService';

interface SubscriptionModalProps {
  visible: boolean;
  onClose: () => void;
  course?: {
    course_id: string;
    title: string;
    price: number;
  } | null;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ visible, onClose, course }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validate form data
      if (!formData.customerName.trim() || !formData.customerEmail.trim()) {
        throw new Error('Customer name and email are required');
      }

      // Create guest subscription
      const subscriptionData = {
        customerName: formData.customerName.trim(),
        customerEmail: formData.customerEmail.trim(),
        customerPhone: formData.customerPhone.trim(),
        subscriptionType: '3_MONTH' as const
      };

      const response = await guestSubscriptionService.createGuestSubscription(subscriptionData);
      
      // Navigate to checkout with subscription ID
      navigate(`/course-checkout/${response.subscription_id}?subscription=true&type=3_MONTH`);
      onClose();
    } catch (err: any) {
      console.error('Subscription creation error:', err);
      setError(err.message || 'Failed to create subscription. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      customerName: '',
      customerEmail: '',
      customerPhone: ''
    });
    setError('');
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">3-Month All-Access Pass</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Course Info (if provided) */}
          {course && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">{course.title}</h3>
              <p className="text-sm text-gray-600">Starting with this course, plus access to all other courses</p>
            </div>
          )}

          {/* Subscription Benefits */}
          <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-luxury-orange">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">🎯 3-Month All-Access Pass</h3>
              <div className="bg-luxury-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
                ALL COURSES
              </div>
            </div>
            
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-luxury-orange mb-2">$1200.00</div>
              <p className="text-sm text-gray-600">One-time payment • 3 months access</p>
            </div>
            
            <div className="space-y-2 mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">What's included:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Instant access to ALL courses (worth $500+)</li>
                <li>• No additional course fees for 3 months</li>
                <li>• Exclusive member-only content and tutorials</li>
                <li>• Priority support and community access</li>
                <li>• Monthly live Q&A sessions with experts</li>
                <li>• Downloadable resources and templates</li>
                <li>• Early access to new courses</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-orange focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="customerEmail"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-orange focus:border-transparent"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                id="customerPhone"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-orange focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-luxury-orange text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Continue to Payment - $1200.00'}
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            By continuing, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;