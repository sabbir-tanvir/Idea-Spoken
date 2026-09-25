"use client";

import { useState } from "react";
import { ApiCourseDetail } from "@/lib/api/courses";
import { motion } from "framer-motion";
import { Play, Users, Clock, BookOpen } from "lucide-react";
import PaymentModal from "@/components/ui/PaymentModal";
import { CourseVideoConfig, getCourseHeroVideo } from "@/lib/courseVideos";
import { getFullImageUrl } from "@/lib/getFullImageUrl";

interface CourseHeroProps {
    courseDetail?: ApiCourseDetail | null;
    videoConfig?: CourseVideoConfig | null;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" as const },
    },
};

export default function CourseHero({ courseDetail, videoConfig }: CourseHeroProps) {
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const title = courseDetail?.title ?? "Course Title";
    const description =
        courseDetail?.description ??
        "Join this comprehensive course and elevate your skills to the next level with expert-guided content.";
    const salePriceVal = courseDetail?.salePrice ?? (courseDetail as any)?.selePrice ?? (courseDetail as any)?.selesPrice ?? (courseDetail as any)?.salesPrice;
    const hasSale = salePriceVal != null && salePriceVal !== "";
    const displayPrice = hasSale ? `৳${salePriceVal}` : (courseDetail?.price ? `৳${courseDetail.price}` : "৳2,500");
    const originalPrice = courseDetail?.price ? `৳${courseDetail.price}` : null;
    const lessonCount = courseDetail
        ? courseDetail.modules.reduce((sum, m) => sum + m.lessons.length, 0)
        : 0;
    const durationHrs = courseDetail?.duration
        ? `${Math.round(courseDetail.duration / 3600)} Hours`
        : "Self-paced";

    const heroVideo = videoConfig ?? getCourseHeroVideo(courseDetail?.id, courseDetail?.title);
    const thumbnailUrl = courseDetail?.thumbnail ? getFullImageUrl(courseDetail.thumbnail) : null;

    return (
        <section className="bg-purple-50 min-h-150 flex items-center overflow-hidden w-full">
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
                            <span className="text-lg">📚</span> IDEA Course
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
                        {lessonCount > 0 && (
                            <>
                                <div className="flex items-center gap-2 text-slate-700">
                                    <BookOpen className="w-5 h-5 text-purple-600" />
                                    <span className="font-medium">
                                        {lessonCount} Lessons
                                    </span>
                                </div>
                                <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>
                            </>
                        )}
                        <div className="flex items-center gap-2 text-slate-700">
                            <Clock className="w-5 h-5 text-purple-600" />
                            <span className="font-medium">{durationHrs}</span>
                        </div>
                        {courseDetail?.level && (
                            <>
                                <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>
                                <div className="flex items-center gap-2 text-slate-700">
                                    <Users className="w-5 h-5 text-purple-600" />
                                    <span className="font-medium capitalize">
                                        {courseDetail.level.toLowerCase()}
                                    </span>
                                </div>
                            </>
                        )}
                    </motion.div>

                    {/* Price & CTA */}
                    <motion.div
                        className="flex flex-wrap items-center gap-4 pt-2"
                        variants={itemVariants}
                    >
                        <div className="px-6 py-3 bg-purple-100 text-purple-700 text-2xl font-bold rounded-xl flex items-center gap-3">
                            {hasSale && <span className="text-base font-medium text-purple-400/80 line-through">{originalPrice}</span>}
                            <span>{displayPrice}</span>
                        </div>
                        <button
                            onClick={() => setIsPaymentOpen(true)}
                            className="group flex items-center gap-2 px-8 py-4 bg-purple-200 text-purple-900 rounded-xl font-semibold hover:bg-purple-300 transition-colors duration-300 cursor-pointer"
                        >
                            Pay &amp; Unlock Course
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
                        amount={hasSale ? Number(salePriceVal) : (courseDetail?.price ? Number(courseDetail.price) : 0)}
                    />
                </motion.div>

                {/* Right Side: Video Player */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="relative"
                >
                    {heroVideo && isPlaying ? (
                        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black border-2 border-purple-200">
                            <iframe
                                src={`${heroVideo.embedUrl}?autoplay=true&preload=true&responsive=true`}
                                loading="lazy"
                                title={heroVideo.title || `${title} Preview`}
                                className="absolute inset-0 w-full h-full border-0"
                                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    ) : (
                        <div
                            onClick={() => {
                                if (heroVideo) setIsPlaying(true);
                            }}
                            className={`relative aspect-video rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center group ${
                                heroVideo ? "cursor-pointer hover:shadow-purple-300/60" : ""
                            } transition-all duration-300 bg-slate-900 border-2 border-purple-100`}
                        >
                            {/* Thumbnail Image */}
                            {thumbnailUrl ? (
                                <img
                                    src={thumbnailUrl}
                                    alt={title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-indigo-900 to-slate-900" />
                            )}

                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

                            {/* Play Button & Text */}
                            <div className="relative z-10 flex flex-col items-center gap-3">
                                <div className="w-20 h-20 bg-purple-600 group-hover:bg-purple-500 text-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 ring-4 ring-white/40">
                                    <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                                </div>
                                <span className="text-white font-semibold text-sm tracking-wide bg-black/50 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/20 shadow-sm">
                                    {heroVideo ? "Watch Free Intro Video" : "Preview Coming Soon"}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Floating Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="absolute -bottom-6 -right-6 lg:bottom-8 lg:-right-8 bg-purple-600 text-white px-6 py-3 rounded-xl shadow-lg font-medium text-sm flex items-center gap-2 z-20 pointer-events-none"
                    >
                        Free Preview Available
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}
