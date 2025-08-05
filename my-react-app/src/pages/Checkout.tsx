import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import mentorshipService from '../services/mentorshipService';
import paymentService from '../services/paymentService';
import { validateCardNumber, validateExpiryDate, validateCVV, formatCardNumber, formatExpiryDate } from '../config/stripe';

// Icons
const CreditCardIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const LockIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
  </svg>
);

const Checkout: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Payment form state
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  useEffect(() => {
    const fetchBooking = async () => {
      if (!bookingId) {
        setError('Booking ID is required');
        setLoading(false);
        return;
      }

      try {
        const data = await mentorshipService.getGuestBookingById(bookingId);
        setBooking(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch booking details');
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!booking) return;

    // Enhanced validation
    if (!paymentForm.cardNumber || !paymentForm.expiryDate || !paymentForm.cvv || !paymentForm.cardholderName) {
      setError('Please fill in all payment fields');
      return;
    }

    // Validate card details
    if (!validateCardNumber(paymentForm.cardNumber)) {
      setError('Please enter a valid card number');
      return;
    }

    if (!validateExpiryDate(paymentForm.expiryDate)) {
      setError('Please enter a valid expiry date');
      return;
    }

    if (!validateCVV(paymentForm.cvv)) {
      setError('Please enter a valid CVV');
      return;
    }

    try {
      setProcessing(true);
      setError(null);

      // Create payment intent with Stripe
      const paymentData = {
        bookingId: booking.guest_booking_id,
        amount: booking.session_price,
        currency: 'usd'
      };
      
      console.log('Sending payment data:', paymentData);
      console.log('Booking object:', booking);
      
      const paymentIntent = await paymentService.createGuestBookingPaymentIntent(paymentData);

      // In a production environment, you would use Stripe Elements here
      // For now, we'll simulate a successful payment confirmation
      const paymentMethodId = `pm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Confirm payment with Stripe
      const paymentResult = await paymentService.confirmGuestBookingPayment({
        paymentIntentId: paymentIntent.payment_intent_id,
        paymentMethodId: paymentMethodId
      });

      if (paymentResult.status === 'succeeded') {
        setPaymentSuccess(true);
        
        // Redirect to success page after 3 seconds
        setTimeout(() => {
          navigate('/mentorship-success', { 
            state: { 
              bookingId: booking.guest_booking_id,
              instructorName: booking.instructor?.first_name + ' ' + booking.instructor?.last_name,
              sessionDate: booking.preferred_date,
              sessionTime: booking.preferred_time
            }
          });
        }, 3000);
      } else {
        setError('Payment failed. Please try again.');
      }

    } catch (err: any) {
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  // Using imported format functions from stripe config

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-orange"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error && !booking) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => navigate('/mentorship')} 
              className="bg-luxury-orange text-white px-6 py-2 rounded-lg hover:bg-orange-600"
            >
              Back to Mentorship
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Payment Successful!</h2>
            <p className="text-green-600">Redirecting to confirmation page...</p>
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
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-luxury-black mb-4">Complete Your Booking</h1>
            <p className="text-lg text-gray-600">Secure payment for your mentorship session</p>
          </div>

                     <div className="grid lg:grid-cols-2 gap-8">
            {/* Booking Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-luxury-black mb-6">Booking Summary</h2>
              
              {booking && (
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <img 
                      src={booking.instructor?.profile_image_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"} 
                      alt="Instructor"
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="font-semibold text-luxury-black">
                        {booking.instructor?.first_name} {booking.instructor?.last_name}
                      </div>
                      <div className="text-sm text-gray-600">Your Mentor</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Customer:</span>
                      <span className="font-medium">{booking.customer_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{booking.customer_email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{new Date(booking.preferred_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{booking.preferred_time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">60 minutes</span>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-luxury-orange">${booking.session_price}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

                                      {/* Payment Form - Completely Clean */}
             <div className="bg-white rounded-xl shadow-lg p-6">
               <h2 className="text-2xl font-bold text-luxury-black mb-6">Payment Details</h2>
               
               <form onSubmit={handlePayment} className="space-y-6">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Card Number
                   </label>
                   <input
                     type="text"
                     value={paymentForm.cardNumber}
                     onChange={(e) => setPaymentForm(prev => ({ 
                       ...prev, 
                       cardNumber: formatCardNumber(e.target.value) 
                     }))}
                     className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-orange focus:border-transparent"
                     placeholder="1234 5678 9012 3456"
                     maxLength={19}
                     required
                   />
                 </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                                         <input
                       type="text"
                       value={paymentForm.expiryDate}
                       onChange={(e) => setPaymentForm(prev => ({ 
                         ...prev, 
                         expiryDate: formatExpiryDate(e.target.value) 
                       }))}
                       className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-orange focus:border-transparent"
                       placeholder="MM/YY"
                       maxLength={5}
                       required
                     />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                                         <input
                       type="text"
                       value={paymentForm.cvv}
                       onChange={(e) => setPaymentForm(prev => ({ 
                         ...prev, 
                         cvv: e.target.value.replace(/\D/g, '') 
                       }))}
                       className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-orange focus:border-transparent"
                       placeholder="123"
                       maxLength={4}
                       required
                     />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                                     <input
                     type="text"
                     value={paymentForm.cardholderName}
                     onChange={(e) => setPaymentForm(prev => ({ 
                       ...prev, 
                       cardholderName: e.target.value 
                     }))}
                     className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-orange focus:border-transparent"
                     placeholder="Card Holder Name"
                     required
                   />
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={processing}
                  className={`w-full py-3 px-6 rounded-lg font-medium text-lg transition-all flex items-center justify-center ${
                    processing
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-luxury-orange text-white hover:bg-orange-600'
                  }`}
                >
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <LockIcon className="w-5 h-5 mr-2" />
                      Pay ${booking?.session_price}
                    </>
                  )}
                </button>

                                 <p className="text-xs text-gray-500 text-center">
                   Your payment is secured with SSL encryption. We never store your card details.
                 </p>
                 
                 {/* Development Security Notice */}
                 {window.location.protocol === 'http:' && (
                   <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                     <p className="text-xs text-yellow-700 text-center">
                       <strong>Development Mode:</strong> You may see a security warning because this is running on HTTP for development. 
                       In production, this will use HTTPS and be fully secure.
                     </p>
                   </div>
                 )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout; 