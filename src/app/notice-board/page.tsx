import React from 'react';
import NoticeList from '@/components/notice-board/NoticeList';
import { getNotices } from '@/lib/api/notices';

export default async function NoticeBoardPage() {
  const notices = await getNotices();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <div className="bg-purple-900 text-white pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute top-10 right-10 w-32 h-32 bg-rose-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-10 left-1/2 w-40 h-40 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            নোটিশ বোর্ড
          </h1>
          <p className="text-lg text-purple-100 mb-8 leading-relaxed">
            আইডিয়া স্পোকেন ও আমাদের অন্যান্য উইং এর সবশেষ আপডেট, ইভেন্ট এবং গুরুত্বপূর্ণ নোটিশগুলো এখান থেকে জেনে নিন।
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="-mt-10 relative z-20">
        <NoticeList notices={notices} />
      </div>
    </div>
  );
}
