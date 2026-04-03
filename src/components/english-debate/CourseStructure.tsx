"use client";

import { EnglishDebateData } from "@/lib/api";
import { ApiCourseDetail } from "@/lib/api/courses";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Mic, Trophy, Play, Lock, X } from "lucide-react";
import { useState } from "react";

interface CourseStructureProps {
    data: EnglishDebateData;
    courseDetail?: ApiCourseDetail | null;
}

const getIcon = (iconName: string) => {
    switch (iconName) {
        case "brain": return <Brain className="w-8 h-8 text-purple-600" />;
        case "speech": return <Mic className="w-8 h-8 text-purple-600" />;
        case "trophy": return <Trophy className="w-8 h-8 text-purple-600" />;
        default: return <Brain className="w-8 h-8 text-purple-600" />;
    }
};

export default function CourseStructure({ data, courseDetail }: CourseStructureProps) {
    const [previewOpen, setPreviewOpen] = useState(false);
    
    if (!data.skillsHighlights || !data.courseModules) return null;

    // Build module list: prefer API modules, fall back to static data
    const apiModules = courseDetail?.modules
        ? [...courseDetail.modules].sort((a, b) => a.sortOrder - b.sortOrder)
        : [];
    const hasApiModules = apiModules.length > 0;

    const moduleList = hasApiModules
        ? apiModules.map((m, i) => ({
              id: m.id,
              title: m.title,
              isLocked: i !== 0,
              previewLabel: i === 0 ? 'Preview' : undefined,
              prefix: `Module ${m.sortOrder}`,
              lessonCount: m.lessons.length,
          }))
        : data.courseModules;

    // Get first lesson for preview video
    const firstLesson = courseDetail
        ? [...courseDetail.modules]
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .flatMap((module) => [...module.lessons].sort((a, b) => a.sortOrder - b.sortOrder))[0]
        : undefined;

    const previewEmbedUrl = firstLesson?.video_id && firstLesson?.library_id
        ? `https://iframe.mediadelivery.net/embed/${firstLesson.library_id}/${firstLesson.video_id}?autoplay=true&preload=true&responsive=true`
        : undefined;

    return (
        <section className="bg-white w-full">
            <div className="container mx-auto px-4 py-20">
                {/* Skills Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 max-w-5xl mx-auto">
                    {data.skillsHighlights.map((skill, index) => (
                        <motion.div
                            key={skill.id}
                            className="flex flex-col items-center text-center space-y-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mb-2">
                                {getIcon(skill.icon)}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">
                                {skill.title}
                            </h3>
                            <p className="text-slate-500 font-medium">
                                {skill.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Course Structure List */}
                <motion.div
                    className="max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
                        Course Structure
                    </h2>

                    <div className="space-y-4">
                        {moduleList.map((module, index) => (
                            <motion.div
                                key={module.id}
                                className={`flex items-center gap-4 p-4 md:p-6 rounded-2xl transition-all duration-300 ${module.isLocked
                                        ? "bg-purple-100/75 shadow-md opacity-75 hover:opacity-100"
                                        : "bg-purple-200 shadow-sm hover:shadow-lg cursor-pointer group"
                                    }`}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.3 + (index * 0.05) }}
                                onClick={() => !module.isLocked && previewEmbedUrl && setPreviewOpen(true)}
                            >
                                {/* Icon Box */}
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-transform ${module.isLocked ? "bg-purple-200 text-white" : "bg-purple-600 text-white group-hover:scale-110"
                                    }`}>
                                    {module.isLocked ? (
                                        <Lock className="w-5 h-5" />
                                    ) : (
                                        <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    {module.previewLabel && (
                                        <span className="text-purple-600 text-xs font-bold uppercase tracking-wider mb-1 block">
                                            {module.previewLabel}
                                        </span>
                                    )}
                                    {module.prefix && (
                                        <div className="text-slate-500 text-sm font-medium mb-0.5">
                                            {module.prefix}
                                        </div>
                                    )}
                                    <h3 className="text-lg md:text-xl font-bold text-slate-900 truncate">
                                        {module.title}
                                    </h3>
                                    {'lessonCount' in module && (
                                        <p className="text-slate-500 text-sm mt-0.5">
                                            {(module as {lessonCount: number}).lessonCount} lesson{(module as {lessonCount: number}).lessonCount !== 1 ? 's' : ''}
                                        </p>
                                    )}
                                </div>

                                {/* Status Badge (Locked or Watch Preview) */}
                                {module.isLocked ? (
                                    <div className="bg-purple-200/50 px-3 py-1 rounded text-xs font-medium text-purple-700 hidden sm:block">
                                        Locked
                                    </div>
                                ) : previewEmbedUrl && (
                                    <div className="bg-purple-600 px-4 py-2 rounded-lg text-xs font-semibold text-white hidden sm:flex items-center gap-1 group-hover:bg-purple-700 transition-colors">
                                        <Play className="w-3 h-3" fill="currentColor" />
                                        Watch
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Preview Modal */}
                <AnimatePresence>
                    {previewOpen && previewEmbedUrl && (
                        <motion.div
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Backdrop */}
                            <motion.div
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                                onClick={() => setPreviewOpen(false)}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            />

                            {/* Modal Content */}
                            <motion.div
                                className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => setPreviewOpen(false)}
                                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
                                    aria-label="Close"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {/* Video Container */}
                                <div className="relative w-full aspect-video bg-black">
                                    <iframe
                                        src={previewEmbedUrl}
                                        loading="lazy"
                                        title={firstLesson?.title ?? "Module preview"}
                                        style={{ border: "none", position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}
                                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>

                                {/* Video Info */}
                                <div className="p-6 bg-white">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                                        {firstLesson?.title ?? "Module Preview"}
                                    </h3>
                                    <p className="text-slate-600 text-sm">
                                        Duration: {firstLesson?.duration ? `${Math.round(firstLesson.duration / 60)} minutes` : "N/A"}
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
