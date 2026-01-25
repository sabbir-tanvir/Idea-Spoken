"use client";

import { EnglishDebateData } from "@/lib/api";
import { motion } from "framer-motion";
import { Lightbulb, BookOpen, Volume2, Users, MessageSquare } from "lucide-react";

interface CoursePhilosophyProps {
    data: EnglishDebateData;
}

const getIcon = (iconName: string) => {
    switch (iconName) {
        case "lightbulb": return <Lightbulb className="w-6 h-6" />;
        case "book": return <BookOpen className="w-6 h-6" />;
        case "volume": return <Volume2 className="w-6 h-6" />;
        case "users": return <Users className="w-6 h-6" />;
        case "chat": return <MessageSquare className="w-6 h-6" />;
        default: return <Lightbulb className="w-6 h-6" />;
    }
};

const getColorClasses = (color: string) => {
    switch (color) {
        case "blue": return "bg-sky-50 text-sky-600";
        case "pink": return "bg-pink-50 text-pink-600";
        case "green": return "bg-green-50 text-green-600";
        case "yellow": return "bg-amber-50 text-amber-600";
        case "purple": return "bg-purple-50 text-purple-600";
        default: return "bg-gray-50 text-gray-600";
    }
};

export default function CoursePhilosophy({ data }: CoursePhilosophyProps) {
    if (!data.philosophy || !data.learningOutcomes) return null;

    return (
        <section className="bg-white w-full">
            <div className="container mx-auto px-4 py-20 lg:py-32">
                {/* Philosophy Section */}
                <motion.div
                    className="text-center max-w-4xl mx-auto mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                        {data.philosophy.title}
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        {data.philosophy.description}
                    </p>
                </motion.div>

                {/* What You'll Learn Section */}
                <div>
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        What You'll Learn
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.learningOutcomes.map((item, index) => (
                            <motion.div
                                key={item.id}
                                className={`p-6 rounded-2xl flex items-start gap-4 ${getColorClasses(item.color)}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className={`p-3 rounded-full bg-white/60 shrink-0`}>
                                    {getIcon(item.icon)}
                                </div>
                                <span className="font-medium text-lg leading-snug">
                                    {item.text}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
