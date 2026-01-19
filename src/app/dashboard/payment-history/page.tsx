import DashboardSidebar from '@/components/DashboardSidebar';
import PaymentHistory from '@/components/dashborad/PaymentHistory';
import { mockPaymentHistory } from '@/lib/data';

/**
 * Payment History Page - Server Component
 * This page remains server-rendered and can easily integrate with API
 * Replace mockPaymentHistory with API call: const transactions = await fetchPaymentHistory();
 */
export default function PaymentHistoryPage() {
  // TODO: Replace with actual API call when ready
  // const transactions = await fetch('/api/payment-history').then(res => res.json());
  const transactions = mockPaymentHistory;

  return (
    <div className="flex bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-90 shrink-0">
            <DashboardSidebar />
          </div>

          {/* Main Content */}
          <main className="flex-1">
            <PaymentHistory transactions={transactions} />
          </main>
        </div>
      </div>
    </div>
  );
}
