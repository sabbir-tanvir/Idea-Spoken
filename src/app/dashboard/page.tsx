import DashboardSidebar from '@/components/DashboardSidebar';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">My Courses</h1>
          <p className="text-gray-600">Continue Your Learning Journey</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <DashboardSidebar />
          </div>

          {/* Main Content */}
          <main className="flex-1">
            {/* Header */}


            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-2xl shadow-sm">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Enrolled Courses</h3>
                <p className="text-4xl font-bold text-blue-600">5</p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Completed Lessons</h3>
                <p className="text-4xl font-bold text-green-600">24</p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Certificates</h3>
                <p className="text-4xl font-bold text-purple-600">2</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
