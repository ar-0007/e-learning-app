import React, { useState } from 'react';
import guestCoursePurchaseService from '../services/guestCoursePurchaseService';
import guestSubscriptionService from '../services/guestSubscriptionService';
import courseService from '../services/courseService';

interface Course {
  course_id: string;
  title: string;
  price: number;
}

interface PurchaseModalProps {
  course: Course | null;
  onSuccess: (purchaseId: string) => void;
  onClose: () => void;
  isSubscription?: boolean;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({ 
  course, 
  onSuccess, 
  onClose, 
  isSubscription = false 
}) => {
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
      if (isSubscription) {
        // Use direct subscription API
        const subscriptionData = {
          customerName: formData.customerName,
          customerEmail: formData.customerEmail,
          customerPhone: formData.customerPhone,
          subscriptionType: '3_MONTH' as const // Default to 3-month subscription
        };
        
        const subscriptionResponse = await guestSubscriptionService.createGuestSubscription(subscriptionData);
        
        // Store subscription ID for checkout page
        sessionStorage.setItem('subscriptionId', subscriptionResponse.subscription_id);
        sessionStorage.setItem('isDirectSubscription', 'true');
        
        onSuccess(subscriptionResponse.subscription_id);
      } else if (course) {
        // Regular course purchase
        const purchaseData = {
          courseId: course.course_id,
          customerName: formData.customerName,
          customerEmail: formData.customerEmail,
          customerPhone: formData.customerPhone
        };
        
        const response = await guestCoursePurchaseService.createGuestCoursePurchase(purchaseData);
        onSuccess(response.purchase_id);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create purchase');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {isSubscription ? 'Monthly Subscription Details' : 'Purchase Details'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

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
              Phone Number
            </label>
            <input
              type="tel"
              id="customerPhone"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-orange focus:border-transparent"
              placeholder="Enter your phone number (optional)"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-luxury-orange text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : (isSubscription ? 'Continue to Payment' : 'Continue to Checkout')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseModal;