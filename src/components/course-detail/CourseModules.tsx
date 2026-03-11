"use client";

import { ApiCourseDetail } from "@/lib/api/courses";
import { motion } from "framer-motion";
import { Play, Lock } from "lucide-react";

interface CourseModulesProps {
    courseDetail?: ApiCourseDetail | null;
}

interface ModuleItem {
    id: number;
    title: string;
    prefix?: string;
    previewLabel?: string;
    isLocked: boolean;
    lessonCount?: number;
}

const FALLBACK_MODULES: ModuleItem[] = [
    { id: 1, title: "Introduction & Foundations", prefix: "Module 1", isLocked: false, previewLabel: "Preview", lessonCount: 0 },
    { id: 2, title: "Core Concepts", prefix: "Module 2", isLocked: true, lessonCount: 0 },
    { id: 3, title: "Practical Application", prefix: "Module 3", isLocked: true, lessonCount: 0 },
    { id: 4, title: "Advanced Topics", prefix: "Module 4", isLocked: true, lessonCount: 0 },
    { id: 5, title: "Final Assessment & Certification", prefix: "Module 5", isLocked: true, lessonCount: 0 },
];

/**
 * Mirrors idea-spoken/CourseStructure.tsx — same module list layout.
 * Prefers API modules; falls back to FALLBACK_MODULES.
 */
export default function CourseModules({ courseDetail }: CourseModulesProps) {
    const apiModules = courseDetail?.modules
        ? [...courseDetail.modules].sort((a, b) => a.sortOrder - b.sortOrder)
        : [];

    const moduleList: ModuleItem[] =
        apiModules.length > 0
            ? apiModules.map((m, i) => ({
                  id: m.id,
                  title: m.title,
                  prefix: `Module ${m.sortOrder}`,
                  previewLabel: i === 0 ? "Preview" : undefined,
                  isLocked: i !== 0,
                  lessonCount: m.lessons.length,
              }))
            : FALLBACK_MODULES;

    return (
        <section className="bg-white w-full">
            <div className="container mx-auto px-4 py-20">
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
                                className={`flex items-center gap-4 p-4 md:p-6 rounded-2xl transition-all duration-300 ${
                                    module.isLocked
                                        ? "bg-purple-100/75 shadow-md opacity-75 hover:opacity-100"
                                        : "bg-purple-200 shadow-sm hover:shadow-md cursor-pointer"
                                }`}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                            >
                                {/* Icon */}
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                                        module.isLocked
                                            ? "bg-purple-200 text-white"
                                            : "bg-purple-600 text-white"
                                    }`}
                                >
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
                                    {module.lessonCount !== undefined && module.lessonCount > 0 && (
                                        <p className="text-slate-500 text-sm mt-0.5">
                                            {module.lessonCount} lesson{module.lessonCount !== 1 ? "s" : ""}
                                        </p>
                                    )}
                                </div>

                                {/* Locked Badge */}
                                {module.isLocked && (
                                    <div className="bg-purple-200/50 px-3 py-1 rounded text-xs font-medium text-purple-700 hidden sm:block">
                                        Locked
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
