import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Header from '../components/Header';
import Footer from '../components/Footer';
import guestCoursePurchaseService, { type GuestCoursePurchase } from '../services/guestCoursePurchaseService';
import paymentService from '../services/paymentService';
import StripePaymentForm from '../components/StripePaymentForm';

// Initialize Stripe (replace with your publishable key)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_publishable_key_here');

// Real payment form wrapper
const PaymentFormWrapper: React.FC<{
  amount: number;
  onPaymentSuccess: (paymentIntent: any) => void;
  onPaymentError: (error: string) => void;
  isProcessing: boolean;
  clientSecret?: string;
}> = ({ amount, onPaymentSuccess, onPaymentError, isProcessing, clientSecret }) => {
  return (
    <Elements stripe={stripePromise}>
      <StripePaymentForm
        amount={amount}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
        isProcessing={isProcessing}
        clientSecret={clientSecret}
      />
    </Elements>
  );
};

const CourseCheckout: React.FC = () => {
  const { purchaseId } = useParams<{ purchaseId: string }>();
  const navigate = useNavigate();
  const [purchase, setPurchase] = useState<GuestCoursePurchase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const fetchPurchase = async () => {
      if (!purchaseId) {
        setError('Purchase ID is required');
        setLoading(false);
        return;
      }

      try {
        const data = await guestCoursePurchaseService.getGuestCoursePurchaseById(purchaseId);
        setPurchase(data);
        
        // Create payment intent for real payment
        if (data) {
          try {
            const paymentIntent = await paymentService.createGuestCoursePaymentIntent(
              data.purchase_id,
              data.course_price
            );
            setClientSecret(paymentIntent.client_secret);
          } catch (paymentError: any) {
            console.error('Failed to create payment intent:', paymentError);
            // Fall back to development mode if payment intent creation fails
            setClientSecret('dev_mode');
          }
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load purchase details');
      } finally {
        setLoading(false);
      }
    };

    fetchPurchase();
  }, [purchaseId]);

  const handlePaymentSuccess = async (paymentIntent: any) => {
    if (!purchase) return;

    setProcessingPayment(true);
    try {
      // Update payment status to PAID
      await guestCoursePurchaseService.updatePaymentStatus(
        purchase.purchase_id,
        'PAID',
        'stripe',
        paymentIntent.id
      );

      // Navigate to success page
      navigate('/course-success', { 
        state: { 
          purchaseId: purchase.purchase_id,
          accessCode: purchase.access_code,
          courseTitle: purchase.course?.title
        }
      });
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setProcessingPayment(false);
    }
  };

  const handlePaymentError = (error: string) => {
    setError(error);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-orange mx-auto mb-4"></div>
            <p className="text-gray-600">Loading checkout...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !purchase) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error || 'Purchase not found'}</p>
            <button 
              onClick={() => navigate('/courses')} 
              className="btn-primary"
            >
              Back to Courses
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-luxury-black mb-4">Complete Your Purchase</h1>
            <p className="text-lg text-gray-600">You're just one step away from accessing your course</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Course Details */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-luxury-black mb-4">Course Details</h2>
              
              {purchase.course && (
                <div className="space-y-4">
                  <div className="h-48 bg-gray-200 rounded-lg overflow-hidden">
                    <img 
                      src={purchase.course.thumbnail_url || "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop"} 
                      alt={purchase.course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-luxury-black mb-2">{purchase.course.title}</h3>
                    <p className="text-gray-600 mb-3">{purchase.course.description}</p>
                    
                    {purchase.course.instructor && (
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-luxury-orange rounded-full flex items-center justify-center mr-2">
                          <span className="text-white font-bold text-xs">
                            {purchase.course.instructor.first_name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-luxury-black">
                            {purchase.course.instructor.first_name} {purchase.course.instructor.last_name}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Customer Details */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-bold text-luxury-black mb-3">Customer Information</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Name:</strong> {purchase.customer_name}</div>
                  <div><strong>Email:</strong> {purchase.customer_email}</div>
                  {purchase.customer_phone && (
                    <div><strong>Phone:</strong> {purchase.customer_phone}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-luxury-black mb-4">Payment Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Course Price</span>
                  <span className="font-semibold">${purchase.course_price}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">$0.00</span>
                </div>
                <div className="flex justify-between items-center py-2 text-lg font-bold">
                  <span>Total</span>
                  <span className="text-luxury-orange">${purchase.course_price}</span>
                </div>
              </div>

              {/* What you'll get */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-luxury-black mb-3">What you'll get:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Complete course content with video lessons
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Downloadable resources and materials
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Certificate of completion
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Lifetime access to course updates
                  </li>
                </ul>
              </div>

              {/* Payment Form */}
              {clientSecret && (
                <PaymentFormWrapper
                  amount={purchase.course_price}
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                  isProcessing={processingPayment}
                  clientSecret={clientSecret}
                />
              )}
              
              {!clientSecret && !loading && (
                <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded">
                  Loading payment form...
                </div>
              )}

              {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              <p className="text-xs text-gray-500 mt-4 text-center">
                By completing this purchase, you agree to our terms of service and privacy policy.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseCheckout; 