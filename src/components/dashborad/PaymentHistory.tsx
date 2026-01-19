import { PaymentTransaction } from '@/lib/data';
import { PaymentHistoryCard } from './PaymentHistoryCard';
import { Receipt } from 'lucide-react';

interface PaymentHistoryProps {
  transactions: PaymentTransaction[];
}

/**
 * Payment History Component - Server Component
 * This component can be rendered on the server and will receive data from API
 * Only the animation wrapper (PaymentHistoryCard) uses "use client"
 */
export default function PaymentHistory({ transactions }: PaymentHistoryProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="mb-8 bg-linear-to-br from-purple-100 to-blue-100 rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-purple-600 p-4 rounded-2xl shadow-lg">
            <Receipt className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payment History</h1>
            <p className="text-gray-600 mt-1">Your Transaction Records</p>
          </div>
        </div>
      </div>

      {/* Payment Cards */}
      <div className="space-y-4">
        {transactions.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <div className="text-gray-400 mb-4">
              <Receipt className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Payments Yet</h3>
            <p className="text-gray-500">Your payment history will appear here once you make a purchase.</p>
          </div>
        ) : (
          transactions.map((transaction, index) => (
            <PaymentHistoryCard 
              key={transaction.id} 
              transaction={transaction}
              index={index}
            />
          ))
        )}
      </div>
    </div>
  );
}
