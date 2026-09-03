"use client";

import { useState } from "react";
import { ActivitiesData } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    Users,
    Handshake,
    Map,
    Calendar,
    Tv,
    Newspaper,
    ExternalLink,
    PlayCircle,
    X,
    Maximize2,
    Layers,
    ArrowUpRight
} from "lucide-react";

interface AmaderKarjokromProps {
    data?: ActivitiesData;
}

// 7 Wings Data
const WINGS_LIST = [
    {
        id: 1,
        name: "IDEA SPOKEN-The Game Method",
        slug: "/english-debate",
        color: "from-purple-600 to-violet-700"
    },
    {
        id: 2,
        name: "Rise and Thrive with Hamidul Huq",
        slug: "/rise-and-thrive",
        color: "from-fuchsia-600 to-purple-800"
    },
    {
        id: 3,
        name: "IDEA PITHA PARK",
        slug: "/pitha",
        color: "from-amber-500 to-orange-600"
    },
    {
        id: 4,
        name: "IDEA Social Welfare Organization",
        slug: "/social-welfare",
        color: "from-emerald-600 to-teal-700"
    },
    {
        id: 5,
        name: "IDEA Youth Development Centre",
        slug: "/youth-development",
        color: "from-blue-600 to-indigo-700"
    },
    {
        id: 6,
        name: "We Inspire New IDEAs for Students ( WINI )",
        slug: "/widen",
        color: "from-pink-500 to-rose-600"
    },
    {
        id: 7,
        name: "Bangladesh Pitha Research Institute",
        slug: "/bangla-pitha-research-institute",
        color: "from-cyan-600 to-blue-700"
    }
];

// 10 TV Media Slots
const TV_MEDIA_REPORTS = [
    {
        id: 1,
        channel: "চ্যানেল আই",
        topic: "জীবন যেখানে যেমন - আমাদের স্যার",
        link: "https://youtu.be/IFLytBklp7A?si=jtnQChDRgCd57R13",
        platform: "YouTube",
        isAvailable: true
    },
    {
        id: 2,
        channel: "একাত্তর টিভি",
        topic: "একজন আদর্শ শিক্ষকের গল্প",
        link: "https://youtu.be/tFZGUYHbEGY?si=mteGOWwlbQ8xbJGx",
        platform: "YouTube",
        isAvailable: true
    },
    {
        id: 3,
        channel: "মাছরাঙা টেলিভিশন",
        topic: "রাঙাসকাল – অতিথি : জনাব মোঃ হামিদুল হক",
        link: "https://youtu.be/AyF4GWKZDEg?si=Bq3oK71Iq4pOalYX",
        platform: "YouTube",
        isAvailable: true
    },
    {
        id: 4,
        channel: "চ্যানেল ওয়ান",
        topic: "একজন শিক্ষক, একজন আপনজনা",
        link: "#",
        platform: "TV",
        isAvailable: false
    },
    {
        id: 5,
        channel: "একাত্তর টিভি",
        topic: "যেভাবে শত শত শিক্ষার্থীদের বদলে দিলেন একজন শিক্ষক",
        link: "https://www.facebook.com/share/v/1BQFxUCCg1/",
        platform: "Facebook",
        isAvailable: true
    },
    {
        id: 6,
        channel: "চ্যানেল ২৪",
        topic: "আইডিয়া লস প্রজেক্ট",
        link: "#",
        platform: "TV",
        isAvailable: false
    },
    {
        id: 7,
        channel: "ডিবিসি নিউজ",
        topic: "শিক্ষায় নতুন দিগন্ত – আইডিয়া মডেল",
        link: "#",
        platform: "TV",
        isAvailable: false
    },
    {
        id: 8,
        channel: "সময় টিভি",
        topic: "তরুণদের আত্মনির্ভরশীলতায় আইডিয়ার ভূমিকা",
        link: "#",
        platform: "TV",
        isAvailable: false
    },
    {
        id: 9,
        channel: "এটিএন বাংলা",
        topic: "আইডিয়া স্পোকেন ও গেইম মেথড ফিচার",
        link: "#",
        platform: "TV",
        isAvailable: false
    },
    {
        id: 10,
        channel: "ইন্ডিপেন্ডেন্ট টিভি",
        topic: "আলোকিত মানুষ গড়ার কারিগর",
        link: "#",
        platform: "TV",
        isAvailable: false
    }
];

