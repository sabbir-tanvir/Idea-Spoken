"use client";

import { AboutData } from "@/lib/api";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box } from "lucide-react";

interface OurMissionProps {
    data: AboutData;
}

export default function OurMission({ data }: OurMissionProps) {
    if (!data) return null;

    return (
        <section className="py-20 md:py-32 px-4 md:px-8 bg-white overflow-hidden">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left: Images Grid - Stacked Layout */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex gap-6">
                            {/* Tall Image - Left */}
                            <div className="w-1/2 relative h-[450px] md:h-[550px] rounded-2xl overflow-hidden shadow-xl">
                                <Image
                                    src={data.images[0] || "/placeholder.jpg"}
                                    alt="Students"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Right Column - Experience Badge + Short Image */}
                            <div className="w-1/2 flex flex-col gap-6">
                                {/* Experience Badge - Square Card */}
                                <motion.div
                                    className="bg-white p-4 rounded-2xl shadow-xl border-2 border-dashed border-red-300"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    <div className="flex flex-col items-center justify-center py-6 px-4">
                                        {/* Progress Circle */}
                                        <div className="relative w-24 h-24 md:w-28 md:h-28 mb-4">
                                            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                                {/* Background circle */}
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="42"
                                                    fill="none"
                                                    stroke="#f3f4f6"
                                                    strokeWidth="8"
                                                />
                                                {/* Progress arc */}
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="42"
                                                    fill="none"
                                                    stroke="#ef4444"
                                                    strokeWidth="8"
                                                    strokeLinecap="round"
                                                    strokeDasharray="264"
                                                    strokeDashoffset="66"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-3xl md:text-4xl font-bold text-slate-900">
                                                    {data.yearsExperience}+
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-lg md:text-xl font-semibold text-slate-700 text-center">
                                            Years Experience
                                        </span>
                                    </div>
                                </motion.div>

                                {/* Short Image - Bottom */}
                                <div className="relative flex-1 min-h-[200px] md:min-h-[280px] rounded-2xl overflow-hidden shadow-xl">
                                    <Image
                                        src={data.images[1] || "/placeholder.jpg"}
                                        alt="Discussion"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Decorative Shape (Top-Left) */}
                        <div className="absolute -top-10 -left-10 text-emerald-400">
                            <Image src="/images/arrow.png" alt="" width={100} height={100} />
                        </div>
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Box className="w-5 h-5 text-red-500" />
                            <span className="text-red-500 font-bold uppercase tracking-wider text-base">About Us</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                            {data.title.split(' ').map((word, i) => (
                                <span key={i} className={word === "Professional" ? "text-red-500" : ""}>
                                    {word}{' '}
                                </span>
                            ))}
                        </h2>

                        <p className="text-base font-semibold text-slate-500 mb-6 uppercase tracking-wide">
                            {data.subtitle}
                        </p>

                        <p className="text-slate-600 leading-relaxed mb-10 text-lg">
                            {data.description}
                        </p>

                        {/* Mission & Vision Grid */}
                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                            <div>
                                <h3 className="text-slate-900 font-bold uppercase mb-3 flex items-center gap-2">
                                    {data.mission.title}
                                </h3>
                                <p className="text-slate-600 text-base leading-relaxed">
                                    {data.mission.text}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-slate-900 font-bold uppercase mb-3 flex items-center gap-2">
                                    {data.vision.title}
                                </h3>
                                <p className="text-slate-600 text-base leading-relaxed">
                                    {data.vision.text}
                                </p>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <Link href="#">
                            <button className="bg-emerald-400 hover:bg-emerald-500 text-white font-medium px-8 py-3.5 rounded-full transition-all flex items-center gap-2 shadow-lg shadow-emerald-100">
                                {data.buttonText}
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
