"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Film, Maximize2, ExternalLink, X } from "lucide-react";

interface GameMethodDocumentaryProps {
  videoId?: string;
  libraryId?: string;
  standaloneUrl?: string;
  title?: string;
}

export default function GameMethodDocumentary({
  videoId = "409abcfd-c40b-4ddc-8b7a-deae795b2a50",
  libraryId = "738203",
  standaloneUrl = "https://player.mediadelivery.net/play/738203/409abcfd-c40b-4ddc-8b7a-deae795b2a50",
  title = "Documentary",
}: GameMethodDocumentaryProps) {
  const [isTheaterOpen, setIsTheaterOpen] = useState(false);

  const inlineEmbedUrl = `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?autoplay=false&preload=true&responsive=true`;
  const theaterEmbedUrl = `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?autoplay=true&preload=true&responsive=true`;

  // Close theater modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsTheaterOpen(false);
      }
    };

    if (isTheaterOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isTheaterOpen]);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-purple-50/30 to-slate-50 relative overflow-hidden">
      {/* Background Decorative Blur Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-purple-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-72 h-72 bg-indigo-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-sm font-semibold mb-4">
            <Film className="w-4 h-4 text-purple-600" />
            Watch Documentary
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h2>
        </div>

        {/* Video Player Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl border border-purple-100 shadow-xl shadow-purple-500/5 overflow-hidden p-3 sm:p-5"
        >
          {/* Top Controls Bar */}
          <div className="flex items-center justify-between px-2 pb-3 mb-1 border-b border-slate-100 text-xs text-slate-500">
            <span className="font-medium text-slate-700">
              IDEA SPOKEN – The Game Method
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsTheaterOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium transition-colors cursor-pointer border border-purple-200/60"
                title="Watch in Theater Mode"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Theater Mode</span>
              </button>

              <a
                href={standaloneUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors border border-slate-200"
                title="Open in New Tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">New Tab</span>
              </a>
            </div>
          </div>

          {/* 16:9 Responsive Video Frame */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-inner">
            <iframe
              src={inlineEmbedUrl}
              loading="lazy"
              title="The Game Method Documentary"
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>
      </div>

      {/* Theater Mode Fullscreen Modal */}
      <AnimatePresence>
        {isTheaterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setIsTheaterOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-5xl rounded-3xl overflow-hidden bg-white shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <Film className="w-4 h-4 text-purple-600" />
                  <span>The Game Method Documentary</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={standaloneUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 transition-colors"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setIsTheaterOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Theater Video Frame */}
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={theaterEmbedUrl}
                  title="The Game Method Documentary - Theater Mode"
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
