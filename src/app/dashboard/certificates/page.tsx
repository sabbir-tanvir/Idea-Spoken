import DashboardSidebar from '@/components/DashboardSidebar';

export default function CertificatesPage() {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">My Certificates</h1>
        <div className="space-y-4">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold">IDEA Spoken English</h3>
            <p className="text-gray-600 mt-2">Completed on: January 15, 2025</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Download Certificate
            </button>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold">English Debate Course</h3>
            <p className="text-gray-600 mt-2">Completed on: December 20, 2024</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Download Certificate
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
