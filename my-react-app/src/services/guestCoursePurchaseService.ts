import api from './api';

export interface GuestCoursePurchase {
  purchase_id: string;
  course_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  course_price: number;
  payment_status: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  payment_method?: string;
  transaction_id?: string;
  access_code: string;
  access_expires_at?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  course?: {
    course_id: string;
    title: string;
    description: string;
    thumbnail_url?: string;
    price: number;
    instructor?: {
      instructor_id: string;
      first_name: string;
      last_name: string;
      email: string;
    };
  };
}

export interface PaymentStatusUpdate {
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  paymentMethod?: string;
  transactionId?: string;
}

export interface CreateGuestCoursePurchaseData {
  courseId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
}

export interface GuestCoursePurchaseResponse {
  success: boolean;
  data: {
    purchase_id: string;
    course_id: string;
    course_title: string;
    customer_name: string;
    customer_email: string;
    customer_phone?: string;
    course_price: number;
    payment_status: string;
    checkout_url: string;
  };
  message: string;
}

class GuestCoursePurchaseService {
  private baseURL = '/guest-course-purchases';

  async createGuestCoursePurchase(data: CreateGuestCoursePurchaseData): Promise<GuestCoursePurchaseResponse> {
    try {
      const response = await api.post(this.baseURL, data);
      return response.data;
    } catch (error: any) {
      console.error('Error creating guest course purchase:', error);
      throw new Error(error.response?.data?.error?.message || 'Failed to create course purchase');
    }
  }

  async getGuestCoursePurchaseById(purchaseId: string): Promise<GuestCoursePurchase> {
    try {
      const response = await api.get(`${this.baseURL}/${purchaseId}`);
      return response.data.data;
    } catch (error: any) {
      console.error('Error fetching guest course purchase:', error);
      throw new Error(error.response?.data?.error?.message || 'Failed to fetch course purchase');
    }
  }

  async updatePaymentStatus(
    purchaseId: string, 
    statusData: PaymentStatusUpdate
  ): Promise<GuestCoursePurchase> {
    try {
      const response = await api.put(`${this.baseURL}/${purchaseId}/payment`, statusData);
      return response.data.data;
    } catch (error: any) {
      console.error('Error updating payment status:', error);
      throw new Error(error.response?.data?.error?.message || 'Failed to update payment status');
    }
  }

  async getGuestCoursePurchaseByAccessCode(accessCode: string): Promise<GuestCoursePurchase> {
    try {
      const response = await api.get(`${this.baseURL}/access/${accessCode}`);
      return response.data.data;
    } catch (error: any) {
      console.error('Error fetching course purchase by access code:', error);
      throw new Error(error.response?.data?.error?.message || 'Failed to verify course access');
    }
  }
}

export default new GuestCoursePurchaseService();