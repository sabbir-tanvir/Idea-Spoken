"use client";

import { motion } from "framer-motion";

export default function HeroAbout() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 py-32 md:py-40">
            {/* Decorative Elements */}

            {/* Left Orange Circles */}
            <motion.div
                className="absolute top-1/2 left-[10%] -translate-y-1/2"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="15" stroke="#FF5722" strokeWidth="4" />
                    <circle cx="60" cy="25" r="12" stroke="#FF5722" strokeWidth="4" />
                    <circle cx="30" cy="60" r="12" stroke="#FF5722" strokeWidth="4" />
                    <circle cx="70" cy="65" r="15" stroke="#FF5722" strokeWidth="4" />
                </svg>
            </motion.div>

            {/* Center-Left Purple Wave */}
            <motion.div
                className="absolute top-[60%] left-[30%]"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            >
                <svg width="80" height="20" viewBox="0 0 100 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 10 Q 12.5 0, 25 10 T 50 10 T 75 10 T 100 10" stroke="#A78BFA" strokeWidth="3" fill="none" />
                    <path d="M0 20 Q 12.5 10, 25 20 T 50 20 T 75 20 T 100 20" stroke="#A78BFA" strokeWidth="3" fill="none" />
                </svg>
            </motion.div>

            {/* Top-Right Purple Star/Flower */}
            <motion.div
                className="absolute top-[20%] right-[15%]"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, rotate: 360 }}
                transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
            >
                <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 0 L60 35 L95 25 L75 55 L95 85 L60 75 L50 100 L40 75 L5 85 L25 55 L5 25 L40 35 Z" fill="#8B5CF6" />
                </svg>
            </motion.div>

            {/* Bottom-Right Orange Arc */}
            <motion.div
                className="absolute bottom-[20%] right-[25%]"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            >
                <svg width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 40 A 20 20 0 1 1 40 40" stroke="#FF5722" strokeWidth="6" strokeLinecap="round" />
                </svg>
            </motion.div>


            {/* Content */}
            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.h1
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 tracking-tight"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    ABOUT US
                </motion.h1>

                <motion.div
                    className="flex justify-center items-center gap-2 text-slate-500 font-medium text-lg"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <span>Home</span>
                    <span className="text-orange-500">//</span>
                    <span>About Us</span>
                </motion.div>
            </div>
        </section>
    );
}
