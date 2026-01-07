import DashboardSidebar from '@/components/DashboardSidebar';

export default function LessonsPage() {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">My Lessons</h1>
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">IDEA Spoken English</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded">
                <span>Lesson 1: Introduction to Pronunciation</span>
                <span className="text-green-600">✓ Completed</span>
              </div>
              <div className="flex items-center justify-between p-3 border rounded">
                <span>Lesson 2: Basic Conversation Skills</span>
                <span className="text-blue-600">In Progress</span>
              </div>
              <div className="flex items-center justify-between p-3 border rounded">
                <span>Lesson 3: Advanced Speaking Techniques</span>
                <span className="text-gray-400">Locked</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
