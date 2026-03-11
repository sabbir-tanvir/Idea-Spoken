"use client";

import { ApiCourseDetail } from "@/lib/api/courses";
import { motion } from "framer-motion";
import { BookOpen, Lightbulb, Trophy, Users, MessageSquare, Volume2 } from "lucide-react";

interface CourseWhatYoullLearnProps {
    courseDetail?: ApiCourseDetail | null;
}

const ICONS = [BookOpen, Lightbulb, Trophy, Users, MessageSquare, Volume2];

const COLOR_CLASSES = [
    "bg-purple-50 text-purple-600",
    "bg-sky-50 text-sky-600",
    "bg-green-50 text-green-600",
    "bg-amber-50 text-amber-600",
    "bg-pink-50 text-pink-600",
    "bg-orange-50 text-orange-600",
];

const FALLBACK_OUTCOMES = [
    "Comprehensive curriculum designed for all skill levels",
    "Practical exercises and real-world applications",
    "Expert instruction with mentor support",
    "Interactive sessions and collaborative learning",
    "Certificate upon successful completion",
    "Lifetime access to course materials",
];

export default function CourseWhatYoullLearn({ courseDetail }: CourseWhatYoullLearnProps) {
    const items = courseDetail?.modules?.length
        ? courseDetail.modules
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map((m) => m.title)
        : FALLBACK_OUTCOMES;

    return (
        <section className="bg-blue-50 w-full">
            <div className="container mx-auto px-4 py-20 lg:py-32">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    What You&apos;ll Learn
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((text, index) => {
                        const Icon = ICONS[index % ICONS.length];
                        const colorClass = COLOR_CLASSES[index % COLOR_CLASSES.length];
                        return (
                            <motion.div
                                key={index}
                                className={`p-6 rounded-2xl flex items-start shadow-xl gap-4 ${colorClass}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="p-3 rounded-full bg-white/60 shrink-0">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <span className="font-medium text-lg leading-snug">{text}</span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
