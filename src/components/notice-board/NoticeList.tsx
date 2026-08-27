"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Notice } from '@/lib/api/notices';
import { Calendar, ChevronDown, Bell, AlertCircle, BookOpen, Users } from 'lucide-react';

interface NoticeListProps {
  notices: Notice[];
}

export default function NoticeList({ notices }: NoticeListProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [expandedNoticeId, setExpandedNoticeId] = useState<string | null>(null);

  const categories = ["All", "Urgent", "General", "Course Update", "Event"];

  const filteredNotices = notices.filter(
    notice => activeCategory === "All" || notice.category === activeCategory
  );

  // Sort: Pinned first, then by date (newest first)
  const sortedNotices = [...filteredNotices].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Urgent": return <AlertCircle className="w-4 h-4 text-rose-500" />;
      case "Course Update": return <BookOpen className="w-4 h-4 text-blue-500" />;
      case "Event": return <Users className="w-4 h-4 text-purple-500" />;
      default: return <Bell className="w-4 h-4 text-amber-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Urgent": return "bg-rose-100 text-rose-700 border-rose-200";
      case "Course Update": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Event": return "bg-purple-100 text-purple-700 border-purple-200";
      default: return "bg-amber-100 text-amber-700 border-amber-200";
    }
  };

  const toggleNotice = (id: string) => {
    if (expandedNoticeId === id) {
      setExpandedNoticeId(null);
    } else {
      setExpandedNoticeId(id);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeCategory === category
                ? "bg-purple-600 text-white shadow-md shadow-purple-500/30"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-purple-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Notice List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {sortedNotices.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 bg-white rounded-2xl border border-gray-100"
            >
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900">কোনো নোটিশ পাওয়া যায়নি</h3>
              <p className="text-gray-500 mt-1">এই ক্যাটাগরিতে বর্তমানে কোনো নতুন নোটিশ নেই।</p>
            </motion.div>
          ) : (
            sortedNotices.map((notice, index) => {
              const isExpanded = expandedNoticeId === notice.id;
              const formattedDate = new Date(notice.date).toLocaleDateString('bn-BD', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });

              return (
                <motion.div
                  key={notice.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 border-2 ${
                    notice.isPinned ? "border-purple-400 shadow-purple-100" : "border-gray-100"
                  } hover:border-purple-300 shadow-sm hover:shadow-md`}
                >
                  {/* Notice Header (Clickable) */}
                  <div
                    onClick={() => toggleNotice(notice.id)}
                    className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row gap-4 sm:items-start"
                  >
                    {/* Date Block */}
                    <div className="shrink-0 flex sm:flex-col items-center gap-2 sm:gap-0 bg-gray-50 rounded-xl p-3 border border-gray-100 text-center w-full sm:w-24">
                      <Calendar className="w-5 h-5 text-purple-600 sm:mb-1" />
                      <span className="text-xs sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider">Posted</span>
                      <span className="text-sm font-semibold text-gray-700">{formattedDate}</span>
                    </div>

                    {/* Content Preview */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold border ${getCategoryColor(notice.category)}`}>
                          {getCategoryIcon(notice.category)}
                          {notice.category}
                        </span>
                        {notice.isPinned && (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200">
                            📌 Pinned
                          </span>
                        )}
                      </div>
                      
                      <h3 className={`text-lg sm:text-xl font-bold mb-2 ${notice.isPinned ? "text-purple-700" : "text-gray-900"}`}>
                        {notice.title}
                      </h3>
                      
                      <p className={`text-gray-600 text-sm leading-relaxed ${isExpanded ? "hidden" : "line-clamp-2"}`}>
                        {notice.excerpt}
                      </p>
                    </div>

                    {/* Expand Icon */}
                    <div className="shrink-0 flex justify-center sm:justify-end items-center mt-2 sm:mt-0">
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-purple-100 hover:text-purple-600 transition-colors"
                      >
                        <ChevronDown className="w-5 h-5" />
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
                        <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-gray-100 bg-gray-50/50">
                          <p className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
                            {notice.content}
                          </p>
                          <div className="mt-6 flex justify-end">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedNoticeId(null);
                              }}
                              className="text-sm font-semibold text-purple-600 hover:text-purple-700 hover:underline"
                            >
                              Close Notice
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
  );
}
