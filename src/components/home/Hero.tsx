"use client";

import { HomeHeroData } from "@/lib/api";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroProps {
    data: HomeHeroData;
}

export default function Hero({ data }: HeroProps) {
    if (!data) return null;

    return (
        <section className="relative bg-gradient-to-b min-h-[80vh] from-purple-50 to-white overflow-hidden py-16 md:py-24" style={{ backgroundImage: "url('/images/dhew.png')" }}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Tagline */}
                        <motion.p
                            className="text-purple-600 font-medium text-lg mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {data.tagline}
                        </motion.p>

                        {/* Title */}
                        <motion.h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            {data.title}
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            className="text-slate-600 text-lg md:text-xl leading-relaxed mb-8 max-w-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            {data.description}
                        </motion.p>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Link href="/courses">
                                <button className="inline-flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white pl-8 py-0 rounded-full font-medium text-lg transition-all shadow-lg">
                                    {data.ctaText}
                                    <ArrowRight className="w-14 h-14 bg-slate-700 rounded-full p-2 text-slate-100 right-0" />
                                </button>
                            </Link>
                        </motion.div>

                        {/* Decorative Book Image */}
                        <motion.div
                            className="hidden md:block absolute bottom-20 left-40"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Image src="/images/book.png" alt="Book" width={120} height={120} />
                        </motion.div>
                    </motion.div>

                    {/* Right: Image */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="/images/cing.jpg"
                                alt="Students"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Explore Our Wings Card */}
                        <motion.div
                            className="absolute -bottom-2 left-30 transform -translate-x-1/2 bg-white rounded-2xl shadow-xl px-8 py-5 flex items-center gap-4"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <div className="text-center">
                                <span className="text-slate-800 font-bold text-lg block">{data.exploreText}</span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        </motion.div>

                        {/* Decorative curve arrow (SVG) */}
                        <Image src="/images/aroww.png" alt="Arrow" width={500} height={100} className="absolute -left-130 bottom-1 text-slate-400 hidden lg:block" />

                    </motion.div>
                </div>
            </div>
        </section>
    );
}