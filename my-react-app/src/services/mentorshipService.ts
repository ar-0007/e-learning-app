// src/services/mentorshipService.ts
import api from './api';

export interface MentorshipSlot {
  slot_id: string;
  mentor_user_id: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
  booked_by_user_id?: string;
  price: number;
  created_at: string;
  updated_at: string;
  mentor?: {
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
  };
}

export interface MentorshipBooking {
  booking_id: string;
  slot_id: string;
  user_id: string;
  payment_status: 'PENDING' | 'PAID' | 'FAILED';
  payment_method?: string;
  transaction_id?: string;
  zoom_link?: string;
  booked_at: string;
  created_at: string;
  updated_at: string;
  slot?: MentorshipSlot;
  user?: {
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
  };
}

export interface CreateBookingData {
  instructorId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  preferredTopics?: string[];
}

export interface GuestBookingResponse {
  guest_booking_id: string;
  instructor_id: string;
  instructor_name: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  preferred_date: string;
  preferred_time: string;
  session_price: number;
  payment_status: string;
  checkout_url: string;
}

export interface PaymentUpdateData {
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
  transactionId?: string;
  paymentMethod?: string;
}

class MentorshipService {
  private baseURL = '/public/mentorship';

  async getAvailableSlots(instructorId: string): Promise<MentorshipSlot[]> {
    try {
      const response = await api.get(`${this.baseURL}/slots/${instructorId}`);
      return response.data.data || [];
    } catch (error: any) {
      console.error('Error fetching available slots:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch available slots');
    }
  }

  async createBooking(bookingData: CreateBookingData): Promise<MentorshipBooking> {
    try {
      const response = await api.post(`${this.baseURL}/bookings`, bookingData);
      return response.data.data;
    } catch (error: any) {
      console.error('Error creating booking:', error);
      throw new Error(error.response?.data?.message || 'Failed to create booking');
    }
  }

  async createGuestBooking(bookingData: CreateBookingData): Promise<GuestBookingResponse> {
    try {
      const response = await api.post('/guest-bookings', bookingData);
      return response.data.data;
    } catch (error: any) {
      console.error('Error creating guest booking:', error);
      throw new Error(error.response?.data?.message || 'Failed to create guest booking');
    }
  }

  async getGuestBookingById(bookingId: string): Promise<any> {
    try {
      const response = await api.get(`/guest-bookings/${bookingId}`);
      return response.data.data;
    } catch (error: any) {
      console.error('Error fetching guest booking:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch guest booking');
    }
  }

  async updateGuestPaymentStatus(bookingId: string, paymentData: PaymentUpdateData): Promise<any> {
    try {
      const response = await api.put(`/guest-bookings/${bookingId}/payment`, paymentData);
      return response.data.data;
    } catch (error: any) {
      console.error('Error updating guest payment status:', error);
      throw new Error(error.response?.data?.message || 'Failed to update payment status');
    }
  }

  async getBookingById(bookingId: string): Promise<MentorshipBooking> {
    try {
      const response = await api.get(`${this.baseURL}/bookings/${bookingId}`);
      return response.data.data;
    } catch (error: any) {
      console.error('Error fetching booking:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch booking');
    }
  }

  async updatePaymentStatus(bookingId: string, paymentData: PaymentUpdateData): Promise<MentorshipBooking> {
    try {
      const response = await api.put(`${this.baseURL}/bookings/${bookingId}/payment`, paymentData);
      return response.data.data;
    } catch (error: any) {
      console.error('Error updating payment status:', error);
      throw new Error(error.response?.data?.message || 'Failed to update payment status');
    }
  }

  // Mock payment processing (replace with actual payment gateway integration)
  async processPayment(bookingId: string, amount: number, paymentMethod: string = 'stripe'): Promise<{ success: boolean; transactionId?: string; error?: string }> {
    try {
      // Simulate payment processing
      const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Update payment status to PAID
      await this.updatePaymentStatus(bookingId, {
        paymentStatus: 'PAID',
        transactionId,
        paymentMethod
      });

      return {
        success: true,
        transactionId
      };
    } catch (error: any) {
      console.error('Payment processing error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default new MentorshipService(); 