"use client";

import { useState } from "react";
import { ApiCourseDetail, ApiLesson, ApiModule } from "@/lib/api/courses";
import { CheckCircle2, Play, ChevronDown, Clock, ArrowLeft, BookOpen, PanelRightClose, PanelRight, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface VideoPlayerProps {
  course: ApiCourseDetail;
  initialLesson: ApiLesson;
  onBack: () => void; // back to course detail
}

/** Format seconds to readable */
function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins} min`;
  const hrs = Math.floor(mins / 60);
  const rem = mins % 60;
  return rem > 0 ? `${hrs}h ${rem}m` : `${hrs}h`;
}

// ─── Sidebar Lesson Item ─────────────────────────────────────────────
function SidebarLesson({
  lesson,
  isActive,
  onSelect,
}: {
  lesson: ApiLesson;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
        isActive
          ? "bg-purple-600 text-white"
          : lesson.completed
          ? "hover:bg-gray-700 text-gray-300"
          : "hover:bg-gray-700 text-gray-200"
      }`}
    >
      {/* Icon */}
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
          isActive
            ? "bg-white/20"
            : lesson.completed
            ? "bg-green-500/20 text-green-400"
            : "bg-gray-600"
        }`}
      >
        {lesson.completed && !isActive ? (
          <CheckCircle2 className="w-4 h-4 text-green-400" />
        ) : (
          <Play className="w-3 h-3 ml-0.5" fill="currentColor" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-xs font-medium leading-snug truncate ${
            isActive ? "text-white" : lesson.completed ? "text-gray-400 line-through" : "text-gray-200"
          }`}
        >
          {lesson.title}
        </p>
        <span className={`text-xs ${isActive ? "text-purple-200" : "text-gray-500"}`}>
          {formatDuration(lesson.duration)}
        </span>
      </div>

      {/* Active indicator */}
      {isActive && (
        <div className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
      )}
    </button>
  );
}

