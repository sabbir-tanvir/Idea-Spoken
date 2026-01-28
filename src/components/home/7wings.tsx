"use client";

import { SevenWingsData } from "@/lib/api";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import IdeaCard from "@/components/ui/cards/IdeaCard";
import { useState } from "react";

interface SevenWingsProps {
    data: SevenWingsData | null;
}

// Fallback data
const fallbackData: SevenWingsData = {
    badge: "আমাদের ৭টি WING",
    title: "Our 7 Wings Of IDEA",
    description: "শিক্ষা, সেবা ও উন্নয়নের বিভিন্ন দিক নিয়ে কাজ করছে IDEA-র ৭টি অঙ্গসংগঠন",
    buttonText: "All Blog Post",
    wings: [
        {
            id: 1,
            title: "IDEA Youth Development Center",
            description: "যুব সমাজকে দক্ষ, সচেতন ও আত্মবিশ্বাসী করে গড়ে তোলা",
            image: "/images/wings/youth-development.jpg",
            slug: "youth-development"
        },
        {
            id: 2,
            title: "IDEA Social Welfare Organization",
            description: "সমাজের অসহায় মানুষের পাশে দাঁড়ানো ও স্বেচ্ছাসেবী কাজ",
            image: "/images/wings/social-welfare.jpg",
            slug: "social-welfare"
        },
        {
            id: 3,
            title: "IDEA SPOKEN – The Game Method",
            description: "গেম-ভিত্তিক English শেখার অভিনব পদ্ধতি",
            image: "/images/wings/spoken-english.jpg",
            slug: "/english-debate"
        },
        {
            id: 4,
            title: "IDEA Pitha Pathshala",
            description: "পিঠা তৈরির আদ্যোগ শত তৈরি করা সুযোগের জন্য",
            image: "/images/wings/pitha-pathshala.jpg",
            slug: "pitha-pathshala"
        },
        {
            id: 5,
            title: "WIDEN",
            description: "Bangladeshi Students & Entrepreneurs এর অনলাইন প্ল্যাটফর্ম",
            image: "/images/wings/widen.jpg",
            slug: "/widen"
        },
        {
            id: 6,
            title: "Bangla Pitha Research Institute",
            description: "বাংলার ঐতিহ্য পিঠা সংস্কৃতির গবেষণা ও সংরক্ষণ",
            image: "/images/wings/pitha-research.jpg",
            slug: "/pitha"
        },
        {
            id: 7,
            title: "Rise and Thrive with Hamidul Huq",
            description: "আত্ম-উন্নয়ন ও Mind Programming এর intensive প্রোগ্রাম",
            image: "/images/wings/rise-thrive.jpg",
            slug: "/rise-and-thrive"
        }
    ]
};

export default function SevenWings({ data }: SevenWingsProps) {
    // Use fallback if data is null or empty
    const content = data && data.wings?.length > 0 ? data : fallbackData;
    const [avatarError, setAvatarError] = useState(false);

    return (
        <section className="py-20 md:py-24 lg:py-32 bg-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div>
                        <span className="inline-flex items-center rounded-full bg-purple-100 px-5 py-2 text-base font-semibold text-purple-700 mb-4">
                            {content.badge}
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                            {content.title}
                        </h2>
                        <p className="text-lg md:text-xl text-slate-600 max-w-2xl">
                            {content.description}
                        </p>
                    </div>
                    
                    {/* All Blog Post Button */}
                    <Link 
                        href="/blog"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600 text-white font-medium text-base transition-all duration-300 hover:bg-purple-700 shrink-0"
                    >
                        {content.buttonText}
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>

                {/* Cards Grid - First 6 cards in 3 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {content.wings.slice(0, 6).map((wing, index) => (
                        <motion.div
                            key={wing.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <IdeaCard wing={wing} />
                        </motion.div>
                    ))}
                </div>

                {/* 7th Card - Centered below */}
                {content.wings.length > 6 && (
                    <motion.div
                        className="flex justify-start"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <div className="w-full md:w-1/2 lg:w-1/3">
                            <IdeaCard wing={content.wings[6]} />
                        </div>
                    </motion.div>
                )}

                {/* Founder Quote Card */}
                <motion.div
                    className="mt-20 md:mt-30 px-30"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="relative bg-linear-to-br from-purple-50 via-slate-50 to-purple-50/50 border border-gray-700 shadow-2xl shadow-purple-300 rounded-3xl p-8 md:p-12 overflow-hidden">
                        {/* Decorative shape on right */}
                        <div className="absolute right-0 bottom-0 w-48 h-48 md:w-64 md:h-64">
                            <div className="absolute right-0 bottom-0 w-full h-full bg-purple-200/40 rounded-tl-full" />
                        </div>

                        {/* Quote */}
                        <blockquote className="relative z-10 text-xl md:text-2xl lg:text-3xl font-medium text-slate-800 leading-relaxed mb-8 max-w-4xl">
                            &ldquo;আইডিয়ার যাত্রা শুরু হয়েছিল একঝাঁক শিক্ষার্থীর স্বপ্ন আর একটি বৃক্ষরোপণ অভিযান দিয়ে  আজ এটি শিক্ষা, উন্নয়ন, উদ্যোক্তা সৃষ্টি ও চরিত্র গঠনের এক সমন্বিত প্ল্যাটফর্ম &rdquo;
                        </blockquote>

                        {/* Author */}
                        <div className="relative z-10 flex items-center gap-4">
                            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-purple-200">
                                {!avatarError ? (
                                    <Image
                                        src="/images/founder.jpg"
                                        alt="Md. Hamidul Huq"
                                        fill
                                        className="object-cover"
                                        onError={() => setAvatarError(true)}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl">
                                        MH
                                    </div>
                                )}
                            </div>
                            <div>
                                <p className="text-lg md:text-xl font-bold text-slate-900">Md. Hamidul Huq</p>
                                <p className="text-base text-slate-500">Founder, IDEA</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
