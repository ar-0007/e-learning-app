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
  video_series?: string | null;
  video_part?: number | null;
  category?: {
    category_id: string;
    name: string;
  };
  instructor?: {
    instructor_id: string;
    first_name: string;
    last_name: string;
    email: string;
    bio?: string;
    specialties: string[];
    experience_years: number;
    profile_image_url?: string;
  };
}

export interface CourseResponse {
  success: boolean;
  data: Course[];
  message: string;
}

const courseService = {
  // Helper function to group series courses and show only the first part
  groupSeriesCourses: (courseList: Course[]): Course[] => {
    const seriesMap = new Map<string, Course[]>();
    const standaloneCoursesMap = new Map<string, Course>();
    
    courseList.forEach(course => {
      // Check if course is part of a series
      const isSeriesCourse = course.video_series || 
        (course.title.includes('Part ') && /Part \d+/.test(course.title));
      
      if (isSeriesCourse) {
        // Use video_series field or extract series name from title
        let seriesName = course.video_series;
        if (!seriesName && course.title.includes('Part ')) {
          seriesName = course.title.replace(/Part \d+.*$/, '').trim();
        }
        
        if (seriesName) {
          if (!seriesMap.has(seriesName)) {
            seriesMap.set(seriesName, []);
          }
          seriesMap.get(seriesName)!.push(course);
        } else {
          standaloneCoursesMap.set(course.course_id, course);
        }
      } else {
        standaloneCoursesMap.set(course.course_id, course);
      }
    });
    
    const result: Course[] = [];
    
    // Add standalone courses
    result.push(...Array.from(standaloneCoursesMap.values()));
    
    // Add first part of each series (or the earliest part available)
    seriesMap.forEach((seriesCourses, seriesName) => {
      // Sort by video_part if available, otherwise by title part number
      const sortedSeries = seriesCourses.sort((a, b) => {
        const partA = a.video_part || courseService.extractPartNumber(a.title);
        const partB = b.video_part || courseService.extractPartNumber(b.title);
        return partA - partB;
      });
      
      // Add only the first part of the series
      if (sortedSeries.length > 0) {
        result.push(sortedSeries[0]);
      }
    });
    
    return result;
  },

  // Helper function to extract part number from title
  extractPartNumber: (title: string): number => {
    const match = title.match(/Part (\d+)/);
    return match ? parseInt(match[1], 10) : 1;
  },

  // Helper function to check if a course is part of a series
  isSeriesCourse: (course: Course): boolean => {
    return !!(course.video_series || 
      (course.title.includes('Part ') && /Part \d+/.test(course.title)));
  },

  // Helper function to check if a course is part of a multi-part series
  isMultiPartSeries: (course: Course, allCourses: Course[]): boolean => {
    if (!courseService.isSeriesCourse(course)) {
      return false;
    }

    // Get series name
    let seriesName = course.video_series;
    if (!seriesName && course.title.includes('Part ')) {
      seriesName = course.title.replace(/Part \d+.*$/, '').trim();
    }

    if (!seriesName) {
      return false;
    }

    // Count how many courses are in this series
    const seriesCount = allCourses.filter(c => {
      const cSeriesName = c.video_series || 
        (c.title.includes('Part ') ? c.title.replace(/Part \d+.*$/, '').trim() : null);
      return cSeriesName === seriesName;
    }).length;

    return seriesCount > 1;
  },

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

  // Get all published courses grouped by series (showing only first part of each series)
  getAllCoursesGrouped: async (): Promise<Course[]> => {
    try {
      const allCourses = await courseService.getAllCourses();
      return courseService.groupSeriesCourses(allCourses);
    } catch (error) {
      console.error('Error fetching grouped courses:', error);
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