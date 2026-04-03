"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ApiCourseDetail, ApiLesson, ApiModule } from "@/lib/api/courses";
import { CheckCircle2, Play, ChevronDown, Clock, ArrowLeft, BookOpen, PanelRightClose, PanelRight, Lock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getQuizzesByLesson, submitQuizAnswer, getQuizResults, ApiQuiz } from "@/lib/api/quizzes";
import { completeLesson } from "@/lib/api/courses";

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
  isLocked,
  onSelect,
}: {
  lesson: ApiLesson;
  isActive: boolean;
  isLocked: boolean;
  onSelect: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  // Scroll active lesson into view on mount
  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [isActive]);

  return (
    <button
      ref={ref}
      disabled={isLocked}
      onClick={onSelect}
      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
        isActive
          ? "bg-purple-600 text-white"
          : isLocked
          ? "bg-gray-800 text-gray-500 cursor-not-allowed"
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
            : isLocked
            ? "bg-gray-700 text-gray-500"
            : lesson.completed
            ? "bg-green-500/20 text-green-400"
            : "bg-gray-600"
        }`}
      >
        {isLocked ? (
          <Lock className="w-4 h-4" />
        ) : lesson.completed && !isActive ? (
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
        {isLocked ? (
          <span className="text-xs text-gray-500">Locked</span>
        ) : (
          <span className={`text-xs ${isActive ? "text-purple-200" : "text-gray-500"}`}>
            {formatDuration(lesson.duration)}
          </span>
        )}
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
  moduleIndex,
  currentLessonId,
  isModuleUnlocked,
  isLessonUnlocked,
  onSelect,
}: {
  module: ApiModule;
  moduleIndex: number;
  currentLessonId: number;
  isModuleUnlocked: (moduleIndex: number) => boolean;
  isLessonUnlocked: (moduleIndex: number, lessonIndex: number) => boolean;
  onSelect: (lesson: ApiLesson) => void;
}) {
  const sortedLessons = [...module.lessons].sort((a, b) => a.sortOrder - b.sortOrder);
  const moduleUnlocked = isModuleUnlocked(moduleIndex);
  const hasActive = sortedLessons.some((l) => l.id === currentLessonId);
  // Always open if this module contains the playing lesson; otherwise user can toggle
  const [manualOpen, setManualOpen] = useState(false);
  const open = hasActive || manualOpen;
  const completedCount = sortedLessons.filter((l) => l.completed).length;

  return (
    <div className="border-b border-gray-700">
      {/* Module header */}
      <button
        onClick={() => setManualOpen((v) => !v)}
        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
          moduleUnlocked ? "hover:bg-gray-700" : "bg-gray-800"
        }`}
      >
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
            Module {module.sortOrder}
          </p>
          <p className="text-sm font-semibold text-gray-200 truncate">{module.title}</p>
          {!moduleUnlocked && (
            <p className="text-xs text-gray-500 mt-0.5">Complete previous module to unlock</p>
          )}
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
                isLocked={!isLessonUnlocked(moduleIndex, sortedLessons.findIndex((l) => l.id === lesson.id))}
                onSelect={() => {
                  const lessonIndex = sortedLessons.findIndex((l) => l.id === lesson.id);
                  if (!isLessonUnlocked(moduleIndex, lessonIndex)) return;
                  onSelect(lesson);
                }}
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
  const [courseState, setCourseState] = useState<ApiCourseDetail>(course);
  const [currentLesson, setCurrentLesson] = useState<ApiLesson>(initialLesson);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [quizVisible, setQuizVisible] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizSubmitting, setQuizSubmitting] = useState(false);
  const [quizList, setQuizList] = useState<ApiQuiz[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizSubmittedAll, setQuizSubmittedAll] = useState(false);
  const [quizResult, setQuizResult] = useState<{
    totalQuestions: number;
    correctAnswers: number;
    earnedPoints: number;
    totalPoints: number;
    answers: Array<{
      quizId: number;
      isCorrect: boolean;
      userAnswer?: string;
      correctAnswer?: string;
    }>;
  } | null>(null);
  const [quizError, setQuizError] = useState<string | null>(null);
  const [lessonCompleting, setLessonCompleting] = useState(false);
  const quizTriggeredRef = useRef(false);

  const sortedModules = [...(courseState.modules ?? [])].sort((a, b) => a.sortOrder - b.sortOrder);

  const hasVideo = currentLesson.video_id && currentLesson.library_id;
  const embedUrl = hasVideo
    ? `https://iframe.mediadelivery.net/embed/${currentLesson.library_id}/${currentLesson.video_id}?autoplay=true&preload=true&responsive=true`
    : null;

  // Flat ordered lesson list for prev/next
  const isModuleUnlocked = (moduleIndex: number) => {
    if (moduleIndex === 0) return true;
    const prevModule = sortedModules[moduleIndex - 1];
    if (!prevModule) return false;
    const prevLessons = [...prevModule.lessons].sort((a, b) => a.sortOrder - b.sortOrder);
    return prevLessons.length > 0 && prevLessons.every((lesson) => lesson.completed);
  };

  const isLessonUnlocked = (moduleIndex: number, lessonIndex: number) => {
    if (!isModuleUnlocked(moduleIndex)) return false;
    const currentModule = sortedModules[moduleIndex];
    if (!currentModule) return false;
    const lessons = [...currentModule.lessons].sort((a, b) => a.sortOrder - b.sortOrder);
    const lesson = lessons[lessonIndex];
    if (!lesson) return false;
    if (lesson.completed) return true;
    if (lessonIndex === 0) return true;
    return lessons[lessonIndex - 1]?.completed ?? false;
  };

  const allLessons = sortedModules.flatMap((module, moduleIndex) =>
    [...module.lessons]
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((lesson, lessonIndex) => ({
        lesson,
        moduleIndex,
        lessonIndex,
        locked: !isLessonUnlocked(moduleIndex, lessonIndex),
      }))
  );
  const currentIndex = allLessons.findIndex((entry) => entry.lesson.id === currentLesson.id);
  const nextLesson = allLessons.slice(currentIndex + 1).find((entry) => !entry.locked)?.lesson ?? null;
  const prevLesson = [...allLessons].slice(0, currentIndex).reverse().find((entry) => !entry.locked)?.lesson ?? null;

  const resetQuizState = useCallback(() => {
    quizTriggeredRef.current = false;
    setQuizVisible(false);
    setQuizLoading(false);
    setQuizSubmitting(false);
    setQuizList([]);
    setQuizIndex(0);
    setQuizAnswers({});
    setQuizSubmittedAll(false);
    setQuizResult(null);
    setQuizError(null);
  }, []);

  const openLesson = useCallback((lesson: ApiLesson) => {
    resetQuizState();
    setCurrentLesson(lesson);
  }, [resetQuizState]);

  // Scroll to top on mount and when lesson changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentLesson.id]);

  const markLessonCompletedInState = useCallback((lessonId: number) => {
    setCourseState((prev) => {
      const nextModules = prev.modules.map((module) => ({
        ...module,
        lessons: module.lessons.map((lesson) =>
          lesson.id === lessonId
            ? { ...lesson, completed: true, completedAt: new Date().toISOString() }
            : lesson
        ),
      }));

      return {
        ...prev,
        modules: nextModules,
      };
    });

    setCurrentLesson((prev) =>
      prev.id === lessonId ? { ...prev, completed: true, completedAt: new Date().toISOString() } : prev
    );
  }, []);

  const completeCurrentLesson = useCallback(async () => {
    if (currentLesson.completed) return true;
    const response = await completeLesson(currentLesson.id);
    if (!response.success) {
      setQuizError(response.message ?? "Failed to mark lesson as complete.");
      return false;
    }
    markLessonCompletedInState(currentLesson.id);
    return true;
  }, [currentLesson.completed, currentLesson.id, markLessonCompletedInState]);

  async function handleManualCompleteLesson() {
    if (lessonCompleting || quizLoading || quizVisible) return;

    setLessonCompleting(true);
    setQuizError(null);

    const completed = await completeCurrentLesson();
    if (!completed) {
      setLessonCompleting(false);
      return;
    }

    setQuizLoading(true);
    const quizzes = await getQuizzesByLesson(currentLesson.id);
    setQuizLoading(false);
    setLessonCompleting(false);

    if (!quizzes.length) {
      if (nextLesson) openLesson(nextLesson);
      return;
    }

    setQuizList(quizzes);
    setQuizIndex(0);
    setQuizAnswers({});
    setQuizSubmittedAll(false);
    setQuizResult(null);
    setQuizVisible(true);
  }

  async function handleSubmitQuiz() {
    const currentQuiz = quizList[quizIndex];
    if (!currentQuiz) return;
    const selectedOption = quizAnswers[currentQuiz.id] ?? "";
    if (!selectedOption) {
      setQuizError("Please select an answer.");
      return;
    }

    setQuizSubmitting(true);
    setQuizError(null);

    const submitResponse = await submitQuizAnswer(currentQuiz.id, selectedOption);
    if (!submitResponse.ok || submitResponse.data?.success === false) {
      setQuizSubmitting(false);
      setQuizError(submitResponse.data?.message ?? "Quiz submission failed.");
      return;
    }

    if (quizIndex < quizList.length - 1) {
      setQuizIndex((prev) => prev + 1);
      setQuizSubmitting(false);
      return;
    }

    const resultsResponse = await getQuizResults(currentLesson.id);
    if (!resultsResponse.ok || !resultsResponse.data.success || !resultsResponse.data.data) {
      setQuizSubmitting(false);
      setQuizError(resultsResponse.data.message ?? "Could not load final results.");
      return;
    }

    setQuizResult({
      totalQuestions: resultsResponse.data.data.totalQuestions,
      correctAnswers: resultsResponse.data.data.correctAnswers,
      earnedPoints: resultsResponse.data.data.earnedPoints,
      totalPoints: resultsResponse.data.data.totalPoints,
      answers: resultsResponse.data.data.answers,
    });
    setQuizSubmittedAll(true);
    setQuizSubmitting(false);
  }

  function handleNextLessonAfterQuiz() {
    setQuizVisible(false);
    setQuizList([]);
    setQuizSubmittedAll(false);
    if (nextLesson) openLesson(nextLesson);
  }

  return (
    <div className="bg-gray-900 min-h-screen">
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
            onClick={handleManualCompleteLesson}
            disabled={lessonCompleting || quizLoading || quizVisible}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-green-600 text-green-300 hover:bg-green-700/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {lessonCompleting || quizLoading ? "Completing..." : "Complete Lesson"}
          </button>
          <button
            onClick={() => prevLesson && openLesson(prevLesson)}
            disabled={!prevLesson}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← <span className="hidden sm:inline">Prev</span>
          </button>
          <button
            onClick={() => nextLesson && openLesson(nextLesson)}
            disabled={!nextLesson}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <span className="hidden sm:inline">Next</span> →
          </button>
        </div>

        {/* Sidebar toggle — desktop only */}
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          title={sidebarOpen ? "Hide course content" : "Show course content"}
          className="hidden lg:flex ml-1 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors shrink-0"
        >
          {sidebarOpen ? (
            <PanelRightClose className="w-5 h-5" />
          ) : (
            <PanelRight className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* ── Desktop: Two-panel layout ── */}
      <div className="hidden lg:flex min-h-[calc(100vh-3.5rem)]">
        {/* Left: Video */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="px-6 xl:px-8 pt-6 pb-4">
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
          <div className="px-6 xl:px-8 pb-10 border-t border-gray-700 pt-4 mt-2">
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

        {/* Right: Sidebar (animated in/out) */}
        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion.aside
              key="desktop-sidebar"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "24rem", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="flex flex-col shrink-0 bg-gray-800 border-l border-gray-700 overflow-hidden"
            >
              <div className="w-96 flex flex-col h-full">
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
                      moduleIndex={sortedModules.findIndex((m) => m.id === module.id)}
                      currentLessonId={currentLesson.id}
                      isModuleUnlocked={isModuleUnlocked}
                      isLessonUnlocked={isLessonUnlocked}
                      onSelect={openLesson}
                    />
                  ))}
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      {/* ── Mobile: Stacked layout (video → info → modules below) ── */}
      <div className="lg:hidden flex flex-col">
        {/* Video */}
        <div className="px-3 sm:px-4 pt-4 pb-3">
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
                <BookOpen className="w-12 h-12 text-gray-600" />
                <p className="text-gray-400 text-sm">No video available</p>
              </div>
            )}
          </div>
        </div>

        {/* Lesson info */}
        <div className="px-3 sm:px-4 pb-4 pt-2">
          <h2 className="text-base sm:text-lg font-bold text-white mb-1">{currentLesson.title}</h2>
          <div className="flex items-center gap-3 text-sm text-gray-400">
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
          <button
            onClick={handleManualCompleteLesson}
            disabled={lessonCompleting || quizLoading || quizVisible}
            className="mt-3 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {lessonCompleting || quizLoading ? "Completing..." : "Complete Lesson"}
          </button>
        </div>

        {/* Module list — inline below video */}
        <div className="border-t border-gray-700 bg-gray-800">
          <div className="px-3 sm:px-4 py-3 border-b border-gray-700">
            <h3 className="text-sm font-bold text-white">Course Content</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              {sortedModules.length} modules · {allLessons.length} lessons
            </p>
          </div>
          {sortedModules.map((module) => (
            <SidebarModule
              key={module.id}
              module={module}
              moduleIndex={sortedModules.findIndex((m) => m.id === module.id)}
              currentLessonId={currentLesson.id}
              isModuleUnlocked={isModuleUnlocked}
              isLessonUnlocked={isLessonUnlocked}
              onSelect={(l) => {
                openLesson(l);
                // Scroll back to top so user sees the video
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Quiz Overlay ── */}
      {quizVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 sm:p-8">
            {quizLoading ? (
              <div className="text-center text-gray-600">Loading quiz...</div>
            ) : (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    Quiz {quizIndex + 1} of {quizList.length}
                  </h3>
                  <span className="text-xs text-gray-500">Lesson {currentLesson.title}</span>
                </div>

                <p className="text-base font-semibold text-gray-800 mb-4">
                  {quizList[quizIndex]?.question}
                </p>

                <div className="space-y-2 mb-4">
                  {quizList[quizIndex]?.options?.map((option) => (
                    <label
                      key={option}
                      className={`flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer transition-colors ${
                        quizAnswers[quizList[quizIndex]?.id ?? -1] === option
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-purple-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="quiz-option"
                        value={option}
                        checked={quizAnswers[quizList[quizIndex]?.id ?? -1] === option}
                        onChange={() =>
                          setQuizAnswers((prev) => ({
                            ...prev,
                            [quizList[quizIndex]?.id ?? -1]: option,
                          }))
                        }
                        className="h-4 w-4 text-purple-600"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>

                {quizError && (
                  <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
                    {quizError}
                  </div>
                )}

                {quizResult && (
                  <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    <p className="font-semibold mb-2">
                      You answered {quizResult.correctAnswers}/{quizResult.totalQuestions} correctly and earned {quizResult.earnedPoints}/{quizResult.totalPoints} points.
                    </p>
                    <div className="space-y-1">
                      {quizResult.answers.map((answer, index) => (
                        <p key={answer.quizId} className="text-xs sm:text-sm">
                          Q{index + 1}: Your answer: {answer.userAnswer ?? "-"} | Correct answer: {answer.correctAnswer ?? "-"}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  {!quizSubmittedAll ? (
                    <button
                      type="button"
                      onClick={handleSubmitQuiz}
                      disabled={quizSubmitting}
                      className="px-6 py-2 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 disabled:opacity-60"
                    >
                      {quizSubmitting
                        ? "Submitting..."
                        : quizIndex < quizList.length - 1
                        ? "Submit & Next"
                        : "Submit All"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNextLessonAfterQuiz}
                      className="px-6 py-2 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700"
                    >
                      {nextLesson ? "Next Lesson" : "Finish"}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
