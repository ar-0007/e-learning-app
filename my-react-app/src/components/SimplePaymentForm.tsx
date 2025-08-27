import React, { useState } from 'react';

interface SimplePaymentFormProps {
  amount: number;
  onPaymentSuccess: (paymentIntent: any) => void;
  onPaymentError: (error: string) => void;
  isProcessing: boolean;
}

const SimplePaymentForm: React.FC<SimplePaymentFormProps> = ({
  amount,
  onPaymentSuccess,
  onPaymentError,
  isProcessing
}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [processing, setProcessing] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (processing || isProcessing) return;

    // Basic validation
    if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
      onPaymentError('Please fill in all payment fields');
      return;
    }

    if (cardNumber.replace(/\s/g, '').length < 13) {
      onPaymentError('Please enter a valid card number');
      return;
    }

    if (cvv.length < 3) {
      onPaymentError('Please enter a valid CVV');
      return;
    }

    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onPaymentSuccess({
        id: `pi_dev_${Date.now()}`,
        status: 'succeeded'
      });
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Number
        </label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
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
            value={expiryDate}
            onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
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
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
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
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-orange focus:border-transparent"
          placeholder="John Doe"
          required
        />
      </div>

      <button
        type="submit"
        disabled={processing || isProcessing}
        className="w-full bg-gradient-to-r from-luxury-orange to-orange-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {processing || isProcessing ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing Payment...
          </div>
        ) : (
          `Pay $${amount.toFixed(2)}`
        )}
      </button>

      <div className="p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded text-sm">
        🧪 Development Mode: This is a simulated payment form.
        <div className="mt-2 text-xs">
          • No real payment will be processed<br/>
          • You can use any valid-looking card details<br/>
          • Payment will be simulated in 2 seconds
        </div>
      </div>
    </form>
  );
};

export default SimplePaymentForm;