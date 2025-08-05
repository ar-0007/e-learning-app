// src/services/paymentService.ts
import api from './api';

export interface PaymentIntentData {
  bookingId: string;
  amount: number;
  currency?: string;
}

export interface CoursePaymentIntentData {
  purchaseId: string;
  amount: number;
  currency?: string;
}

export interface PaymentIntentResponse {
  client_secret: string;
  payment_intent_id: string;
  amount: number;
  currency: string;
  payment_id: string;
}

export interface PaymentConfirmData {
  paymentIntentId: string;
  paymentMethodId: string;
}

class PaymentService {
  private baseURL = '/payments';

  /**
   * Create a payment intent for guest booking
   */
  async createGuestBookingPaymentIntent(data: PaymentIntentData): Promise<PaymentIntentResponse> {
    try {
      console.log('PaymentService: Sending request to:', `${this.baseURL}/guest-booking-intent`);
      console.log('PaymentService: Request data:', data);
      
      const response = await api.post(`${this.baseURL}/guest-booking-intent`, data);
      console.log('PaymentService: Response:', response.data);
      return response.data.data;
    } catch (error: any) {
      console.error('PaymentService: Error creating payment intent:', error);
      console.error('PaymentService: Error response:', error.response?.data);
      console.error('PaymentService: Error status:', error.response?.status);
      throw new Error(error.response?.data?.error?.message || 'Failed to create payment intent');
    }
  }

  /**
   * Confirm payment for guest booking
   */
  async confirmGuestBookingPayment(data: PaymentConfirmData): Promise<any> {
    try {
      const response = await api.post(`${this.baseURL}/confirm-guest-booking`, data);
      return response.data.data;
    } catch (error: any) {
      console.error('Error confirming payment:', error);
      throw new Error(error.response?.data?.error?.message || 'Failed to confirm payment');
    }
  }

  /**
   * Create a payment intent for guest course purchase
   */
  async createGuestCoursePaymentIntent(purchaseId: string, amount: number): Promise<PaymentIntentResponse> {
    try {
      console.log('PaymentService: Creating course payment intent for purchase:', purchaseId);
      
      const data: CoursePaymentIntentData = {
        purchaseId,
        amount,
        currency: 'usd'
      };
      
      const response = await api.post(`${this.baseURL}/guest-course-payment-intent`, data);
      console.log('PaymentService: Course payment intent response:', response.data);
      return response.data.data;
    } catch (error: any) {
      console.error('PaymentService: Error creating course payment intent:', error);
      throw new Error(error.response?.data?.error?.message || 'Failed to create course payment intent');
    }
  }

  /**
   * Get payment status
   */
  async getPaymentStatus(paymentIntentId: string): Promise<any> {
    try {
      const response = await api.get(`${this.baseURL}/status/${paymentIntentId}`);
      return response.data.data;
    } catch (error: any) {
      console.error('Error getting payment status:', error);
      throw new Error(error.response?.data?.error?.message || 'Failed to get payment status');
    }
  }
}

export default new PaymentService(); 