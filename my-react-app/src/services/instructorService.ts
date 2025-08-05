// src/services/instructorService.ts
import api from './api';

export interface Instructor {
  instructor_id: string;
  user_id?: string;
  first_name: string;
  last_name: string;
  email: string;
  bio?: string;
  profile_image_url?: string;
  specialties: string[];
  experience_years: number;
  education?: string;
  certifications: string[];
  hourly_rate: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

class InstructorService {
  private baseURL = '/instructors';

  async getAllInstructors(): Promise<Instructor[]> {
    try {
      const response = await api.get(this.baseURL);
      return response.data.data || [];
    } catch (error: any) {
      console.error('Error fetching instructors:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch instructors');
    }
  }

  async getInstructorById(id: string): Promise<Instructor> {
    try {
      const response = await api.get(`${this.baseURL}/${id}`);
      return response.data.data;
    } catch (error: any) {
      console.error('Error fetching instructor:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch instructor');
    }
  }

  async getInstructorsBySpecialty(specialty: string): Promise<Instructor[]> {
    try {
      const response = await api.get(`${this.baseURL}/specialty/${specialty}`);
      return response.data.data || [];
    } catch (error: any) {
      console.error('Error fetching instructors by specialty:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch instructors by specialty');
    }
  }
}

export default new InstructorService(); 