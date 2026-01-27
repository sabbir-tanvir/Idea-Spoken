"use client";

import { CourseCardData } from "@/lib/api";
import { Star, Clock, Users, BookOpen, CheckCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

interface CourseCardProps {
  course: CourseCardData;
}

export default function CourseCard({ course }: CourseCardProps) {
  // Generate star array for rating
  const stars = useMemo(() => {
    const fullStars = Math.floor(course.rating);
    const hasHalfStar = course.rating % 1 !== 0;
    return Array.from({ length: 5 }, (_, i) => {
      if (i < fullStars) return "full";
      if (i === fullStars && hasHalfStar) return "half";
      return "empty";
    });
  }, [course.rating]);

  return (
    <div className="max-w-md w-full bg-slate-50 rounded-3xl overflow-hidden shadow-lg border border-slate-100 relative group hover:shadow-xl transition-shadow duration-300">
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
      <div className="relative h-64 w-full">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
        />

        {/* Badge Overlay */}
        <div className="absolute bottom-4 left-4 bg-slate-900/90 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
          <span className="font-medium text-lg">{course.tag}</span>
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
            <span className="text-slate-500 text-sm font-medium">{course.reviewCount}</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {course.price}
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
            <span>Lesson {course.lessons}</span>
          </div>
          <div className="w-px h-4 bg-slate-200"></div>
          <div className="flex items-center gap-2 text-slate-700 text-sm font-medium">
            <Clock className="w-4 h-4 text-purple-600" />
            <span>{course.duration}</span>
          </div>
          <div className="w-px h-4 bg-slate-200"></div>
          <div className="flex items-center gap-2 text-slate-700 text-sm font-medium">
            <Users className="w-4 h-4 text-purple-600" />
            <span>Students {course.students}</span>
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-3 mb-8">
          {course.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <span className="text-slate-700 text-sm font-medium">{feature}</span>
            </div>
          ))}
        </div>

        {/* Footer: Instructor & CTA */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-200">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
              <Image
                src={course.instructor.avatar}
                alt={course.instructor.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="font-bold text-slate-900 text-sm">
              {course.instructor.name}
            </span>
          </div>

          <Link href="#">
            <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-full font-medium transition-colors shadow-md shadow-purple-200 hover:shadow-purple-300">
              Enroll
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
