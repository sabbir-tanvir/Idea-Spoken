"use client";

import { useState } from "react";
import { EnglishDebateData } from "@/lib/api";
import { ApiCourseDetail } from "@/lib/api/courses";
import { motion } from "framer-motion";
import { Play, Users, Clock, BookOpen } from "lucide-react";
import PaymentModal from "@/components/ui/PaymentModal";

interface DebateHeroProps {
    data: EnglishDebateData;
    courseDetail?: ApiCourseDetail | null;
}

export default function DebateHero({ data, courseDetail }: DebateHeroProps) {
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const title = courseDetail?.title ?? data.title;
    const description = courseDetail?.description ?? data.description;
    const price = courseDetail?.price ? `৳${courseDetail.price}` : data.price;
    const lessonCount = courseDetail
        ? courseDetail.modules.reduce((sum, m) => sum + m.lessons.length, 0)
        : data.lessons;
    const durationHrs = courseDetail?.duration
        ? `${Math.round(courseDetail.duration / 3600)} Hours`
        : data.duration;
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut" as const,
            },
        },
    };

    return (
        <section className="bg-purple-50 min-h-[600px] flex items-center overflow-hidden w-full">
            <div className="container mx-auto px-4 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Side: Content */}
                <motion.div
                    className="space-y-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Badge */}
                    <motion.div variants={itemVariants}>
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                            <span className="text-lg">💭</span> {data.badge}
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight"
                        variants={itemVariants}
                    >
                        {title}
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-xl"
                        variants={itemVariants}
                    >
                        {description}
                    </motion.p>

                    {/* Course Meta Info */}
                    <motion.div
                        className="flex flex-wrap items-center gap-6 bg-white p-4 rounded-xl shadow-sm w-fit"
                        variants={itemVariants}
                    >
                        <div className="flex items-center gap-2 text-slate-700">
                            <BookOpen className="w-5 h-5 text-purple-600" />
                            <span className="font-medium">Lesson {lessonCount}</span>
                        </div>
                        <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>
                        <div className="flex items-center gap-2 text-slate-700">
                            <Clock className="w-5 h-5 text-purple-600" />
                            <span className="font-medium">{durationHrs}</span>
                        </div>
                        <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>
                        <div className="flex items-center gap-2 text-slate-700">
                            <Users className="w-5 h-5 text-purple-600" />
                            <span className="font-medium">Students {data.students}</span>
                        </div>
                    </motion.div>

                    {/* Price & CTA */}
                    <motion.div
                        className="flex flex-wrap items-center gap-4 pt-2"
                        variants={itemVariants}
                    >
                        <div className="px-6 py-3 bg-purple-100 text-purple-700 text-2xl font-bold rounded-xl">
                            {price}
                        </div>
                        <button
                            onClick={() => setIsPaymentOpen(true)}
                            className="group flex items-center gap-2 px-8 py-4 bg-purple-200 text-purple-900 rounded-xl font-semibold hover:bg-purple-300 transition-colors duration-300 cursor-pointer"
                        >
                            Pay & Unlock Course
                            <span className="group-hover:translate-x-1 transition-transform">
                                →
                            </span>
                        </button>
                    </motion.div>

                    <PaymentModal
                        isOpen={isPaymentOpen}
                        onClose={() => setIsPaymentOpen(false)}
                        courseName={title}
                        courseId={courseDetail?.id ?? 0}
                        amount={courseDetail?.price ? Number(courseDetail.price) : 2500}
                    />
                </motion.div>

                {/* Right Side: Video Placeholder */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="relative"
                >
                    <div className="relative aspect-video bg-purple-200 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center group cursor-pointer hover:shadow-purple-200/50 transition-shadow duration-300">
                        {/* Play Button */}
                        <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 z-10">
                            <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                        </div>

                        {/* Placeholder Text */}
                        <div className="absolute bottom-1/3 text-purple-900 font-medium mt-4">
                            Watch Free Intro Video
                        </div>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-300/50 to-transparent mix-blend-multiply"></div>
                    </div>

                    {/* Floating Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="absolute -bottom-6 -right-6 lg:bottom-8 lg:-right-8 bg-purple-600 text-white px-6 py-3 rounded-xl shadow-lg font-medium text-sm flex items-center gap-2 z-20"
                    >
                        Free Preview Available
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
