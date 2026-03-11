"use client";

import { ApiCourseDetail } from "@/lib/api/courses";
import { motion } from "framer-motion";

interface CoursePhilosophyProps {
    courseDetail?: ApiCourseDetail | null;
}

const FALLBACK_TITLE = "Our Teaching Philosophy";
const FALLBACK_DESCRIPTION =
    "এই মেথডটি তৈরি করেছেন জনাব মোঃ হামিদুল হক (Md. Hamidul Huq) তিনি Chomsky-র ধারণা থেকে অনুপ্রাণিত—মানুষের মস্তিষ্ক স্বাভাবিকভাবেই ভাষা অধিগ্রহণ করতে পারে তাঁর ডিজাইন করা গেমগুলো এমনভাবে সাজানো, যাতে শেখার প্রক্রিয়াটি বেশি acquisition আর কম boring learning হয়";

export default function CoursePhilosophy({ courseDetail }: CoursePhilosophyProps) {
    // Use the course description as the philosophy body when available,
    // or fall back to a generic philosophy statement.
    const heading =
        courseDetail?.title
            ? `Why ${courseDetail.title}?`
            : FALLBACK_TITLE;

    const body =  FALLBACK_DESCRIPTION;

    return (
        <section className="bg-blue-50 w-full">
            <div className="container mx-auto px-4 pt-20 lg:pt-32">
                <motion.div
                    className="text-center max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                        {heading}
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">{body}</p>
                </motion.div>
            </div>
        </section>
    );
}
