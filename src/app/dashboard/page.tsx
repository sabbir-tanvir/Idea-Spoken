import DashboardClient from '@/components/dashborad/DashboardClient';
import { getCourseProgress, getUserCourses, ApiCourseProgress } from '@/lib/api/courses';
import { getAuthToken, decodeToken } from '@/lib/auth/session';
import { redirect } from 'next/navigation';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: Promise<{ courseId?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const initialCourseId = params.courseId ? Number(params.courseId) : null;
  const token = await getAuthToken();
  if (!token) redirect('/auth/login');

  const courses = await getUserCourses(token);
  const progressEntries = await Promise.all(
    courses.map(async (course) => [course.id, await getCourseProgress(token, course.id)] as const)
  );
  const progressByCourseId = Object.fromEntries(progressEntries) as Record<
    number,
    ApiCourseProgress | null
  >;
  const user = decodeToken(token);

  const userName = user?.name ?? 'Student';
  const userEmail = user?.email ?? '';
  const userRole = user?.role === 'STUDENT' ? 'Active Student' : (user?.role ?? 'Student');

  const totalModules = courses.reduce((s, c) => s + (c.modules?.length ?? 0), 0);
  const totalLessons = courses.reduce(
    (s, c) => s + (c.modules ?? []).reduce((ls, m) => ls + (m.lessons?.length ?? 0), 0),
    0
  );

  return (
    <DashboardClient
      courses={courses}
      userName={userName}
      userEmail={userEmail}
      userRole={userRole}
      totalModules={totalModules}
      totalLessons={totalLessons}
      progressByCourseId={progressByCourseId}
      initialSelectedCourseId={Number.isNaN(initialCourseId) ? null : initialCourseId}
    />
  );
}

