"use client";

import { TopCoursesData } from "@/lib/api";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Pencil } from "lucide-react";
import CourseCard from "@/components/CourseCard";

interface TopCourseProps {
    data: TopCoursesData | null;
}

// Fallback data
const fallbackData: TopCoursesData = {
    badge: "TOP POPULAR COURSE",
    title: "দুটি স্পেশালাইজড কোর্স যা আপনার English দক্ষতাকে নতুন উচ্চতায় নিয়ে যাবে",
    buttonText: "Load More Course",
    courses: []
};

export default function TopCourse({ data }: TopCourseProps) {
    const content = data && data.courses?.length > 0 ? data : fallbackData;

    // Split title to highlight "English"
    const titleParts = content.title.split("English");

    return (
        <section className="py-20 md:py-24 lg:py-32 bg-linear-to-b from-slate-50 to-white relative overflow-hidden">
            {/* Decorative elements on the right */}
            <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96">
                <svg viewBox="0 0 200 200" className="w-full h-full text-purple-200/50">
                    <path
                        d="M 100 0 Q 200 0 200 100 Q 200 200 100 200"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <path
                        d="M 120 0 Q 200 20 200 120"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                    />
                </svg>
            </div>

            {/* Decorative star/asterisk on right side */}
            <div className="absolute right-8 top-1/2 hidden lg:block">
                <svg viewBox="0 0 100 100" className="w-24 h-24 text-slate-200">
                    <path
                        d="M50 0 L50 100 M0 50 L100 50 M15 15 L85 85 M85 15 L15 85"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                    />
                </svg>
            </div>

            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="relative">
                        <span className="inline-flex items-center rounded-full bg-purple-100 px-5 py-2 text-base font-semibold text-purple-700 mb-4">
                            {content.badge}
                        </span>
                        
                        {/* Pencil decoration */}
                        <div className="absolute -right-16 top-0 hidden md:block">
                            <Pencil className="w-10 h-10 text-yellow-400 rotate-45" />
                        </div>
                        
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 max-w-3xl leading-tight">
                            {titleParts[0]}
                            <span className="text-purple-600">English</span>
                            {titleParts[1]}
                        </h2>
                    </div>
                    
                    {/* Load More Button */}
                    <Link 
                        href="/courses"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600 text-white font-medium text-base transition-all duration-300 hover:bg-purple-700 shrink-0"
                    >
                        {content.buttonText}
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>

                {/* Course Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch">
                    {content.courses.map((course, index) => (
                        <motion.div
                            key={index}
                            className="flex [&>*]:w-full [&>*]:max-w-none [&>*]:h-full"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <CourseCard course={course} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
