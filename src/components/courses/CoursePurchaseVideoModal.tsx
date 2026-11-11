'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Play, Film } from 'lucide-react';

interface CoursePurchaseVideoModalProps {
  videoId?: string;
  libraryId?: string;
  standaloneUrl?: string;
  title?: string;
}

export default function CoursePurchaseVideoModal({
  videoId = '1cba67ed-163a-4a49-ad90-0ad068751830',
  libraryId = '738203',
  standaloneUrl = 'https://player.mediadelivery.net/play/738203/1cba67ed-163a-4a49-ad90-0ad068751830',
  title = 'How to Purchase our courses ? Video',
}: CoursePurchaseVideoModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle ESC key press and body overflow
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const embedUrl = `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?autoplay=true&preload=true&responsive=true`;

  return (
    <>
      {/* Play Button - Centered between sections */}
      <div className="relative z-30 -mt-16 flex justify-center md:-mt-20">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative flex h-40 w-40 items-center justify-center cursor-pointer md:h-48 md:w-48 focus:outline-hidden focus-visible:ring-4 focus-visible:ring-purple-400 rounded-full"
          aria-label="Play How to Purchase our courses video"
        >
          {/* Rotating text circle */}
          <svg
            className="absolute h-full w-full animate-spin-slow pointer-events-none select-none"
            viewBox="0 0 100 100"
          >
            <defs>
              <path
                id="circlePath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              />
            </defs>
            <text className="fill-purple-700 text-[8.5px] font-bold uppercase tracking-[0.22em]">
              <textPath href="#circlePath">
                How to Purchase our courses ? Video •{' '}
              </textPath>
            </text>
          </svg>

          {/* Center play button */}
          <div className="absolute flex h-20 w-20 items-center justify-center rounded-full bg-purple-600 text-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-700 group-active:scale-95 md:h-24 md:w-24">
            <Play className="h-8 w-8 ml-1 md:h-10 md:w-10 text-white" fill="currentColor" />
          </div>

          {/* Outer ring with white background */}
          <div
            className="absolute h-full w-full rounded-full border-2 border-purple-200 bg-white/90 backdrop-blur-sm transition-colors group-hover:border-purple-300"
            style={{ zIndex: -1 }}
          />
        </button>
      </div>

      {/* Video Modal Portal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
                onClick={() => setIsOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0, y: 15 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 15 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="relative w-full max-w-4xl overflow-hidden rounded-2xl md:rounded-3xl bg-slate-900 shadow-2xl border border-purple-900/50 flex flex-col"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-slate-800/90 border-b border-slate-700 text-white">
                    <div className="flex items-center gap-2.5 min-w-0 pr-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600/30 text-purple-400 shrink-0">
                        <Film className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm sm:text-base font-semibold truncate text-white">
                          {title}
                        </h3>
                        <p className="text-xs text-purple-300 hidden sm:block">
                          কোর্স কেনার সম্পূর্ণ ভিডিও নির্দেশিকা
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href={standaloneUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white text-xs font-medium transition-colors"
                        title="Open in new tab"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">New Tab</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        aria-label="Close modal"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* 16:9 Video Frame */}
                  <div className="relative aspect-video w-full bg-black">
                    <iframe
                      src={embedUrl}
                      title={title}
                      className="absolute inset-0 w-full h-full border-0"
                      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  {/* Modal Footer */}
                  <div className="px-4 sm:px-6 py-3 bg-slate-900/95 border-t border-slate-800 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
                    <span>
                      ভিডিওটি দেখে সহজেই যেকোনো কোর্স বেছে নিন এবং অনলাইনে পেমেন্ট সম্পন্ন করুন।
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="text-purple-400 hover:text-purple-300 font-medium transition-colors shrink-0"
                    >
                      বন্ধ করুন (Close)
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
