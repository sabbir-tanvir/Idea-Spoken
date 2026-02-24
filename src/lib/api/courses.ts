const BASE_URL = process.env.BASE_URL;

export interface ApiCourse {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: string;
  rating: number | null;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  language: string;
  status: string;
  instructor: {
    name: string;
    avatar?: string;
  } | null;
  moduleCount: number;
  lessonCount: number;
  totalHours: number;
  enrollmentCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiLesson {
  id: number;
  title: string;
  videoUrl: string;
  duration: number;
  sortOrder: number;
  isPreview: boolean;
  createdAt: string;
  moduleId: number;
  completed: boolean;
  completedAt: string | null;
}

export interface ApiModule {
  id: number;
  title: string;
  sortOrder: number;
  createdAt: string;
  courseId: number;
  lessons: ApiLesson[];
}

export interface ApiCourseDetail {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  level: string;
  language: string;
  price: string;
  rating: number | null;
  status: string;
  instructorId: number | null;
  modules: ApiModule[];
  instructor?: { name: string; avatar?: string } | null;
}

/** Enrollment wrapper returned by /courses/me */
export interface ApiEnrollment {
  id: number;
  status: string;
  enrolledAt: string;
  userId: number;
  courseId: number;
  course: ApiCourseDetail;
}

interface CoursesApiResponse {
  success: boolean;
  message: string;
  count: number;
  data: ApiCourse[];
}

/**
 * Fetch a single course with full module/lesson details
 */
export async function getCourseById(id: number): Promise<ApiCourseDetail | null> {
  try {
    const response = await fetch(`${BASE_URL}/courses/${id}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return null;
    const data = await response.json();
    if (data.success) return data.data as ApiCourseDetail;
    return null;
  } catch (error) {
    console.error('Failed to fetch course by id:', error);
    return null;
  }
}

/**
 * Maps a course to its dedicated page route.
 * Courses with dedicated pages go there; others fall back to /courses/:id
 */
export function getCourseRoute(course: ApiCourse): string {
  const title = course.title.toLowerCase();
  if (title.includes('debate')) return '/english-debate';
  if (title.includes('idea spoken') || title.includes('idea-spoken')) return '/idea-spoken';
  return `/courses/${course.id}`;
}

/**
 * Fetch user's enrolled courses with full module/lesson details (authenticated)
 */
export async function getUserCourses(token: string): Promise<ApiCourseDetail[]> {
  try {
    const response = await fetch(`${BASE_URL}/courses/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    if (!response.ok) {
      console.error('User courses API error:', response.status);
      return []; 
    }
    const data = await response.json();
    if (data.success) {
      // API returns enrollment wrappers — unwrap the nested course objects
      const enrollments = data.data as ApiEnrollment[];
      return enrollments.map((e) => e.course);
    }
    return [];
  } catch (error) {
    console.error('Failed to fetch user courses:', error);
    return [];
  }
}

/**
 * Fetch all published courses from the backend API
 */
export async function getCourses(): Promise<ApiCourse[]> {
  try {
    const response = await fetch(`${BASE_URL}/courses/?summary=true`, {
      next: { revalidate: 60 }, // cache for 60 seconds, revalidate in background
    });

    if (!response.ok) {
      console.error('Courses API error:', response.status);
      return [];
    }

    const data: CoursesApiResponse = await response.json();
    console.log('Fetched courses:', data);

    if (data.success) {
      return data.data;
    }

    return [];
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    return [];
  }
}
