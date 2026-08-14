"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Copy, Check, ChevronLeft, ChevronRight, Landmark, X, Sparkles } from "lucide-react";

interface YouthHeroProps {
  title?: string;
  description?: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
}

const defaultCarouselImages = [
  "/images/social/1.jpg",
  "/images/social/2.jpg",
  "/images/social/3.jpg",
  "/images/social/4.jpg",
  "/images/social/5.jpg",
  "/images/social/6.jpg",
];

export default function SocialHome({
  title = "আইডিয়া সমাজ কল্যাণ সংস্থা",
  description = "তরুণদের সততা, মানবিকতা ও সামাজিক দায়বদ্ধতায় উদ্বুদ্ধ করে সমাজে পজিটিভ পরিবর্তন আনার লক্ষ্যে আইডিয়া সমাজ কল্যাণ সংস্থা কাজ করে যাচ্ছে। বিভিন্ন সময়ে দুস্থ ও অসহায় মানুষের সেবা, শীতবস্ত্র বিতরণ, শিক্ষা সহায়তা এবং রক্তদান কর্মসূচির মতো মানবিক উদ্যোগ পরিচালনা করা হয়।",
}: YouthHeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedRouting, setCopiedRouting] = useState(false);

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

  const copyToClipboard = (text: string, type: "account" | "routing") => {
    navigator.clipboard.writeText(text);
    if (type === "account") {
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2000);
    } else {
      setCopiedRouting(true);
      setTimeout(() => setCopiedRouting(false), 2000);
    }
  };

  return (
    <section className="relative min-h-127.75 w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/youth.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <motion.div
          className="absolute inset-0 bg-[#704FE6]/80 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        ></motion.div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-12 lg:py-20">
        {/* Hero Content Grid */}
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
              <span className="text-sm font-medium">রেজি: নং: ১৬৪৯</span>
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

            {/* Bottom Badges & Highlighted Donate Button */}
            <motion.div
              className="space-y-5 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {/* Highlighted Bright Donate Button */}
              <div>
                <motion.button
                  onClick={() => setIsDonateModalOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-white font-extrabold text-lg shadow-2xl shadow-rose-500/40 border-2 border-amber-300/60 hover:brightness-110 transition-all cursor-pointer"
                >
                  <Heart className="w-6 h-6 fill-white text-white animate-pulse" />
                  <span>• Donate Now (ডোনেট করুন)</span>
                  <Sparkles className="w-5 h-5 text-amber-200" />
                </motion.button>
              </div>

              {/* Info Badges */}
              <div className="flex flex-wrap gap-3">
                <motion.div
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  <span className="text-sm font-medium">১৩ ফেব্রুয়ারী, ২০১৫</span>
                </motion.div>
                <motion.div
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-sm font-medium">শাহ আব্দুল করিম রোড খড়কি, যশোর</span>
                </motion.div>
                <motion.div
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-sm font-medium">প্রতিষ্ঠাতা : মোঃ হামিদুল হক</span>
                </motion.div>
              </div>
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
                  alt={`Social Welfare ${currentSlide + 1}`}
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

      {/* Donate Now Bank Details Modal Dialog */}
      <AnimatePresence>
        {isDonateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDonateModalOpen(false)}
            />

            {/* Modal Content Card */}
            <motion.div
              className="relative w-full max-w-xl bg-slate-900 border border-purple-500/30 rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-hidden z-10"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsDonateModalOpen(false)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center shrink-0 shadow-lg">
                  <Heart className="w-6 h-6 text-white fill-white animate-pulse" />
                </div>
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-rose-400">
                    Donate Now
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    সাহায্য তহবিলে অনুদান দিন
                  </h3>
                </div>
              </div>

              {/* Bank Details Container */}
              <div className="space-y-4">
                {/* Account Title */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0 border border-purple-400/30">
                    <Landmark className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <p className="text-xs text-purple-300 font-semibold uppercase tracking-wider">
                      Bank Account Name
                    </p>
                    <p className="text-base sm:text-lg font-bold text-white">
                      Idea somaz kollan songstha
                    </p>
                  </div>
                </div>

                {/* Account Number Card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-slate-400 font-medium mb-1">
                      Current Account Number
                    </p>
                    <p className="text-lg sm:text-xl font-mono font-bold text-amber-300 tracking-wider">
                      0200015413380
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard("0200015413380", "account")}
                    className="inline-flex items-center gap-1.5 text-xs bg-rose-500 hover:bg-rose-600 text-white px-3.5 py-2 rounded-xl transition-all font-bold shadow-md cursor-pointer shrink-0"
                  >
                    {copiedAccount ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedAccount ? "Copied!" : "Copy"}</span>
                  </button>
                </div>

                {/* Routing Number Card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-slate-400 font-medium mb-1">
                      Routing Number
                    </p>
                    <p className="text-lg sm:text-xl font-mono font-bold text-amber-300 tracking-wider">
                      010410943
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard("010410943", "routing")}
                    className="inline-flex items-center gap-1.5 text-xs bg-rose-500 hover:bg-rose-600 text-white px-3.5 py-2 rounded-xl transition-all font-bold shadow-md cursor-pointer shrink-0"
                  >
                    {copiedRouting ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedRouting ? "Copied!" : "Copy"}</span>
                  </button>
                </div>

                {/* Bank Branch Card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-slate-300 space-y-1">
                  <div className="flex justify-between items-center text-sm font-semibold text-white">
                    <span>Agrani Bank Limited</span>
                    <span className="text-purple-300 text-xs">Jashore Branch</span>
                  </div>
                  <p className="text-slate-400">Branch Address: Jashore Branch, Jashore.</p>
                </div>
              </div>

              {/* Modal Footer Note */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>সরকারি নিবন্ধিত সংস্থা (রেজি: নং: ১৬৪৯)</span>
                <button
                  onClick={() => setIsDonateModalOpen(false)}
                  className="text-rose-400 hover:underline font-semibold cursor-pointer"
                >
                  বন্ধ করুন
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
