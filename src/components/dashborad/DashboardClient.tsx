"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, BookOpen, BarChart3, Layers } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import MyCourses, { CourseDetailView } from "./MyCourses";
import VideoPlayer from "./VideoPlayer";
import { ApiCourseDetail, ApiLesson } from "@/lib/api/courses";

interface DashboardClientProps {
    courses: ApiCourseDetail[];
    userName: string;
    userEmail: string;
    userRole: string;
    totalModules: number;
    totalLessons: number;
}

const LEVEL_LABELS: Record<string, string> = {
    BEGINNER: "Beginner",
    INTERMEDIATE: "Intermediate",
    ADVANCED: "Advanced",
};

export default function DashboardClient({
    courses,
    userName,
    userEmail,
    userRole,
    totalModules,
    totalLessons,
}: DashboardClientProps) {
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
    const [selectedLesson, setSelectedLesson] = useState<ApiLesson | null>(null);
    const selectedCourse = courses.find((c) => c.id === selectedCourseId) ?? null;

    // Scroll to top whenever the view changes
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [selectedCourseId, selectedLesson]);

    // Reset lesson when navigating back to course list
    function handleSelectCourse(id: number) {
        setSelectedLesson(null);
        setSelectedCourseId(id);
    }

    function handleBackToDashboard() {
        setSelectedLesson(null);
        setSelectedCourseId(null);
    }

    return (
        <AnimatePresence mode="wait">
            {/* ── VIDEO PLAYER VIEW: full viewport two-panel layout ── */}
            {selectedCourse && selectedLesson ? (
                <VideoPlayer
                    key="video"
                    course={selectedCourse}
                    initialLesson={selectedLesson}
                    onBack={() => setSelectedLesson(null)}
                />
            ) : selectedCourse ? (
                /* ── DETAIL VIEW: full-width, no sidebar, no stats ── */
                <motion.div
                    key="detail"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="min-h-screen bg-gray-50"
                >
                    {/* Sticky top bar */}
                    <div className="sticky top-1 z-20 bg-white border-b border-gray-200 shadow-sm">
                        <div className="container mx-auto px-4 py-3 flex items-center gap-4">
                            <button
                                onClick={handleBackToDashboard}
                                className="inline-flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors shrink-0"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                My Dashboard
                            </button>
                            <div className="h-5 w-px bg-gray-200 shrink-0" />
                            <div className="flex items-center gap-3 min-w-0">
                                <h2 className="text-sm font-bold text-gray-900 truncate">
                                    {selectedCourse.title}
                                </h2>
                                <span className="hidden sm:block text-xs font-semibold bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full shrink-0">
                                    {LEVEL_LABELS[selectedCourse.level] ?? selectedCourse.level}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Full-width course content */}
                    <div className="container mx-auto  px-4 py-8 max-w-4xl">
                        <CourseDetailView
                            course={selectedCourse}
                            onLessonSelect={setSelectedLesson}
                        />
                    </div>
                </motion.div>
            ) : (
                /* ── DASHBOARD VIEW: normal layout with sidebar + stats ── */
                <motion.div
                    key="dashboard"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="min-h-screen bg-gray-50 py-6 md:py-16"
                >
                    <div className="container mx-auto px-4">


                        <div className="flex flex-col lg:flex-row gap-6 lg:gap-20">
                            {/* Sidebar */}
                            <div className="lg:w-80 shrink-0">
                                <DashboardSidebar
                                    userName={userName}
                                    userEmail={userEmail}
                                    userStatus={userRole}
                                />
                            </div>

                            {/* Main content */}
                            <main className="flex-1 ">
                                {/* Header */}
                                <div className="mb-8">
                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                        My Courses
                                    </h1>
                                    <p className="text-gray-600">
                                        Welcome back, {userName}! Continue your learning journey.
                                    </p>
                                </div>
                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-3 md:gap-6 mb-8">
                                    <div className="p-3 md:p-6 bg-white rounded-xl md:rounded-2xl shadow-sm">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2 md:mb-3">
                                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-purple-100 flex items-center justify-center">
                                                <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                                            </div>
                                            <h3 className="text-xs md:text-sm font-semibold text-gray-500 leading-tight">
                                                Courses
                                            </h3>
                                        </div>
                                        <p className="text-2xl md:text-3xl font-bold text-purple-600">
                                            {courses.length}
                                        </p>
                                    </div>
                                    <div className="p-3 md:p-6 bg-white rounded-xl md:rounded-2xl shadow-sm">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2 md:mb-3">
                                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-blue-100 flex items-center justify-center">
                                                <Layers className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                                            </div>
                                            <h3 className="text-xs md:text-sm font-semibold text-gray-500 leading-tight">
                                                Modules
                                            </h3>
                                        </div>
                                        <p className="text-2xl md:text-3xl font-bold text-blue-600">
                                            {totalModules}
                                        </p>
                                    </div>
                                    <div className="p-3 md:p-6 bg-white rounded-xl md:rounded-2xl shadow-sm">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2 md:mb-3">
                                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-green-100 flex items-center justify-center">
                                                <BarChart3 className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                                            </div>
                                            <h3 className="text-xs md:text-sm font-semibold text-gray-500 leading-tight">
                                                Lessons
                                            </h3>
                                        </div>
                                        <p className="text-2xl md:text-3xl font-bold text-green-600">
                                            {totalLessons}
                                        </p>
                                    </div>
                                </div>

                                {/* Course list */}
                                <MyCourses
                                    courses={courses}
                                    selectedId={null}
                                    onSelect={handleSelectCourse}
                                />
                            </main>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
