"use client";

import { EnglishDebateData } from "@/lib/api";
import { motion } from "framer-motion";
import { Brain, Mic, Trophy, Play, Lock } from "lucide-react";

interface CourseStructureProps {
    data: EnglishDebateData;
}

const getIcon = (iconName: string) => {
    switch (iconName) {
        case "brain": return <Brain className="w-8 h-8 text-purple-600" />;
        case "speech": return <Mic className="w-8 h-8 text-purple-600" />;
        case "trophy": return <Trophy className="w-8 h-8 text-purple-600" />;
        default: return <Brain className="w-8 h-8 text-purple-600" />;
    }
};

export default function CourseStructure({ data }: CourseStructureProps) {
    if (!data.skillsHighlights || !data.courseModules) return null;

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
                        {data.courseModules.map((module, index) => (
                            <motion.div
                                key={module.id}
                                className={`flex items-center gap-4 p-4 md:p-6 rounded-2xl transition-all duration-300 ${module.isLocked
                                        ? "bg-purple-50/50 opacity-75 hover:opacity-100"
                                        : "bg-purple-100 shadow-sm hover:shadow-md cursor-pointer"
                                    }`}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.3 + (index * 0.05) }}
                            >
                                {/* Icon Box */}
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${module.isLocked ? "bg-purple-200 text-white" : "bg-purple-600 text-white"
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
                                </div>

                                {/* Status Badge (Locked) */}
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
