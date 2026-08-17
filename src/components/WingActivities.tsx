"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WingActivity } from '@/lib/api';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

interface WingActivitiesProps {
  title?: string;
  subtitle?: string;
  activities: WingActivity[];
}

const WingActivities: React.FC<WingActivitiesProps> = ({
  title = "Our Activities",
  subtitle = "Our Online and Offline Activities",
  activities
}) => {
  const [selectedActivity, setSelectedActivity] = useState<WingActivity | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Close modal when clicking escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedImageIndex !== null) {
          setSelectedImageIndex(null);
        } else if (selectedActivity) {
          setSelectedActivity(null);
        }
      }
      
      if (selectedActivity && selectedActivity.images && selectedActivity.images.length > 1 && selectedImageIndex !== null) {
        if (e.key === "ArrowRight") {
          setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % selectedActivity.images.length : null));
        }
        if (e.key === "ArrowLeft") {
          setSelectedImageIndex((prev) => (prev !== null ? (prev - 1 + selectedActivity.images.length) % selectedActivity.images.length : null));
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    
    if (selectedActivity || selectedImageIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedActivity, selectedImageIndex]);

  if (!activities || activities.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {title}
          </h2>
          <p className="text-gray-600 text-lg">
            {subtitle}
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => {
            const firstImage = activity.images && activity.images.length > 0 ? activity.images[0] : null;

            return (
              <div
                key={activity.id || index}
                onClick={() => setSelectedActivity(activity)}
                className="group p-6 border-2 border-purple-200 rounded-2xl hover:border-purple-400 transition-all duration-300 hover:shadow-lg bg-white cursor-pointer flex flex-col"
              >
                {/* Image replacing the Icon */}
                {firstImage ? (
                  <div className="w-16 h-16 rounded-xl overflow-hidden mb-4 group-hover:scale-110 transition-transform duration-300 shrink-0 bg-purple-50">
                    <img 
                      src={firstImage.url} 
                      alt={firstImage.alt || activity.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 shrink-0 bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-400 text-xs text-center leading-tight">No Image</span>
                  </div>
                )}

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {activity.title}
                </h3>
                <p className="text-gray-600 line-clamp-3">
                  {activity.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity Details Modal */}
      <AnimatePresence>
        {selectedActivity && selectedImageIndex === null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setSelectedActivity(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedActivity(null)}
                className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-gray-100 backdrop-blur rounded-full text-gray-600 transition-colors z-10 border border-gray-200 shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto p-6 md:p-10 flex-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style>{`
                  .overflow-y-auto::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 pr-8">
                  {selectedActivity.title}
                </h2>
                <div className="prose max-w-none text-gray-700 mb-8 whitespace-pre-wrap">
                  {selectedActivity.description}
                </div>

                {selectedActivity.images && selectedActivity.images.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Gallery</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                      {selectedActivity.images.map((img, idx) => (
                        <div 
                          key={img.id || idx}
                          onClick={() => setSelectedImageIndex(idx)}
                          className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative bg-gray-100"
                        >
                          <img 
                            src={img.url} 
                            alt={img.alt || `${selectedActivity.title} - Image ${idx + 1}`} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <ZoomIn className="text-white w-6 h-6" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Image Lightbox */}
      <AnimatePresence>
        {selectedActivity && selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            onClick={() => setSelectedImageIndex(null)}
          >
            {/* Top Bar with Counter & Close button */}
            <div
              className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-sm font-medium tracking-wide bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                {selectedImageIndex + 1} / {selectedActivity.images.length}
              </span>
              <button
                onClick={() => setSelectedImageIndex(null)}
                aria-label="Close fullscreen view"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10 cursor-pointer text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Previous Button */}
            {selectedActivity.images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex((prev) => (prev !== null ? (prev - 1 + selectedActivity.images.length) % selectedActivity.images.length : null));
                }}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10 text-white z-20 cursor-pointer hidden md:flex items-center justify-center"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedActivity.images[selectedImageIndex].url}
                alt={selectedActivity.images[selectedImageIndex].alt || 'Activity fullscreen image'}
                className="max-h-[80vh] max-w-full rounded-lg object-contain shadow-2xl"
              />
            </motion.div>

            {/* Navigation Next Button */}
            {selectedActivity.images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % selectedActivity.images.length : null));
                }}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10 text-white z-20 cursor-pointer hidden md:flex items-center justify-center"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Mobile Bottom Navigation Controls */}
            {selectedActivity.images.length > 1 && (
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 md:hidden z-20"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImageIndex((prev) => (prev !== null ? (prev - 1 + selectedActivity.images.length) % selectedActivity.images.length : null))}
                  aria-label="Previous image"
                  className="p-3 rounded-full bg-white/10 active:bg-white/20 transition-colors backdrop-blur-md border border-white/10 text-white"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % selectedActivity.images.length : null))}
                  aria-label="Next image"
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
};

export default WingActivities;
