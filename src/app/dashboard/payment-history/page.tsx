import DashboardSidebar from '@/components/DashboardSidebar';

export default function PaymentHistoryPage() {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Payment History</h1>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Jan 15, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap">IDEA Spoken English</td>
                <td className="px-6 py-4 whitespace-nowrap">৳2,500</td>
                <td className="px-6 py-4 whitespace-nowrap">bKash</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-green-600">Completed</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Dec 20, 2024</td>
                <td className="px-6 py-4 whitespace-nowrap">English Debate</td>
                <td className="px-6 py-4 whitespace-nowrap">৳3,000</td>
                <td className="px-6 py-4 whitespace-nowrap">Nagad</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-green-600">Completed</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
