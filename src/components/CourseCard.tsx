"use client";

import { ApiCourse, getCourseRoute } from "@/lib/api/courses";
import { Star, Clock, Users, BookOpen, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

interface CourseCardProps {
  course: ApiCourse;
}

const LEVEL_LABELS: Record<string, string> = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
};

export default function CourseCard({ course }: CourseCardProps) {
  const rating = course.rating ?? 0;

  // Generate star array for rating
  const stars = useMemo(() => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return Array.from({ length: 5 }, (_, i) => {
      if (i < fullStars) return 'full';
      if (i === fullStars && hasHalfStar) return 'half';
      return 'empty';
    });
  }, [rating]);

  const instructorName = course.instructor?.name ?? 'IDEA Team';
  const price = course.price ? `৳${course.price}` : 'Free';
  const duration = course.totalHours > 0 ? `${course.totalHours}h` : 'Self-paced';

  return (
    <Link
      href={getCourseRoute(course)}
      className="block max-w-md w-full bg-slate-50 rounded-3xl overflow-hidden shadow-lg border border-slate-100 relative group hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      {/* Background Watermark Logo */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-[0.03]">
        <div className="relative w-80 h-80">
          <Image
            src="/images/logo.png"
            alt="Watermark"
            fill
            className="object-contain grayscale"
          />
        </div>
      </div>

      {/* Thumbnail Image */}
      <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100">
        {course.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-purple-300">
            <svg viewBox="0 0 24 24" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth={1.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            <span className="text-sm font-medium text-purple-400">No Preview</span>
          </div>
        )}

        {/* Badge Overlay */}
        <div className="absolute bottom-4 left-4 bg-slate-900/90 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
          <span className="font-medium text-lg">{LEVEL_LABELS[course.level] ?? course.level}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-10">
        {/* Rating & Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex text-orange-500">
              {stars.map((type, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${type === 'full' ? 'fill-current' : ''} ${type === 'empty' ? 'text-slate-300' : ''}`}
                />
              ))}
            </div>
            <span className="text-slate-500 text-sm font-medium">
              {rating > 0 ? rating.toFixed(1) : 'New'}
            </span>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {price}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-purple-700 transition-colors">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {course.description}
        </p>

        {/* Meta Stats */}
        <div className="flex items-center justify-between bg-white rounded-xl p-3 mb-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 text-slate-700 text-sm font-medium">
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span>Lesson {course.lessonCount}</span>
          </div>
          <div className="w-px h-4 bg-slate-200"></div>
          <div className="flex items-center gap-2 text-slate-700 text-sm font-medium">
            <Clock className="w-4 h-4 text-purple-600" />
            <span>{duration}</span>
          </div>
          <div className="w-px h-4 bg-slate-200"></div>
          <div className="flex items-center gap-2 text-slate-700 text-sm font-medium">
            <Users className="w-4 h-4 text-purple-600" />
            <span>{course.enrollmentCount} Students</span>
          </div>
        </div>

        {/* Footer: Instructor & CTA */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-sm border-2 border-white shadow-sm">
              {instructorName.charAt(0).toUpperCase()}
            </div>
            <span className="font-bold text-slate-900 text-sm">
              {instructorName}
            </span>
          </div>

          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Enroll logic will be added here
              console.log('Enroll clicked for:', course.title);
            }}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-full font-medium transition-colors shadow-md shadow-purple-200 hover:shadow-purple-300"
          >
            Enroll
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}
