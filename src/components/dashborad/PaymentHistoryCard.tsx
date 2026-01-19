"use client"

import { motion } from 'motion/react';
import { PaymentTransaction } from '@/lib/data';
import { GraduationCap, Calendar, CreditCard } from 'lucide-react';

interface PaymentHistoryCardProps {
  transaction: PaymentTransaction;
  index: number;
}

/**
 * Payment History Card - Client Component for animations only
 * This is a minimal client component wrapper to enable motion animations
 * while keeping the parent component server-side
 */
export function PaymentHistoryCard({ transaction, index }: PaymentHistoryCardProps) {
  const statusColors = {
    paid: 'bg-purple-600 text-white',
    pending: 'bg-yellow-500 text-white',
    failed: 'bg-red-500 text-white'
  };

  const statusText = {
    paid: 'Paid',
    pending: 'Pending',
    failed: 'Failed'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Section - Course Info */}
        <div className="flex items-start gap-4 flex-1">
          {/* Icon */}
          <motion.div 
            className="bg-purple-100 p-3 rounded-xl shrink-0"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <GraduationCap className="w-6 h-6 text-purple-600" />
          </motion.div>

          {/* Course Details */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
              {transaction.courseTitle}
            </h3>
            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{transaction.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CreditCard className="w-4 h-4" />
                <span>{transaction.method}</span>
              </div>
              <div className="text-gray-500">
                <span>{transaction.transactionId}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Amount & Status */}
        <div className="flex items-center gap-4 md:shrink-0">
          {/* Amount */}
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              {transaction.amount}
            </div>
          </div>

          {/* Status Badge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium ${statusColors[transaction.status]} shadow-sm`}
          >
            {statusText[transaction.status]}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