// Newspaper Placeholder Gallery
const NEWSPAPER_CLIPS = [
    {
        id: 1,
        title: "দৈনিক প্রথম আলো - বিশেষ প্রতিবেদন",
        image: "/images/wings/youth-development.jpg",
        date: "১৫ মে, ২০২২"
    },
    {
        id: 2,
        title: "দৈনিক ইত্তেফাক - আইডিয়ার সাফল্যগাথা",
        image: "/images/wings/social-welfare.jpg",
        date: "১০ আগস্ট, ২০২১"
    },
    {
        id: 3,
        title: "দৈনিক সমকাল - উদ্যোক্তা তৈরিতে আইডিয়া",
        image: "/images/wings/pitha-pathshala.jpg",
        date: "০৪ জানুয়ারি, ২০২৩"
    },
    {
        id: 4,
        title: "দৈনিক কালের কণ্ঠ - শিক্ষক হামিদুল হকের গল্প",
        image: "/images/wings/pitha-research.jpg",
        date: "১৮ নভেম্বর, ২০২০"
    },
    {
        id: 5,
        title: "দৈনিক যুগান্তর - পিঠা গবেষণা ও ঐতিহ্য",
        image: "/images/wings/widen.jpg",
        date: "১২ ফেব্রুয়ারি, ২০২৪"
    },
    {
        id: 6,
        title: "দৈনিক বাংলাদেশ প্রতিদিন - আইডিয়া স্পোকেন মেথড",
        image: "/images/wings/rise-thrive.jpg",
        date: "০৫ সেপ্টেম্বর, ২০২৪"
    }
];

const getStatIcon = (iconName: string) => {
    switch (iconName) {
        case "users": return <Users className="w-6 h-6" />;
        case "handshake": return <Handshake className="w-6 h-6" />;
        case "map": return <Map className="w-6 h-6" />;
        case "calendar": return <Calendar className="w-6 h-6" />;
        default: return <Users className="w-6 h-6" />;
    }
};