// ─── Sidebar Module Section ──────────────────────────────────────────
function SidebarModule({
  module,
  currentLessonId,
  onSelect,
}: {
  module: ApiModule;
  currentLessonId: number;
  onSelect: (lesson: ApiLesson) => void;
}) {
  const sortedLessons = [...module.lessons].sort((a, b) => a.sortOrder - b.sortOrder);
  const hasActive = sortedLessons.some((l) => l.id === currentLessonId);
  const [open, setOpen] = useState(hasActive);
  const completedCount = sortedLessons.filter((l) => l.completed).length;

  return (
    <div className="border-b border-gray-700">
      {/* Module header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-700 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
            Module {module.sortOrder}
          </p>
          <p className="text-sm font-semibold text-gray-200 truncate">{module.title}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-gray-500">
            {completedCount}/{sortedLessons.length}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Lessons */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {sortedLessons.map((lesson) => (
              <SidebarLesson
                key={lesson.id}
                lesson={lesson}
                isActive={lesson.id === currentLessonId}
                onSelect={() => onSelect(lesson)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main VideoPlayer ────────────────────────────────────────────────
export default function VideoPlayer({ course, initialLesson, onBack }: VideoPlayerProps) {
  const [currentLesson, setCurrentLesson] = useState<ApiLesson>(initialLesson);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sortedModules = [...(course.modules ?? [])].sort((a, b) => a.sortOrder - b.sortOrder);

  const hasVideo = currentLesson.video_id && currentLesson.library_id;
  const embedUrl = hasVideo
    ? `https://iframe.mediadelivery.net/embed/${currentLesson.library_id}/${currentLesson.video_id}?autoplay=true&preload=true&responsive=true`
    : null;

  // Flat ordered lesson list for prev/next
  const allLessons = sortedModules.flatMap((m) =>
    [...m.lessons].sort((a, b) => a.sortOrder - b.sortOrder)
  );
  const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id);
  const nextLesson = allLessons[currentIndex + 1] ?? null;
  const prevLesson = allLessons[currentIndex - 1] ?? null;

  return (
    <div className="flex flex-col bg-gray-900">
      {/* ── Top Bar ── */}
      <div className="sticky top-0 z-30 shrink-0 h-14 bg-gray-900 border-b border-gray-700 flex items-center px-3 sm:px-5 gap-3">
        {/* Back */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back</span>
        </button>

        <div className="w-px h-4 bg-gray-700 shrink-0" />

        {/* Course title */}
        <span className="text-sm font-semibold text-white truncate flex-1 min-w-0">
          {course.title}
        </span>

        {/* Prev / Next */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => prevLesson && setCurrentLesson(prevLesson)}
            disabled={!prevLesson}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← <span className="hidden sm:inline">Prev</span>
          </button>
          <button
            onClick={() => nextLesson && setCurrentLesson(nextLesson)}
            disabled={!nextLesson}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <span className="hidden sm:inline">Next</span> →
          </button>
        </div>

        {/* Sidebar toggle */}
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          title={sidebarOpen ? "Hide course content" : "Show course content"}
          className="ml-1 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors shrink-0"
        >
          {sidebarOpen ? (
            <PanelRightClose className="w-5 h-5" />
          ) : (
            <PanelRight className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* ── Body ── */}
      <div className="flex min-h-[calc(100vh-3.5rem)] relative">
        {/* ── Left: Video ── */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Video with top/bottom breathing room */}
          <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-4">
            <div className="relative w-full rounded-xl overflow-hidden" style={{ paddingTop: "56.25%" }}>
              {embedUrl ? (
                <iframe
                  key={currentLesson.id}
                  src={embedUrl}
                  loading="lazy"
                  style={{
                    border: "none",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 gap-4 rounded-xl">
                  <BookOpen className="w-16 h-16 text-gray-600" />
                  <p className="text-gray-400 text-sm">No video available for this lesson</p>
                </div>
              )}
            </div>
          </div>

          {/* Lesson info */}
          <div className="px-4 sm:px-6 lg:px-8 pb-8 border-t border-gray-700 pt-4 mt-2">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-2">{currentLesson.title}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {formatDuration(currentLesson.duration)}
              </span>
              {currentLesson.completed && (
                <span className="flex items-center gap-1.5 text-green-400">
                  <CheckCircle2 className="w-4 h-4" />
                  Completed
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── Right: Sidebar — Desktop (inline) ── */}
        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion.aside
              key="desktop-sidebar"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "24rem", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="hidden lg:flex flex-col shrink-0 bg-gray-800 border-l border-gray-700 overflow-hidden"
            >
              <div className="w-96 flex flex-col h-full">
                <SidebarContent
                  sortedModules={sortedModules}
                  allLessons={allLessons}
                  currentLesson={currentLesson}
                  onSelect={setCurrentLesson}
                />
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* ── Right: Sidebar — Mobile (fixed overlay) ── */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden fixed inset-0 z-40 bg-black/60"
              />

              {/* Drawer */}
              <motion.aside
                key="mobile-sidebar"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="lg:hidden fixed top-0 right-0 z-50 w-80 max-w-[90vw] h-full bg-gray-800 flex flex-col shadow-2xl"
              >
                {/* Drawer header with close */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 shrink-0">
                  <div>
                    <h3 className="text-sm font-bold text-white">Course Content</h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {sortedModules.length} modules · {allLessons.length} lessons
                    </p>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {sortedModules.map((module) => (
                    <SidebarModule
                      key={module.id}
                      module={module}
                      currentLessonId={currentLesson.id}
                      onSelect={(l) => { setCurrentLesson(l); setSidebarOpen(false); }}
                    />
                  ))}
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Reusable sidebar body for desktop ──────────────────────────────
function SidebarContent({
  sortedModules,
  allLessons,
  currentLesson,
  onSelect,
}: {
  sortedModules: ApiModule[];
  allLessons: ApiLesson[];
  currentLesson: ApiLesson;
  onSelect: (l: ApiLesson) => void;
}) {
  return (
    <>
      <div className="shrink-0 px-4 py-3 border-b border-gray-700">
        <h3 className="text-sm font-bold text-white">Course Content</h3>
        <p className="text-xs text-gray-400 mt-0.5">
          {sortedModules.length} modules · {allLessons.length} lessons
        </p>
      </div>
      <div className="flex-1 overflow-y-auto">
        {sortedModules.map((module) => (
          <SidebarModule
            key={module.id}
            module={module}
            currentLessonId={currentLesson.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </>
  );
}
