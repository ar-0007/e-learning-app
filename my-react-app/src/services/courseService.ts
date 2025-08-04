import api from './api';

export interface Course {
  course_id: string;
  title: string;
  description: string;
  price: number;
  duration_hours: number;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  thumbnail_url: string | null;
  intro_video_url: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  category?: {
    category_id: string;
    name: string;
  };
  instructor?: {
    user_id: string;
    name: string;
    email: string;
  };
}

export interface CourseResponse {
  success: boolean;
  data: Course[];
  message: string;
}

const courseService = {
  // Get all published courses
  getAllCourses: async (): Promise<Course[]> => {
    try {
      const response = await api.get<CourseResponse>('/courses?isPublished=true');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },

  // Get course by ID
  getCourseById: async (courseId: string): Promise<Course> => {
    try {
      const response = await api.get<{ success: boolean; data: Course; message: string }>(`/courses/${courseId}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching course:', error);
      throw error;
    }
  },

  // Get courses by level
  getCoursesByLevel: async (level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'): Promise<Course[]> => {
    try {
      const allCourses = await courseService.getAllCourses();
      return allCourses.filter(course => course.level === level);
    } catch (error) {
      console.error('Error fetching courses by level:', error);
      throw error;
    }
  },

  // Get newest courses (sorted by creation date)
  getNewestCourses: async (limit: number = 4): Promise<Course[]> => {
    try {
      const allCourses = await courseService.getAllCourses();
      return allCourses
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching newest courses:', error);
      throw error;
    }
  }
};

export default courseService; 