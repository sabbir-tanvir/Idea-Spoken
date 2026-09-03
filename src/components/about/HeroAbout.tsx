"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroAbout() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 pt-16 pb-8 sm:pt-24 sm:pb-12">
            {/* Decorative Elements */}

            {/* Left Orange Circles */}
            <motion.div
                className="absolute top-1/2 left-[6%] -translate-y-1/2 opacity-70 pointer-events-none hidden sm:block"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 0.7 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <svg width="45" height="45" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="15" stroke="#FF5722" strokeWidth="4" />
                    <circle cx="60" cy="25" r="12" stroke="#FF5722" strokeWidth="4" />
                    <circle cx="30" cy="60" r="12" stroke="#FF5722" strokeWidth="4" />
                    <circle cx="70" cy="65" r="15" stroke="#FF5722" strokeWidth="4" />
                </svg>
            </motion.div>

            {/* Center-Left Purple Wave */}
            <motion.div
                className="absolute top-[65%] left-[22%] opacity-60 pointer-events-none hidden md:block"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 0.6 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            >
                <svg width="60" height="15" viewBox="0 0 100 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 10 Q 12.5 0, 25 10 T 50 10 T 75 10 T 100 10" stroke="#A78BFA" strokeWidth="3" fill="none" />
                    <path d="M0 20 Q 12.5 10, 25 20 T 50 20 T 75 20 T 100 20" stroke="#A78BFA" strokeWidth="3" fill="none" />
                </svg>
            </motion.div>

            {/* Top-Right Purple Star/Flower */}
            <motion.div
                className="absolute top-[25%] right-[10%] opacity-80 pointer-events-none hidden sm:block"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.8, rotate: 360 }}
                transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
            >
                <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 0 L60 35 L95 25 L75 55 L95 85 L60 75 L50 100 L40 75 L5 85 L25 55 L5 25 L40 35 Z" fill="#8B5CF6" />
                </svg>
            </motion.div>

            {/* Bottom-Right Orange Arc */}
            <motion.div
                className="absolute bottom-[20%] right-[22%] opacity-70 pointer-events-none hidden md:block"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.7 }}
                transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            >
                <svg width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 40 A 20 20 0 1 1 40 40" stroke="#FF5722" strokeWidth="6" strokeLinecap="round" />
                </svg>
            </motion.div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.h1
                    className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-2 tracking-tight"
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    ABOUT US
                </motion.h1>

                <motion.div
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/50 backdrop-blur-md border border-white/60 text-slate-600 font-semibold text-xs sm:text-sm shadow-xs"
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                >
                    <Link href="/" className="hover:text-purple-700 transition-colors">
                        Home
                    </Link>
                    <span className="text-purple-500 font-bold">//</span>
                    <span className="text-purple-900 font-bold">About Us</span>
                </motion.div>
            </div>
        </section>
    );
}
