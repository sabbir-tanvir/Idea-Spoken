"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Notice } from '@/lib/api/notices';
import { Calendar, ChevronDown, Bell, AlertCircle, BookOpen, Users } from 'lucide-react';

interface NoticeListProps {
  notices: Notice[];
}

export default function NoticeList({ notices }: NoticeListProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [expandedNoticeId, setExpandedNoticeId] = useState<string | null>(null);

  const categories: string[] = ["All", "Urgent", "General", "Course Update", "Event"];

  // Filter notices by category
  const filteredNotices = useMemo(() => {
    return notices.filter((notice) => {
      return (
        activeCategory === "All" ||
        notice.category === activeCategory ||
        (activeCategory === "Course Update" && (notice.category as string) === "CourseUpdate")
      );
    });
  }, [notices, activeCategory]);

  // Sort: Pinned first, then by date (newest first)
  const sortedNotices = useMemo(() => {
    return [...filteredNotices].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      const dateA = new Date(a.date || a.createdAt || 0).getTime();
      const dateB = new Date(b.date || b.createdAt || 0).getTime();
      return dateB - dateA;
    });
  }, [filteredNotices]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Urgent":
        return <AlertCircle className="w-4 h-4 text-rose-500" />;
      case "Course Update":
      case "CourseUpdate":
        return <BookOpen className="w-4 h-4 text-blue-500" />;
      case "Event":
        return <Users className="w-4 h-4 text-purple-500" />;
      default:
        return <Bell className="w-4 h-4 text-amber-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Urgent":
        return "bg-rose-100 text-rose-700 border-rose-200";
      case "Course Update":
      case "CourseUpdate":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Event":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-amber-100 text-amber-700 border-amber-200";
    }
  };

  const toggleNotice = (id: string) => {
    setExpandedNoticeId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Compact Hero Section with Embedded Filters */}
      <div className="bg-purple-900 text-white pt-24 pb-8 px-4 relative overflow-hidden">
        {/* Decorative background blur blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-5 left-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
          <div className="absolute top-5 right-10 w-32 h-32 bg-rose-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-10 left-1/2 w-40 h-40 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 container mx-auto text-center max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
            নোটিশ বোর্ড
          </h1>
          <p className="text-sm sm:text-base text-purple-100/90 mb-6 max-w-xl mx-auto leading-relaxed">
            আইডিয়া স্পোকেন ও আমাদের অন্যান্য উইং এর সবশেষ আপডেট, ইভেন্ট এবং গুরুত্বপূর্ণ নোটিশগুলো এখান থেকে জেনে নিন।
          </p>

          {/* Compact Glassmorphic Category Filter Pills */}
          <div className="flex flex-wrap gap-2 justify-center items-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  activeCategory === category
                    ? "bg-white text-purple-950 shadow-lg shadow-black/20 font-bold scale-105"
                    : "bg-white/15 text-white/90 hover:bg-white/25 border border-white/20 backdrop-blur-md"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Notice Cards List */}
      <div className="w-full max-w-4xl mx-auto pt-8 px-4">
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {sortedNotices.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-14 bg-white rounded-3xl border border-gray-100 shadow-sm"
              >
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-900">কোনো নোটিশ পাওয়া যায়নি</h3>
                <p className="text-gray-500 mt-1 text-xs sm:text-sm">
                  এই ক্যাটাগরিতে বর্তমানে কোনো নতুন নোটিশ নেই।
                </p>
                {activeCategory !== "All" && (
                  <button
                    onClick={() => setActiveCategory("All")}
                    className="mt-4 px-4 py-2 bg-purple-50 text-purple-600 hover:bg-purple-100 font-bold text-xs rounded-full transition-colors cursor-pointer"
                  >
                    সব নোটিশ দেখুন
                  </button>
                )}
              </motion.div>
            ) : (
              sortedNotices.map((notice, index) => {
                const isExpanded = expandedNoticeId === notice.id;
                const formattedDate = notice.date
                  ? new Date(notice.date).toLocaleDateString('bn-BD', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                  : 'তারিখ পাওয়া যায়নি';

                return (
                  <motion.div
                    key={notice.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                    className={`bg-white rounded-3xl overflow-hidden transition-all duration-300 border-2 ${
                      notice.isPinned ? "border-purple-400 shadow-purple-100" : "border-gray-100"
                    } hover:border-purple-300 shadow-sm hover:shadow-md`}
                  >
                    {/* Notice Header (Clickable) */}
                    <div
                      onClick={() => toggleNotice(notice.id)}
                      className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row gap-4 sm:items-start"
                    >
                      {/* Date Block */}
                      <div className="shrink-0 flex sm:flex-col items-center justify-center gap-2 sm:gap-0 bg-purple-50/60 rounded-2xl p-3 border border-purple-100 text-center w-full sm:w-28">
                        <Calendar className="w-4 h-4 text-purple-600 sm:mb-1" />
                        <span className="text-[10px] font-extrabold text-purple-400 uppercase tracking-wider">প্রকাশিত</span>
                        <span className="text-xs font-bold text-purple-900 mt-0.5">{formattedDate}</span>
                      </div>

                      {/* Content Preview */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold border ${getCategoryColor(notice.category)}`}>
                            {getCategoryIcon(notice.category)}
                            {notice.category}
                          </span>
                          {notice.isPinned && (
                            <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800 border border-amber-200 shadow-xs">
                              📌 Pinned Notice
                            </span>
                          )}
                        </div>

                        <h3 className={`text-base sm:text-lg font-extrabold mb-1.5 leading-snug ${notice.isPinned ? "text-purple-900" : "text-gray-900"}`}>
                          {notice.title}
                        </h3>

                        <p className={`text-gray-600 text-xs sm:text-sm leading-relaxed ${isExpanded ? "hidden" : "line-clamp-2"}`}>
                          {notice.excerpt}
                        </p>
                      </div>

                      {/* Expand Icon */}
                      <div className="shrink-0 flex justify-center sm:justify-end items-center mt-2 sm:mt-0">
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-purple-100 hover:text-purple-700 transition-colors"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-5 sm:px-6 pb-6 pt-3 border-t border-purple-50 bg-purple-50/20">
                            <div className="text-gray-800 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-normal">
                              {notice.content}
                            </div>
                            <div className="mt-5 flex justify-end">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedNoticeId(null);
                                }}
                                className="text-xs font-bold text-purple-700 bg-purple-100 hover:bg-purple-200 px-4 py-2 rounded-full transition-colors cursor-pointer"
                              >
                                সংক্ষিপ্ত করুন (Close Notice)
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
