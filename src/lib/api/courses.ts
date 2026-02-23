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

interface CoursesApiResponse {
  success: boolean;
  message: string;
  count: number;
  data: ApiCourse[];
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
