"use client";

import { ApiCourseDetail, ApiModule, ApiLesson } from "@/lib/api/courses";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Clock,
  ChevronDown,
  ChevronRight,
  Play,
  Lock,
  ArrowLeft,
  Layers,
  BarChart3,
} from "lucide-react";

interface MyCoursesProps {
  courses: ApiCourseDetail[];
}

/** Format seconds to human-readable duration */
function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins} min`;
  const hrs = Math.floor(mins / 60);
  const remainMins = mins % 60;
  return remainMins > 0 ? `${hrs}h ${remainMins}m` : `${hrs}h`;
}

/** Count total lessons in a course */
function totalLessons(modules: ApiModule[]): number {
  return modules.reduce((sum, m) => sum + m.lessons.length, 0);
}

// ─── Course Card (list view) ─────────────────────────────────────────
function CourseListCard({
  course,
  onView,
}: {
  course: ApiCourseDetail;
  onView: () => void;
}) {
  const lessons = totalLessons(course.modules);
  const LEVEL_LABELS: Record<string, string> = {
    BEGINNER: "Beginner",
    INTERMEDIATE: "Intermediate",
    ADVANCED: "Advanced",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Thumbnail */}
        <div className="sm:w-48 h-40 sm:h-auto bg-gradient-to-br from-purple-100 to-blue-100 flex-shrink-0 relative overflow-hidden">
          {course.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={course.thumbnail}
              alt={course.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <BookOpen className="w-12 h-12 text-purple-300" />
            </div>
          )}
          <div className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {LEVEL_LABELS[course.level] ?? course.level}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
              {course.title}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2 mb-4">
              {course.description}
            </p>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3">
            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-purple-600" />
                {course.modules.length} Module{course.modules.length !== 1 ? "s" : ""}
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-purple-600" />
                {lessons} Lesson{lessons !== 1 ? "s" : ""}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-purple-600" />
                {formatDuration(course.duration)}
              </span>
            </div>

            {/* View Button */}
            <button
              onClick={onView}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-xl hover:bg-purple-700 transition-colors"
            >
              View Course
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Module Accordion ────────────────────────────────────────────────
function ModuleAccordion({
  module,
  index,
  isFirst,
}: {
  module: ApiModule;
  index: number;
  isFirst: boolean;
}) {
  const [open, setOpen] = useState(isFirst);
  const isLocked = !isFirst;
  const sortedLessons = [...module.lessons].sort(
    (a, b) => a.sortOrder - b.sortOrder
  );

  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      {/* Module Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center gap-4 p-4 md:p-5 text-left transition-colors ${
          isLocked
            ? "bg-gray-50 hover:bg-gray-100"
            : "bg-purple-50 hover:bg-purple-100"
        }`}
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            isLocked
              ? "bg-gray-200 text-gray-500"
              : "bg-purple-600 text-white"
          }`}
        >
          {isLocked ? (
            <Lock className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Module {module.sortOrder}
          </p>
          <h4 className="text-base font-bold text-gray-900 truncate">
            {module.title}
          </h4>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="hidden sm:block text-xs text-gray-500">
            {module.lessons.length} lesson{module.lessons.length !== 1 ? "s" : ""}
          </span>
          {isLocked && (
            <span className="hidden sm:block text-xs font-medium text-gray-400 bg-gray-200 px-2.5 py-1 rounded-full">
              Locked
            </span>
          )}
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Lessons List */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="divide-y divide-gray-50">
              {sortedLessons.length === 0 ? (
                <div className="px-5 py-4 text-sm text-gray-400 italic">
                  No lessons added yet
                </div>
              ) : (
                sortedLessons.map((lesson) => (
                  <LessonRow
                    key={lesson.id}
                    lesson={lesson}
                    isLocked={isLocked}
                  />
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Lesson Row ──────────────────────────────────────────────────────
function LessonRow({
  lesson,
  isLocked,
}: {
  lesson: ApiLesson;
  isLocked: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 px-5 py-3.5 ${
        isLocked ? "opacity-60" : "hover:bg-purple-50/50 cursor-pointer"
      } transition-colors`}
    >
      {/* Play / Lock icon */}
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
          isLocked
            ? "bg-gray-100 text-gray-400"
            : lesson.isPreview
            ? "bg-purple-100 text-purple-600"
            : "bg-gray-100 text-gray-500"
        }`}
      >
        {isLocked ? (
          <Lock className="w-3.5 h-3.5" />
        ) : (
          <Play className="w-3.5 h-3.5 ml-0.5" fill="currentColor" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {lesson.title}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-gray-400">
            {formatDuration(lesson.duration)}
          </span>
          {lesson.isPreview && !isLocked && (
            <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
              Preview
            </span>
          )}
        </div>
      </div>

      {/* Status */}
      <div className="flex-shrink-0">
        {isLocked ? (
          <span className="text-xs text-gray-400">Locked</span>
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-400" />
        )}
      </div>
    </div>
  );
}

// ─── Course Detail View (modules + lessons) ──────────────────────────
function CourseDetailView({
  course,
  onBack,
}: {
  course: ApiCourseDetail;
  onBack: () => void;
}) {
  const sortedModules = [...course.modules].sort(
    (a, b) => a.sortOrder - b.sortOrder
  );
  const lessons = totalLessons(course.modules);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
    >
      {/* Back + Title */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-purple-600 font-medium hover:text-purple-700 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to My Courses
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {course.title}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
            {course.description}
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
              <Layers className="w-4 h-4 text-purple-600" />
              {sortedModules.length} Module{sortedModules.length !== 1 ? "s" : ""}
            </span>
            <span className="flex items-center gap-1.5 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
              <BookOpen className="w-4 h-4 text-purple-600" />
              {lessons} Lesson{lessons !== 1 ? "s" : ""}
            </span>
            <span className="flex items-center gap-1.5 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
              <Clock className="w-4 h-4 text-purple-600" />
              {formatDuration(course.duration)}
            </span>
            <span className="flex items-center gap-1.5 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
              <BarChart3 className="w-4 h-4 text-purple-600" />
              {course.level}
            </span>
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-3">
        {sortedModules.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Layers className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="font-medium">No modules available yet</p>
            <p className="text-sm mt-1">
              Course content is being prepared — check back soon!
            </p>
          </div>
        ) : (
          sortedModules.map((module, index) => (
            <ModuleAccordion
              key={module.id}
              module={module}
              index={index}
              isFirst={index === 0}
            />
          ))
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────
export default function MyCourses({ courses }: MyCoursesProps) {
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const selectedCourse = courses.find((c) => c.id === selectedCourseId) ?? null;

  return (
    <AnimatePresence mode="wait">
      {selectedCourse ? (
        <CourseDetailView
          key="detail"
          course={selectedCourse}
          onBack={() => setSelectedCourseId(null)}
        />
      ) : (
        <motion.div
          key="list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {courses.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-4 bg-purple-50 rounded-full flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-purple-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                No Courses Yet
              </h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto">
                You haven&apos;t enrolled in any courses yet. Browse our courses
                and start learning today!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {courses.map((course) => (
                <CourseListCard
                  key={course.id}
                  course={course}
                  onView={() => setSelectedCourseId(course.id)}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
