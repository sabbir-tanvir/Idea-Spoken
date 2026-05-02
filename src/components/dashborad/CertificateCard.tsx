"use client"

import { useState } from 'react';
import { motion } from 'motion/react';
import { ApiCourseProgress } from '@/lib/api/courses';
import { getFullImageUrl } from '@/lib/getFullImageUrl';
import { Award, BarChart3, BookOpen, Play } from 'lucide-react';

interface CertificateCardProps {
  progress: ApiCourseProgress;
  index: number;
}

/**
 * Certificate Card - Client Component for animations only
 * This is a minimal client component wrapper to enable motion animations
 * while keeping the parent component server-side
 */
export function CertificateCard({ progress, index }: CertificateCardProps) {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const thumbnailUrl = getFullImageUrl(progress.course?.thumbnail);
  const isCompleted =
    progress.totalLessons > 0 &&
    progress.completedLessons >= progress.totalLessons &&
    progress.progressPercent >= 100;
  const dashboardRoute = `/dashboard?courseId=${progress.courseId}`;

  async function handleGenerateCertificate() {
    if (!isCompleted || isLoading) return;
    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/certificates/generate/${progress.courseId}`,
        { method: 'GET' }
      );

      const contentType = response.headers.get('content-type') ?? '';
      if (response.ok && contentType.includes('application/pdf')) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank', 'noopener,noreferrer');
        window.setTimeout(() => window.URL.revokeObjectURL(url), 1000);
        return;
      }

      const data = await response.json().catch(() => ({}));
      setErrorMessage(
        data.error || data.message || 'Unable to generate certificate right now.'
      );
    } catch (error) {
      console.error('Failed to generate certificate:', error);
      setErrorMessage('Unable to generate certificate right now.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
    >
      {/* Header with Gradient */}
      <div className="bg-linear-to-r from-purple-600 to-blue-600 p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <Award className="w-32 h-32 transform rotate-12" />
        </div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <motion.div 
                className="bg-white/20 backdrop-blur-sm p-2 rounded-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Award className="w-6 h-6" />
              </motion.div>
              <div>
                <p className="text-xs text-white/80">Course</p>
                <p className="text-sm font-semibold">#{progress.courseId}</p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-sm font-bold">
                {progress.progressPercent}% Completed
              </span>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-1 line-clamp-2">
            {progress.course?.title}
          </h3>
          <p className="text-sm text-white/90">{progress.course?.description}</p>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Progress */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span className="font-medium">Lessons:</span>
            <span>
              {progress.completedLessons}/{progress.totalLessons} completed
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <BarChart3 className="w-4 h-4 text-purple-600" />
            <span className="font-medium">Progress:</span>
            <span>{progress.progressPercent}%</span>
          </div>
          <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-600 rounded-full"
              style={{ width: `${Math.min(progress.progressPercent, 100)}%` }}
            />
          </div>
          {!isCompleted && (
            <p className="text-xs text-gray-500">
              Complete the course to unlock your certificate.
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: isCompleted ? 1.02 : 1 }}
            whileTap={{ scale: isCompleted ? 0.98 : 1 }}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors shadow-sm ${
              isCompleted
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-100 text-gray-500 cursor-not-allowed'
            }`}
            onClick={handleGenerateCertificate}
            disabled={!isCompleted || isLoading}
          >
            <Award className="w-4 h-4" />
            <span>{isLoading ? 'Generating...' : 'Generate Certificate'}</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            onClick={() => window.location.assign(dashboardRoute)}
          >
            <Play className="w-4 h-4" />
            <span>Continue Course</span>
          </motion.button>
        </div>

        {errorMessage && (
          <p className="mt-4 text-sm text-red-600">{errorMessage}</p>
        )}
      </div>

      {/* Optional: Course Thumbnail */}
      {thumbnailUrl ? (
        <div className="px-6 pb-6">
          <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnailUrl}
              alt={progress.course?.title ?? 'Course thumbnail'}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      ) : null}
    </motion.div>
  );
}
