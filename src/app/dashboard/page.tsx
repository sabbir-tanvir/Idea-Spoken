import DashboardSidebar from '@/components/DashboardSidebar';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">My Courses Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Enrolled Courses</h3>
            <p className="text-3xl font-bold text-blue-600">5</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Completed Lessons</h3>
            <p className="text-3xl font-bold text-green-600">24</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Certificates</h3>
            <p className="text-3xl font-bold text-purple-600">2</p>
          </div>
        </div>
      </main>
    </div>
  );
}