export default function AmaderKarjokrom({ data }: AmaderKarjokromProps) {
    const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);

    return (
        <section className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10 space-y-20">

                {/* Section Header */}
                <motion.div
                    className="text-center max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-800 font-bold uppercase tracking-wider text-xs mb-3">
                        <Tv className="w-4 h-4 text-purple-600" />
                        Media & Documentaries
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
                        আমাদের কর্মকাণ্ড ও মিডিয়া কভারেজ
                    </h2>
                    <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                        গণমাধ্যমে আইডিয়া ও জনাব মোঃ হামিদুল হক স্যারের কার্যক্রম, টিভি প্রতিবেদন এবং পত্র-পত্রিকায় প্রকাশিত সংবাদ
                    </p>
                </motion.div>

                {/* 1. OUR 7 WINGS QUICK LINKS */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
                            <Layers className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900">Our 7 Wings</h3>
                            <p className="text-sm text-slate-500 font-medium">Quick links to IDEA&apos;s 7 core wings</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {WINGS_LIST.map((wing) => (
                            <Link key={wing.id} href={wing.slug}>
                                <motion.div
                                    whileHover={{ y: -4, scale: 1.01 }}
                                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between h-full"
                                >
                                    <div>
                                        <span className="text-[11px] font-bold uppercase text-purple-600 tracking-wider">
                                            Wing #{wing.id}
                                        </span>
                                        <h4 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors mt-1 leading-snug">
                                            {wing.name}
                                        </h4>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-purple-600 font-semibold text-xs group-hover:translate-x-1 transition-transform">
                                        <span>View Wing</span>
                                        <ArrowUpRight className="w-4 h-4" />
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* 2. TV MEDIA REPORTS (10 SLOTS) */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold">
                            <Tv className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900">
                                আইডিয়া ও স্যারকে নিয়ে গণমাধ্যমের বিভিন্ন রিপোর্ট লিংক
                            </h3>
                            <p className="text-sm text-slate-500 font-medium">টিভি চ্যানেল ও অনলাইন নিউজে প্রচারিত বিষয়ভিত্তিক প্রতিবেদন</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {TV_MEDIA_REPORTS.map((report) => (
                            <motion.div
                                key={report.id}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-purple-300 transition-all"
                            >
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-red-100 text-red-700">
                                            {report.channel}
                                        </span>
                                        <span className="text-xs font-semibold text-slate-400">
                                            Slot #{report.id}
                                        </span>
                                    </div>
                                    <h4 className="text-base font-bold text-slate-900 pt-1">
                                        {report.topic}
                                    </h4>
                                </div>

                                <div>
                                    {report.isAvailable ? (
                                        <a
                                            href={report.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-all shadow-md shadow-red-100 shrink-0 cursor-pointer"
                                        >
                                            <PlayCircle className="w-4 h-4" />
                                            <span>রিপোর্ট দেখুন</span>
                                            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                                        </a>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-400 font-medium text-xs border border-slate-200">
                                            <span>শীঘ্রই আসছে</span>
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 3. NEWSPAPER CLIPS GALLERY ("আইডিয়ার পত্র-পত্রিকাদি") */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-700 text-white flex items-center justify-center font-bold">
                                <Newspaper className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900">আইডিয়ার পত্র-পত্রিকাদি</h3>
                                <p className="text-sm text-slate-500 font-medium">পত্র-পত্রিকায় প্রকাশিত আইডিয়ার বিভিন্ন সংবাদ ও ছবি (ক্লিক করে বড় করে দেখুন)</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {NEWSPAPER_CLIPS.map((clip) => (
                            <motion.div
                                key={clip.id}
                                whileHover={{ y: -5 }}
                                onClick={() => setSelectedImage({ src: clip.image, title: clip.title })}
                                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer group relative"
                            >
                                <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                                    <Image
                                        src={clip.image}
                                        alt={clip.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-purple-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="w-12 h-12 rounded-full bg-white/90 text-purple-800 flex items-center justify-center shadow-lg">
                                            <Maximize2 className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-white border-t border-slate-100">
                                    <span className="text-[11px] font-bold text-purple-600 block mb-1">
                                        {clip.date}
                                    </span>
                                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-purple-700 transition-colors">
                                        {clip.title}
                                    </h4>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 4. STATS BAR (Original Map Background & Pill Design) */}
                {data?.stats && (
                    <motion.div
                        className="rounded-full py-8 px-8 md:px-16 max-w-5xl mx-auto shadow-md"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        style={{
                            backgroundImage: `url('/images/map.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {data.stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-center gap-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + (index * 0.1) }}
                                >
                                    {/* Icon */}
                                    <div className="w-14 h-14 rounded-full bg-purple-300/50 flex items-center justify-center text-purple-700 shrink-0">
                                        {getStatIcon(stat.icon)}
                                    </div>

                                    {/* Text */}
                                    <div>
                                        <div className="text-2xl md:text-3xl font-bold text-slate-800">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-slate-600 font-medium">
                                            {stat.label}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

            </div>

            {/* LIGHTBOX MODAL FOR NEWSPAPER IMAGES */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors cursor-pointer"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Image Container */}
                            <div className="relative h-[70vh] w-full bg-slate-950">
                                <Image
                                    src={selectedImage.src}
                                    alt={selectedImage.title}
                                    fill
                                    className="object-contain p-4"
                                />
                            </div>

                            {/* Title Caption */}
                            <div className="p-4 bg-slate-900 border-t border-slate-800 text-center">
                                <h3 className="text-lg font-bold text-white">
                                    {selectedImage.title}
                                </h3>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
