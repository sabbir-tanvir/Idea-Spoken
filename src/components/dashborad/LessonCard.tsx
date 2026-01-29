'use client';

import { Play, RotateCcw, ChevronRight } from 'lucide-react';

export interface LessonCardData {
  id: string;
  title: string;
  courseName: string;
  duration: string;
  status: 'completed' | 'continue' | 'locked';
}

interface LessonCardProps {
  lesson: LessonCardData;
}

export default function LessonCard({ lesson }: LessonCardProps) {
  const isCompleted = lesson.status === 'completed';
  const isContinue = lesson.status === 'continue';

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:shadow-md transition-shadow">
      {/* Left Side - Icon and Info */}
      <div className="flex items-center gap-4">
        {/* Play/Completed Icon */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          isCompleted ? 'bg-purple-100' : 'bg-purple-600'
        }`}>
          {isCompleted ? (
            <RotateCcw className="w-5 h-5 text-purple-600" />
          ) : (
            <Play className="w-5 h-5 text-white fill-white" />
          )}
        </div>

        {/* Lesson Info */}
        <div>
          <h3 className="text-base font-semibold text-gray-900">{lesson.title}</h3>
          <div className="flex items-center gap-2 text-base text-gray-500 mt-0.5">
            <span className="font-medium">{lesson.courseName}</span>
            <span>•</span>
            <span>{lesson.duration}</span>
          </div>
        </div>
      </div>

      {/* Right Side - Status Badge and Arrow */}
      <div className="flex items-center gap-3">
        {/* Status Badge */}
        <span className={`px-4 py-1.5 rounded-full text-base font-medium ${
          isCompleted 
            ? 'bg-purple-600 text-white' 
            : isContinue 
              ? 'bg-white border-2 border-purple-600 text-purple-600' 
              : 'bg-gray-200 text-gray-500'
        }`}>
          {isCompleted ? 'Completed' : isContinue ? 'Continue' : 'Locked'}
        </span>

        {/* Arrow */}
        <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
