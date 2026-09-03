"use client";

import { AboutData } from "@/lib/api";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box, Compass, GraduationCap, Award } from "lucide-react";

interface OurMissionProps {
    data: AboutData;
}

export default function OurMission({ data }: OurMissionProps) {
    if (!data) return null;

    return (
        <section className="py-16 md:py-24 lg:py-28 px-4 md:px-8 bg-white overflow-hidden">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                    {/* Left Column: Images Grid (5 cols on lg) */}
                    <motion.div
                        className="lg:col-span-5 relative sticky top-28"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                            {/* Main Image */}
                            <div className="relative h-80 sm:h-96 lg:h-[460px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                                <Image
                                    src="/images/vai.jpg"
                                    alt="Founder & Team"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/60 via-transparent to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                    <p className="text-xs font-bold uppercase tracking-widest text-purple-300 mb-1">
                                        IDEA Platform
                                    </p>
                                    <h3 className="text-xl font-bold">
                                        Institute of Development, Education and Achievement
                                    </h3>
                                </div>
                            </div>

                            {/* Experience Card + Secondary Image */}
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                                {/* Experience Badge */}
                                <motion.div
                                    className="bg-linear-to-br from-purple-50 via-slate-50 to-purple-100 p-5 rounded-2xl shadow-lg border border-purple-200 flex flex-col items-center justify-center text-center"
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    <span className="text-4xl sm:text-5xl font-extrabold text-purple-900 mb-1">
                                        {data.yearsExperience}+
                                    </span>
                                    <span className="text-xs sm:text-sm font-bold text-purple-700 uppercase tracking-wide">
                                        Years Experience
                                    </span>
                                </motion.div>

                                {/* Secondary Image */}
                                <div className="relative h-32 sm:h-36 lg:h-36 rounded-2xl overflow-hidden shadow-md">
                                    <Image
                                        src="/images/youth.jpg"
                                        alt="Activities"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Decorative Arrow */}
                        <div className="hidden sm:block absolute -top-8 -left-8 text-purple-400 pointer-events-none">
                            <Image src="/images/arrow.png" alt="" width={80} height={80} />
                        </div>
                    </motion.div>

                    {/* Right Column: Content (7 cols on lg) */}
                    <motion.div
                        className="lg:col-span-7 space-y-8"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Header Badge & Title */}
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 mb-4">
                                <Box className="w-4 h-4 text-purple-700" />
                                <span className="text-purple-800 font-bold uppercase tracking-wider text-xs">
                                    About Us
                                </span>
                            </div>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                                {data.title}
                            </h2>
                        </div>

                        {/* Main Description */}
                        <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed border-l-4 border-purple-500 pl-5 bg-purple-50/40 py-4 pr-4 rounded-r-2xl">
                            {data.description.split('\n\n').map((paragraph, idx) => (
                                <p key={idx} className="font-medium text-slate-800">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* Three Pillars: Development, Education, Achievement */}
                        <div className="space-y-6 pt-2">

                            {/* IDEA - Development */}
                            {data.development && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md hover:border-purple-300 transition-all"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                                            <Compass className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900">
                                            {data.development.title}
                                        </h3>
                                    </div>
                                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed pl-13">
                                        {data.development.text}
                                    </p>
                                </motion.div>
                            )}

                            {/* IDEA - Education */}
                            {data.education && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md hover:border-purple-300 transition-all"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                                            <GraduationCap className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900">
                                            {data.education.title}
                                        </h3>
                                    </div>
                                    <div className="text-slate-600 text-sm sm:text-base leading-relaxed pl-13 space-y-3">
                                        {data.education.text.split('\n\n').map((para, idx) => (
                                            <p key={idx}>{para}</p>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* IDEA - Achievement */}
                            {data.achievement && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md hover:border-purple-300 transition-all"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                            <Award className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900">
                                            {data.achievement.title}
                                        </h3>
                                    </div>
                                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed pl-13">
                                        {data.achievement.text}
                                    </p>
                                </motion.div>
                            )}

                        </div>

                        {/* CTA Button */}
                        <div className="pt-4">
                            <Link href="/courses">
                                <button className="bg-purple-700 hover:bg-purple-800 text-white font-bold px-8 py-3.5 rounded-full transition-all flex items-center gap-2 shadow-lg shadow-purple-200 cursor-pointer">
                                    {data.buttonText}
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
