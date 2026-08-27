"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from "motion/react"
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  title?: string;
  description?: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
}

const defaultCarouselImages = [
  "/images/wini/1.webp",
  "/images/wini/2.webp",
  "/images/wini/3.webp",
];

export default function HeroSection({
  title = "Bangladeshi Students & Entrepreneurs Group (WIDEN)",
  description = "বাংলাদেশ শিক্ষার্থী ও উদ্যোক্তা গ্রুপ (WINI) একটি উদ্ভাবনী ও স্বপ্নমুখী অনলাইন প্ল্যাটফর্ম, যা তরুণ শিক্ষার্থী ও সম্ভাবনাময় উদ্যোক্তাদের দক্ষ, আত্মনির্ভরশীল এবং দায়িত্বশীল উদ্যোক্তা হিসেবে গড়ে তোলার লক্ষ্যে কাজ করে যাচ্ছে। দেশজুড়ে ছড়িয়ে থাকা উদ্যমী শিক্ষার্থীদের একটি শক্তিশালী নেটওয়ার্কের মাধ্যমে দেশীয় পণ্যের প্রচার, বাজার সম্প্রসারণ এবং উদ্যোক্তাদের জন্য টেকসই সুযোগ সৃষ্টি করাই আমাদের অন্যতম লক্ষ্য। ২০২০ সালে করোনা মহামারির কঠিন সময়ে WINI-এর যাত্রা শুরু হয়। সংকটকালেও প্রায় ১০০-এর অধিক শিক্ষার্থী উদ্যোক্তা তৈরির মাধ্যমে আত্মকর্মসংস্থানের এক অনন্য দৃষ্টান্ত স্থাপন করে এই প্ল্যাটফর্ম। সময়ের পরিক্রমায় WINI আজ দেশের বিভিন্ন জেলার উদ্যোক্তা, শিক্ষার্থী ও স্বপ্নবাজ তরুণদের একটি নির্ভরযোগ্য কমিউনিটিতে পরিণত হয়েছে। বর্তমানে প্রায় ৩২ হাজার সদস্যের এই অনলাইন প্ল্যাটফর্ম উদ্যোক্তা উন্নয়ন, দক্ষতা বৃদ্ধি, সামাজিক উদ্যোগ এবং শিক্ষাবান্ধব কার্যক্রমের মাধ্যমে দেশের যুবসমাজকে ইতিবাচক পরিবর্তনের পথে এগিয়ে নিয়ে যাচ্ছে।",
  coverImageUrl = "/home/vai.jpg",
  coverImageAlt = "Hamidul Huq",
}: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto carousel timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % defaultCarouselImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % defaultCarouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + defaultCarouselImages.length) % defaultCarouselImages.length);
  };

  return (
    <section className="relative min-h-127.75 w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/home/bgg.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <motion.div 
          className="absolute inset-0 bg-[#704FE6]/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        ></motion.div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div 
            className="text-white space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Top Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">Online Platform</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {title}
            </motion.h1>

            {/* Description in Bengali */}
            <motion.p 
              className="text-lg md:text-xl leading-relaxed text-white/90 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {description}
            </motion.p>

            {/* Bottom Badges */}
            <motion.div 
              className="flex flex-wrap gap-3 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >

              <motion.div 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-xl">🎯</span>
                <span className="text-sm font-medium">Focus</span>
              </motion.div>
              <motion.div 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-xl">✨</span>
                <span className="text-sm font-medium">Transformation</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - Automatic Image Carousel */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-full max-w-146.5 h-80 sm:h-100 mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={defaultCarouselImages[currentSlide]}
                  alt={`WIDEN Hero ${currentSlide + 1}`}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="h-full w-full object-cover"
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Slide Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
                {defaultCarouselImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentSlide === idx ? "w-6 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
