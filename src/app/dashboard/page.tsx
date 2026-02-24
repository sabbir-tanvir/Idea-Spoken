import DashboardClient from '@/components/dashborad/DashboardClient';
import { getUserCourses } from '@/lib/api/courses';
import { getAuthToken, decodeToken } from '@/lib/auth/session';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const token = await getAuthToken();
  if (!token) redirect('/auth/login');

  const courses = await getUserCourses(token);
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
    />
  );
}

