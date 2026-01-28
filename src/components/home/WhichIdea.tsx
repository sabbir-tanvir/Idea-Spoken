"use client";

import { WhyIdeaData } from "@/lib/api";
import { motion } from "framer-motion";
import { Users, Sprout, Code, Home } from "lucide-react";
import React from "react";

interface WhichIdeaProps {
    data: WhyIdeaData | null;
}

// Fallback data
const fallbackData: WhyIdeaData = {
    badge: "কেন IDEA?",
    title: "Why Learn With IDEA?",
    description: "আমাদের শিক্ষা পদ্ধতি অন্যদের থেকে আলাদা কারণ আমরা বিশ্বাস করি শেখা হওয়া উচিত আনন্দময়",
    cards: [
        {
            id: 1,
            title: "গেম মেথডে শেখা",
            description: "গেম মেথডে Spoken English শেখার ইউনিক পদ্ধতি যা শেখাকে করে সহজ ও মজাদার",
            icon: "gamepad",
            bgColor: "blue"
        },
        {
            id: 2,
            title: "বাস্তব অভিজ্ঞতা",
            description: "বাস্তব জীবনের অভিজ্ঞতায় ভিত্তিক কোর্স ডিজাইন যা সরাসরি কাজে লাগে",
            icon: "seedling",
            bgColor: "purple"
        },
        {
            id: 3,
            title: "Debate স্কিল",
            description: "Debate-এর মাধ্যমে ভাবনা, যুক্তি ও প্রেজেন্টেশন স্কিল ডেভেলপমেন্ট",
            icon: "code",
            bgColor: "green"
        },
        {
            id: 4,
            title: "সমন্বিত প্ল্যাটফর্ম",
            description: "যুব উন্নয়ন, সোস্যাল ওয়েলফেয়ার, পিঠা উদ্যোক্তা, মাইন্ড প্রোগ্রামিং – সব এক প্ল্যাটফর্মে",
            icon: "home",
            bgColor: "pink"
        }
    ]
};

// Icon mapping
const getIcon = (iconName: string) => {
    const iconClasses = "w-8 h-8";
    switch (iconName) {
        case "gamepad":
            return <Users className={iconClasses} />;
        case "seedling":
            return <Sprout className={iconClasses} />;
        case "code":
            return <Code className={iconClasses} />;
        case "home":
            return <Home className={iconClasses} />;
        default:
            return <Users className={iconClasses} />;
    }
};

// Background color mapping
const getBgStyles = (bgColor: string) => {
    switch (bgColor) {
        case "blue":
            return {
                card: "bg-gradient-to-br from-blue-100 to-purple-100",
                icon: "bg-blue-100 text-blue-600 border-blue-200"
            };
        case "purple":
            return {
                card: "bg-gradient-to-br from-purple-100 to-pink-100",
                icon: "bg-purple-100 text-purple-600 border-purple-200"
            };
        case "green":
            return {
                card: "bg-gradient-to-br from-green-100 to-emerald-100",
                icon: "bg-green-100 text-green-600 border-green-200"
            };
        case "pink":
            return {
                card: "bg-gradient-to-br from-purple-100 to-pink-100",
                icon: "bg-pink-100 text-pink-600 border-pink-200"
            };
        default:
            return {
                card: "bg-gradient-to-br from-slate-50 to-gray-50",
                icon: "bg-slate-100 text-slate-600 border-slate-200"
            };
    }
};

export default function WhichIdea({ data }: WhichIdeaProps) {
    // Use fallback if data is null or empty
    const content = data && data.cards?.length > 0 ? data : fallbackData;

    return (
        <section className="py-20 md:py-24 lg:py-32 bg-slate-50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    className="text-center mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-flex items-center rounded-full bg-purple-100 px-6 py-2.5 text-base font-semibold text-purple-700 mb-6">
                        {content.badge}
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-5">
                        {content.title}
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
                        {content.description}
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {content.cards.slice(0, 3).map((card, index) => {
                        const styles = getBgStyles(card.bgColor);
                        return (
                            <motion.div
                                key={card.id}
                                className={`${styles.card} rounded-3xl p-6 md:p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`flex-shrink-0 w-14 h-14 rounded-2xl border-2 ${styles.icon} flex items-center justify-center`}>
                                        {getIcon(card.icon)}
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                                            {card.title}
                                        </h3>
                                        <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                                            {card.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom Card - Full Width on larger screens, centered */}
                {content.cards.length > 3 && (
                    <motion.div
                        className="mt-6 flex justify-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <div className={`${getBgStyles(content.cards[3].bgColor).card} rounded-3xl p-6 md:p-8 w-full md:w-2/3 lg:w-1/2 shadow-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2`}>
                            <div className="flex items-start gap-4">
                                <div className={`flex-shrink-0 w-14 h-14 rounded-2xl border-2 ${getBgStyles(content.cards[3].bgColor).icon} flex items-center justify-center`}>
                                    {getIcon(content.cards[3].icon)}
                                </div>
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                                        {content.cards[3].title}
                                    </h3>
                                    <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                                        {content.cards[3].description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
