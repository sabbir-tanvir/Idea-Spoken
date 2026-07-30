"use client";

import { HomeHeroData } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface HeroProps {
    data: HomeHeroData;
}

const CAROUSEL_INTERVAL_MS = 4500;

function HeroImageCarousel({ images }: { images: string[] }) {
    const [current, setCurrent] = useState(0);
    const hasMultiple = images.length > 1;

    const goTo = useCallback(
        (index: number) => {
            setCurrent((index + images.length) % images.length);
        },
        [images.length]
    );

    useEffect(() => {
        if (!hasMultiple) return;

        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, CAROUSEL_INTERVAL_MS);

        return () => clearInterval(timer);
    }, [hasMultiple, images.length]);

    return (
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-slate-900/5 md:aspect-[5/6] lg:max-h-[580px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={images[current]}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.65, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={images[current]}
                            alt={`IDEA students ${current + 1}`}
                            fill
                            priority={current === 0}
                            quality={75}
                            sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 520px"
                            className="object-cover object-center"
                        />
                    </motion.div>
                </AnimatePresence>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent" />

                {hasMultiple && (
                    <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                aria-label={`Show slide ${index + 1}`}
                                onClick={() => goTo(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    index === current
                                        ? "w-7 bg-white"
                                        : "w-2 bg-white/50 hover:bg-white/75"
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div
                aria-hidden
                className="absolute -right-3 -top-3 -z-10 hidden h-full w-full rounded-3xl bg-purple-100/80 lg:block"
            />
        </div>
    );
}

export default function Hero({ data }: HeroProps) {
    if (!data) return null;

    const carouselImages =
        data.images && data.images.length > 0 ? data.images : [data.image];

    return (
        <section
            className="relative min-h-[80vh] bg-white/80 overflow-hidden py-20 md:py-24 lg:py-32"
            style={{ backgroundImage: "url('/images/dhew.png')" }}
        >
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.p
                            className="text-purple-600 font-medium text-lg mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {data.tagline}
                        </motion.p>

                        <motion.h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            {data.title}
                        </motion.h1>

                        <motion.p
                            className="text-slate-600 text-lg md:text-xl leading-relaxed mb-8 max-w-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            {data.description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Link
                                href="/courses"
                                className="inline-flex cursor-pointer items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white pl-8 py-0 rounded-full font-medium text-lg transition-all shadow-lg"
                            >
                                {data.ctaText}
                                <ArrowRight className="w-14 h-14 bg-slate-700 rounded-full p-2 text-slate-100 right-0" />
                            </Link>
                        </motion.div>

                        <motion.div
                            className="hidden md:block absolute bottom-20 left-40"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Image
                                src="/images/book.png"
                                alt="Book"
                                width={120}
                                height={120}
                                loading="lazy"
                                sizes="120px"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Right: Image Carousel */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <HeroImageCarousel images={carouselImages} />

                        <Link href="#our-wings" scroll>
                            <motion.div
                                className="absolute -bottom-2 left-30 transform -translate-x-1/2 bg-white rounded-2xl shadow-xl px-8 py-5 flex items-center gap-4 cursor-pointer hover:shadow-2xl transition-shadow duration-300"
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
                        </Link>

                        <Image
                            src="/images/aroww.png"
                            alt="Arrow"
                            width={500}
                            height={100}
                            loading="lazy"
                            sizes="(max-width: 1024px) 0px, 500px"
                            className="absolute -left-130 bottom-1 text-slate-400 hidden lg:block"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
