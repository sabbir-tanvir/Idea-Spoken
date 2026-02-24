import DashboardSidebar from '@/components/DashboardSidebar';
import MyCourses from '@/components/dashborad/MyCourses';
import { getUserCourses } from '@/lib/api/courses';
import { getAuthToken, decodeToken } from '@/lib/auth/session';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const token = await getAuthToken();
  if (!token) redirect('/auth/login');

  const courses = await getUserCourses(token);
  console.log('Enrolled courses:', courses);
  const user = decodeToken(token);

  const userName = user?.name ?? 'Student';
  const userEmail = user?.email ?? '';
  const userRole = user?.role === 'STUDENT' ? 'Active Student' : (user?.role ?? 'Student');

  // Quick stats
  const totalModules = courses.reduce((s, c) => s + (c.modules?.length ?? 0), 0);
  const totalLessons = courses.reduce(
    (s, c) => s + (c.modules ?? []).reduce((ls, m) => ls + (m.lessons?.length ?? 0), 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">My Courses</h1>
          <p className="text-gray-600">Welcome back, {userName}! Continue your learning journey.</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-90 flex-shrink-0">
            <DashboardSidebar userName={userName} userEmail={userEmail} userStatus={userRole} />
          </div>

          {/* Main Content */}
          <main className="flex-1">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-white rounded-2xl shadow-sm">
                <h3 className="text-sm font-semibold mb-1 text-gray-500">Enrolled Courses</h3>
                <p className="text-3xl font-bold text-purple-600">{courses.length}</p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm">
                <h3 className="text-sm font-semibold mb-1 text-gray-500">Total Modules</h3>
                <p className="text-3xl font-bold text-blue-600">{totalModules}</p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm">
                <h3 className="text-sm font-semibold mb-1 text-gray-500">Total Lessons</h3>
                <p className="text-3xl font-bold text-green-600">{totalLessons}</p>
              </div>
            </div>

            {/* Courses List / Detail */}
            <MyCourses courses={courses} />
          </main>
        </div>
      </div>
    </div>
  );
}
