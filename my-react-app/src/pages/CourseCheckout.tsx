import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import guestCoursePurchaseService, { type GuestCoursePurchase } from '../services/guestCoursePurchaseService';
import guestSubscriptionService, { type GuestSubscription } from '../services/guestSubscriptionService';
import paymentService from '../services/paymentService';
import SimplePaymentForm from '../components/SimplePaymentForm';

// Simple payment form wrapper for development
const PaymentFormWrapper: React.FC<{
  amount: number;
  onPaymentSuccess: (paymentIntent: any) => void;
  onPaymentError: (error: string) => void;
  isProcessing: boolean;
}> = ({ amount, onPaymentSuccess, onPaymentError, isProcessing }) => {
  return (
    <SimplePaymentForm
      amount={amount}
      onPaymentSuccess={onPaymentSuccess}
      onPaymentError={onPaymentError}
      isProcessing={isProcessing}
    />
  );
};

const CourseCheckout: React.FC = () => {
  const { purchaseId } = useParams<{ purchaseId: string }>();
  const navigate = useNavigate();
  const [purchase, setPurchase] = useState<GuestCoursePurchase | null>(null);
  const [subscription, setSubscription] = useState<GuestSubscription | null>(null);
  const [isDirectSubscription, setIsDirectSubscription] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [membershipSelected, setMembershipSelected] = useState(false);
  const [membershipPrice, setMembershipPrice] = useState(0);

  // Calculate total price
  const getTotalPrice = () => {
    if (isDirectSubscription && subscription) {
      return subscription.price;
    }
    const coursePrice = parseFloat(String(purchase?.course_price || '0'));
    // For 3-month membership, it replaces the course price (all-access pass)
    return membershipSelected ? membershipPrice : coursePrice;
  };

  // Payment intent creation is now handled directly in the payment form
  // since we're using a simulated payment system for development

  useEffect(() => {
    const fetchData = async () => {
      // Check URL parameters first
      const urlParams = new URLSearchParams(window.location.search);
      const subscriptionParam = urlParams.get('subscription');
      const membershipParam = urlParams.get('membership');
      const membershipTypeParam = urlParams.get('type');
      
      // Check if this is a direct subscription purchase (from URL or sessionStorage)
      const directSubscription = sessionStorage.getItem('isDirectSubscription') === 'true' || subscriptionParam === 'true';
      const subscriptionId = sessionStorage.getItem('subscriptionId') || (subscriptionParam === 'true' ? purchaseId : null);
      
      if (directSubscription && subscriptionId) {
        // Handle direct subscription
        setIsDirectSubscription(true);
        try {
          const subscriptionData = await guestSubscriptionService.getSubscriptionById(subscriptionId);
          setSubscription(subscriptionData);
          
          // Clear session storage after use
          sessionStorage.removeItem('isDirectSubscription');
          sessionStorage.removeItem('subscriptionId');
        } catch (err: any) {
          setError(err.message || 'Failed to load subscription details');
        } finally {
          setLoading(false);
        }
        return;
      }
      
      // Handle course purchase
      if (!purchaseId) {
        setError('Purchase ID is required');
        setLoading(false);
        return;
      }
      
      // Also check sessionStorage for monthly subscription flag
      const isMonthlySubscription = sessionStorage.getItem('isMonthlySubscription') === 'true';
      
      if (membershipParam === 'true') {
        setMembershipSelected(true);
        if (membershipTypeParam === '3_MONTH') {
          setMembershipPrice(1200);
        } else if (membershipTypeParam === 'MONTHLY') {
          setMembershipPrice(49.99);
        }
      } else if (isMonthlySubscription) {
        // Handle monthly subscription from header button
        setMembershipSelected(true);
        setMembershipPrice(49.99);
        // Clear the flag after using it
        sessionStorage.removeItem('isMonthlySubscription');
      }

      try {
        const data = await guestCoursePurchaseService.getGuestCoursePurchaseById(purchaseId);
        setPurchase(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load purchase details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [purchaseId]);

  // Payment form will automatically use the updated total price
  // when membership selection changes

  const handlePaymentSuccess = async (paymentIntent: any) => {
    setProcessingPayment(true);
    try {
      if (isDirectSubscription && subscription) {
        // Update subscription payment status
        await guestSubscriptionService.updatePaymentStatus(
          subscription.subscription_id,
          {
            paymentStatus: 'PAID',
            paymentMethod: 'stripe',
            transactionId: paymentIntent.id
          }
        );

        // Navigate to subscription success page
        navigate('/subscription-success', { 
          state: { 
            subscriptionId: subscription.subscription_id,
            subscriptionType: subscription.subscription_type,
            customerEmail: subscription.customer_email
          }
        });
      } else if (purchase) {
        // Update course purchase payment status
        await guestCoursePurchaseService.updatePaymentStatus(
          purchase.purchase_id,
          {
            paymentStatus: 'PAID',
            paymentMethod: 'stripe',
            transactionId: paymentIntent.id
          }
        );

        // Navigate to course success page
        navigate('/course-success', { 
          state: { 
            purchaseId: purchase.purchase_id,
            accessCode: purchase.access_code,
            courseTitle: purchase.course?.title
          }
        });
      }
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

  if (error || (!purchase && !subscription)) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error || (isDirectSubscription ? 'Subscription not found' : 'Purchase not found')}</p>
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
            {/* Details Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              {isDirectSubscription && subscription ? (
                // Subscription Details
                <>
                  <h2 className="text-2xl font-bold text-luxury-black mb-4">Subscription Details</h2>
                  
                  <div className="space-y-4">
                    <div className="h-48 bg-gradient-to-br from-luxury-orange/20 to-luxury-orange/10 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-luxury-orange rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-luxury-black">3-Month All-Access Pass</h3>
                        <p className="text-gray-600 mt-2">Unlimited access to all courses</p>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <h4 className="font-bold text-green-800 mb-2">What's Included:</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Access to ALL courses (current and future)</li>
                        <li>• Downloadable resources and templates</li>
                        <li>• Priority support and mentorship</li>
                        <li>• Early access to new content</li>
                        <li>• Certificate of completion for all courses</li>
                        <li>• 3-month unlimited access</li>
                      </ul>
                    </div>
                  </div>

                  {/* Customer Details */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-bold text-luxury-black mb-3">Customer Information</h3>
                    <div className="space-y-2 text-sm">
                      <div><strong>Name:</strong> {subscription.customer_name}</div>
                      <div><strong>Email:</strong> {subscription.customer_email}</div>
                      {subscription.customer_phone && (
                        <div><strong>Phone:</strong> {subscription.customer_phone}</div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                // Course Details
                <>
                  <h2 className="text-2xl font-bold text-luxury-black mb-4">Course Details</h2>
                  
                  {purchase?.course && (
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
                      <div><strong>Name:</strong> {purchase?.customer_name}</div>
                      <div><strong>Email:</strong> {purchase?.customer_email}</div>
                      {purchase?.customer_phone && (
                        <div><strong>Phone:</strong> {purchase.customer_phone}</div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Payment Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              {/* Membership Offer Section - Only show for course purchases */}
              {!isDirectSubscription && (
                <div className="mb-6 p-4 bg-gradient-to-r from-luxury-orange/10 to-luxury-orange/5 rounded-lg border border-luxury-orange/20">
                  <h3 className="text-lg font-bold text-luxury-black mb-3">
                    {membershipSelected ? '🎯 3-Month All-Access Pass Selected' : '🎓 Special Offer: Add Membership'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {membershipSelected 
                      ? 'You have selected the 3-Month All-Access Pass which unlocks all courses for one payment of $1200.'
                      : 'Get unlimited access to all courses, exclusive content, and premium features with our 3-month membership.'
                    }
                  </p>
                  
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="membership-checkbox"
                        checked={membershipSelected}
                        onChange={(e) => {
                        setMembershipSelected(e.target.checked);
                        setMembershipPrice(e.target.checked ? 1200 : 0);
                      }}
                        className="w-4 h-4 text-luxury-orange bg-gray-100 border-gray-300 rounded focus:ring-luxury-orange focus:ring-2"
                      />
                      <label htmlFor="membership-checkbox" className="ml-3 text-sm font-medium text-gray-900">
                        {membershipSelected ? '3-Month All-Access Pass' : 'Add 3-Month Membership'}
                      </label>
                    </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-luxury-orange">$1200.00</span>
                    <div className="text-xs text-gray-500">one-time</div>
                  </div>
                </div>
                
                {membershipSelected && (
                  <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center text-green-800">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium">Membership added to your purchase!</span>
                    </div>
                    <ul className="mt-2 text-xs text-green-700 space-y-1">
                      <li>• Access to ALL courses (current and future)</li>
                      <li>• Downloadable resources and templates</li>
                      <li>• Priority support and mentorship</li>
                      <li>• Early access to new content</li>
                      <li>• 3-month unlimited access</li>
                    </ul>
                  </div>
                )}
              </div>
              )}

              <h2 className="text-2xl font-bold text-luxury-black mb-4">Payment Summary</h2>
              
              <div className="space-y-4 mb-6">
                {isDirectSubscription && subscription ? (
                  // Direct subscription payment summary
                  <>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">3-Month All-Access Pass</span>
                      <span className="font-semibold">${subscription.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-semibold">$0.00</span>
                    </div>
                    <div className="flex justify-between items-center py-2 text-lg font-bold">
                      <span>Total</span>
                      <span className="text-luxury-orange">${subscription.price.toFixed(2)}</span>
                    </div>
                  </>
                ) : (
                  // Course purchase payment summary
                  <>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Course Price</span>
                      <span className="font-semibold">${purchase?.course_price}</span>
                    </div>
                    {membershipSelected && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600">Membership</span>
                        <span className="font-semibold">${membershipPrice.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-semibold">$0.00</span>
                    </div>
                    <div className="flex justify-between items-center py-2 text-lg font-bold">
                      <span>Total</span>
                      <span className="text-luxury-orange">${getTotalPrice().toFixed(2)}</span>
                    </div>
                  </>
                )}
              </div>

              {/* What you'll get */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-luxury-black mb-3">What you'll get:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {isDirectSubscription ? (
                    // Benefits for direct subscription
                    <>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Access to ALL courses (current and future)
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Downloadable resources and templates
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Priority support and mentorship
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Early access to new content
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        3-month unlimited access
                      </li>
                    </>
                  ) : (
                    // Benefits for course purchase
                    <>
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
                      {membershipSelected && (
                        <li className="flex items-center text-luxury-orange font-medium">
                          <svg className="w-4 h-4 text-luxury-orange mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          + 3-Month All-Access Pass to ALL courses
                        </li>
                      )}
                    </>
                  )}
                </ul>
              </div>

              {/* Payment Form */}
              <PaymentFormWrapper
                amount={getTotalPrice()}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
                isProcessing={processingPayment}
              />

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