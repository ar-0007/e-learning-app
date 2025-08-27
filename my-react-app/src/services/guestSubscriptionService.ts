// src/services/guestSubscriptionService.ts
import api from './api';

export interface GuestSubscriptionRequest {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  subscriptionType?: 'MONTHLY' | '3_MONTH';
}

export interface GuestSubscription {
  subscription_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  subscription_type: 'MONTHLY' | '3_MONTH';
  price: number;
  duration_months: number;
  payment_status: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  status: 'PENDING' | 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
  payment_method?: string;
  transaction_id?: string;
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentIntentRequest {
  subscriptionId: string;
}

export interface PaymentIntentResponse {
  client_secret: string;
  payment_intent_id: string;
  amount: number;
  subscription_type: string;
}

export interface PaymentStatusUpdate {
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  paymentMethod?: string;
  transactionId?: string;
}

class GuestSubscriptionService {
  /**
   * Create a new guest subscription
   */
  async createGuestSubscription(subscriptionData: GuestSubscriptionRequest): Promise<{
    subscription_id: string;
    customer_name: string;
    customer_email: string;
    subscription_type: string;
    price: number;
    payment_status: string;
    checkout_url: string;
  }> {
    try {
      const response = await api.post('/guest-subscriptions', subscriptionData);
      return response.data.data;
    } catch (error: any) {
      console.error('Error creating guest subscription:', error);
      throw new Error(
        error.response?.data?.error?.message || 
        'Failed to create subscription'
      );
    }
  }

  /**
   * Create payment intent for subscription
   */
  async createPaymentIntent(paymentData: PaymentIntentRequest): Promise<PaymentIntentResponse> {
    try {
      const response = await api.post('/guest-subscriptions/payment-intent', paymentData);
      return response.data.data;
    } catch (error: any) {
      console.error('Error creating payment intent:', error);
      throw new Error(
        error.response?.data?.error?.message || 
        'Failed to create payment intent'
      );
    }
  }

  /**
   * Get subscription by ID
   */
  async getSubscriptionById(subscriptionId: string): Promise<GuestSubscription> {
    try {
      const response = await api.get(`/guest-subscriptions/${subscriptionId}`);
      return response.data.data;
    } catch (error: any) {
      console.error('Error fetching subscription:', error);
      throw new Error(
        error.response?.data?.error?.message || 
        'Failed to fetch subscription'
      );
    }
  }

  /**
   * Update payment status
   */
  async updatePaymentStatus(
    subscriptionId: string, 
    statusData: PaymentStatusUpdate
  ): Promise<GuestSubscription> {
    try {
      const response = await api.put(
        `/guest-subscriptions/${subscriptionId}/payment-status`, 
        statusData
      );
      return response.data.data;
    } catch (error: any) {
      console.error('Error updating payment status:', error);
      throw new Error(
        error.response?.data?.error?.message || 
        'Failed to update payment status'
      );
    }
  }
}

const guestSubscriptionService = new GuestSubscriptionService();
export default guestSubscriptionService;