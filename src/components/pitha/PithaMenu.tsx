"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ZoomIn, X, ChevronLeft, ChevronRight, Utensils, PhoneCall } from "lucide-react";

const menuImages = [
  {
    id: 1,
    url: "/images/pitamenu/1.jpg",
    title: "আইডিয়া পিঠা পার্ক - মেন্যু ১",
    subtitle: "শিক্ষার্থীদের দ্বারা পরিচালিত বিকল্প কর্মসংস্থান",
  },
  {
    id: 2,
    url: "/images/pitamenu/2.jpg",
    title: "আইডিয়া পিঠা পার্ক - মেন্যু ২",
    subtitle: "শিক্ষার্থীদের দ্বারা পরিচালিত বিকল্প কর্মসংস্থান",
  },
];

export default function PithaMenu() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % menuImages.length : null));
  }, []);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + menuImages.length) % menuImages.length : null
    );
  }, []);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedIndex, handleClose, handleNext, handlePrev]);

  const activeImage = selectedIndex !== null ? menuImages[selectedIndex] : null;

  return (
    <section className="py-14 md:py-20 bg-gradient-to-b from-purple-50/50 via-white to-purple-50/30">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-semibold text-sm mb-4 border border-purple-200">
            <Utensils className="w-4 h-4" />
            <span>আইডিয়া পিঠা পার্ক</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            আমাদের পিঠার মেন্যু তালিকা
          </h2>
          <p className="mt-3 text-lg text-gray-600 font-medium">
            শিক্ষার্থীদের দ্বারা পরিচালিত বিকল্প কর্মসংস্থান সৃষ্টির একটি অনন্য প্রকল্প
          </p>
        </motion.div>

        {/* 2 Image Menu Cards Side-by-Side (Left & Right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {menuImages.map((item, index) => (
            <motion.div
              key={item.id}
              onClick={() => setSelectedIndex(index)}
              className="group relative bg-white rounded-3xl overflow-hidden border-2 border-purple-100 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -6 }}
            >
              {/* Image Box */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-contain md:object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Hover Overlay with Zoom Icon */}
                <div className="absolute inset-0 bg-purple-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 backdrop-blur-[2px]">
                  <div className="p-4 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/40 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ZoomIn className="w-8 h-8" />
                  </div>
                  <span className="text-white text-sm font-bold bg-purple-600/90 px-4 py-1.5 rounded-full border border-purple-300 shadow-md">
                    বড় করে দেখতে ক্লিক করুন
                  </span>
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="p-5 bg-white border-t border-purple-100 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">{item.subtitle}</p>
                </div>
                <span className="shrink-0 text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-200">
                  মেন্যু {item.id}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order Contact Banner */}
        <motion.div
          className="mt-12 max-w-2xl mx-auto bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white text-center shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 text-left">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0 border border-white/30">
              <PhoneCall className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-purple-200 uppercase font-semibold tracking-wider">অর্ডারের জন্য যোগাযোগ করুন</p>
              <h4 className="text-lg font-bold text-white">01783-414354, 01977567539</h4>
            </div>
          </div>

          <a
            href="tel:01783414354"
            className="shrink-0 bg-white text-purple-700 hover:bg-purple-50 px-5 py-2.5 rounded-full font-bold text-sm shadow-md transition-all border border-white/40"
          >
            কল করুন
          </a>
        </motion.div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8"
            onClick={handleClose}
          >
            {/* Top Controls */}
            <div
              className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-sm font-medium tracking-wide bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                {selectedIndex + 1} / {menuImages.length} • {activeImage.title}
              </span>
              <button
                onClick={handleClose}
                aria-label="Close menu view"
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10 cursor-pointer text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Left Nav Button */}
            {menuImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                aria-label="Previous menu"
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10 text-white z-10 cursor-pointer hidden md:flex items-center justify-center"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Modal Image Box */}
            <motion.div
              key={activeImage.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl max-h-[88vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeImage.url}
                alt={activeImage.title}
                className="max-h-[82vh] max-w-full rounded-2xl object-contain shadow-2xl bg-white"
              />
            </motion.div>

            {/* Right Nav Button */}
            {menuImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Next menu"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10 text-white z-10 cursor-pointer hidden md:flex items-center justify-center"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Mobile Bottom Navigation Controls */}
            {menuImages.length > 1 && (
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 md:hidden z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full bg-white/10 active:bg-white/20 transition-colors backdrop-blur-md border border-white/10 text-white"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-full bg-white/10 active:bg-white/20 transition-colors backdrop-blur-md border border-white/10 text-white"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
