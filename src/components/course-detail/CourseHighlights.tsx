"use client";

import { ApiCourseDetail } from "@/lib/api/courses";
import { BookOpen, Users, Lightbulb } from "lucide-react";

interface CourseHighlightsProps {
    courseDetail?: ApiCourseDetail | null;
}

interface HighlightCard {
    title: string;
    icon: typeof BookOpen;
    items: string[];
}

const FALLBACK_CARDS: HighlightCard[] = [
    {
        title: "Core Curriculum",
        icon: BookOpen,
        items: [
            "Foundational concepts and theory",
            "Structured learning path",
            "Progressive skill building",
            "Comprehensive topic coverage",
            "Practical knowledge application",
        ],
    },
    {
        title: "Interactive Activities",
        icon: Users,
        items: [
            "Group discussions and workshops",
            "Peer learning and collaboration",
            "Live Q&A sessions",
            "Practice assignments",
            "Real-world case studies",
        ],
    },
    {
        title: "Skills & Outcomes",
        icon: Lightbulb,
            items: [
            "Critical thinking development",
            "Confidence building exercises",
            "Project-based assessments",
            "Certificate upon completion",
        ],
    },
];

/**
 * Mirrors TypesofGame.tsx — same card grid layout but driven by API modules.
 * Groups the first 3 modules (with their lessons) into highlight cards.
 * Falls back to FALLBACK_CARDS when no API data is available.
 */
export default function CourseHighlights({ courseDetail }: CourseHighlightsProps) {
    const sorted = courseDetail?.modules?.length
        ? [...courseDetail.modules].sort((a, b) => a.sortOrder - b.sortOrder)
        : [];

    const cards: HighlightCard[] =
        sorted.length > 0
            ? sorted.slice(0, 3).map((mod, i) => ({
                  title: mod.title,
                  icon: [BookOpen, Users, Lightbulb][i % 3],
                  items:
                      mod.lessons.length > 0
                          ? mod.lessons
                                .sort((a, b) => a.sortOrder - b.sortOrder)
                                .map((l) => l.title)
                          : ["Content coming soon"],
              }))
            : FALLBACK_CARDS;

    return (
        <section className="py-20 md:py-24 lg:py-32 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
                    Course Highlights
                </h2>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {cards.map((card, index) => {
                        const IconComponent = card.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                            >
                                {/* Icon */}
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-5">
                                    <IconComponent className="w-6 h-6 text-purple-600" />
                                </div>

                                {/* Card Title */}
                                <h3 className="text-lg font-bold text-slate-900 mb-4">
                                    {card.title}
                                </h3>

                                {/* Items List */}
                                <ul className="space-y-3">
                                    {card.items.map((item, itemIndex) => (
                                        <li
                                            key={itemIndex}
                                            className="flex items-start gap-2"
                                        >
                                            <svg
                                                className="w-4 h-4 text-purple-500 mt-1 shrink-0"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    d="M7 17L17 7"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M7 7h10v10"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <span className="text-base text-gray-600">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
