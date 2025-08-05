import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface StripePaymentFormProps {
  amount: number;
  onPaymentSuccess: (paymentIntent: any) => void;
  onPaymentError: (error: string) => void;
  isProcessing: boolean;
  clientSecret?: string;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  amount,
  onPaymentSuccess,
  onPaymentError,
  isProcessing,
  clientSecret
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Always use development mode for now since Stripe is blocked
    console.log('Using development mode payment');
    
    // Simulate payment processing
    setTimeout(() => {
      onPaymentSuccess({
        id: `pi_dev_${Date.now()}`,
        status: 'succeeded'
      });
    }, 2000);
    
    return;

    // Original Stripe code (commented out for now)
    /*
    if (!stripe || !elements) {
      console.log('Stripe not available, using development mode');
      setTimeout(() => {
        onPaymentSuccess({
          id: `pi_dev_${Date.now()}`,
          status: 'succeeded'
        });
      }, 2000);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      onPaymentError('Card element not found.');
      return;
    }

    setCardError(null);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret!, {
        payment_method: {
          card: cardElement,
          billing_details: {},
        },
      });

      if (error) {
        setCardError(error.message || 'Payment failed');
        onPaymentError(error.message || 'Payment failed');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onPaymentSuccess(paymentIntent);
      } else {
        onPaymentError('Payment was not successful');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      if (error.message?.includes('Failed to fetch') || error.message?.includes('ERR_BLOCKED_BY_CLIENT')) {
        console.log('Stripe blocked, using development mode');
        setTimeout(() => {
          onPaymentSuccess({
            id: `pi_dev_${Date.now()}`,
            status: 'succeeded'
          });
        }, 2000);
      } else {
        onPaymentError(error.message || 'An unexpected error occurred');
      }
    }
    */
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Details (Optional in Development)
        </label>
        <div className="border border-gray-300 rounded-md p-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
          <CardElement options={cardElementOptions} />
        </div>
        {cardError && (
          <p className="text-red-600 text-sm mt-1">{cardError}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          💡 In development mode, you can skip entering card details
        </p>
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-gradient-to-r from-luxury-orange to-orange-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {isProcessing ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing Payment...
          </div>
        ) : (
          `Simulate Payment $${amount}`
        )}
      </button>

      <div className="p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded text-sm">
        🧪 Development Mode: Using simulated payment processing.
        <div className="mt-2 text-xs">
          • No real payment will be processed<br/>
          • Card details are not required<br/>
          • Payment will be simulated in 2 seconds
        </div>
      </div>
    </form>
  );
};

export default StripePaymentForm; 