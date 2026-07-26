"use client";

import { motion, AnimatePresence } from "motion/react";
import { BlogGalleryImage } from "@/lib/api";
import { useMemo, useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface PhotoGalleryProps {
  images: BlogGalleryImage[];
  title?: string;
  subtitle?: string;
}

const BACKEND_ORIGIN = (process.env.NEXT_PUBLIC_BACKEND_URL ?? "https://api.idealessons.com").replace(/\/+$/, "");

function toAbsoluteUrl(url: string): string {
  if (url.startsWith("http")) return url;
  return `${BACKEND_ORIGIN}${url.startsWith("/") ? "" : "/"}${url}`;
}

export default function PhotoGallery({
  images,
  title = "Photo Gallery",
  subtitle = "আমাদের কার্যক্রমের ঝলক",
}: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const galleryImages = images.slice(0, 8);
  const resolvedGalleryImages = useMemo(
    () =>
      galleryImages.map((image) => ({
        ...image,
        resolvedUrl: toAbsoluteUrl(image.url),
      })),
    [galleryImages]
  );

  useEffect(() => {
    console.log("[PhotoGallery] image src urls:", resolvedGalleryImages.map((image) => image.resolvedUrl));
  }, [resolvedGalleryImages]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % resolvedGalleryImages.length : null));
  }, [resolvedGalleryImages.length]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + resolvedGalleryImages.length) % resolvedGalleryImages.length : null
    );
  }, [resolvedGalleryImages.length]);

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

  const activeImage = selectedIndex !== null ? resolvedGalleryImages[selectedIndex] : null;

  return (
    <section className="py-10 md:py-14 lg:py-18 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">{title}</h2>
          </div>
          <p className="text-lg md:text-xl text-gray-600 pl-11">{subtitle}</p>
        </motion.div>

        {galleryImages.length === 0 ? (
          <div className="rounded-2xl border border-purple-100 bg-purple-50 p-8 text-center text-gray-600">
            Gallery images will be added soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[200px] md:auto-rows-[250px] gap-4">
            {resolvedGalleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                onClick={() => setSelectedIndex(index)}
                className={`relative overflow-hidden rounded-2xl bg-purple-100 group cursor-pointer ${
                  index === 0 && resolvedGalleryImages.length > 2 ? "lg:row-span-2" : ""
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.resolvedUrl}
                  alt={image.alt || title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/40 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
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
            {/* Top Bar with Counter & Close button */}
            <div
              className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-sm font-medium tracking-wide bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                {selectedIndex + 1} / {resolvedGalleryImages.length}
              </span>
              <button
                onClick={handleClose}
                aria-label="Close fullscreen view"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10 cursor-pointer text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Previous Button */}
            {resolvedGalleryImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10 text-white z-10 cursor-pointer hidden md:flex items-center justify-center"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Main Fullscreen Image Container */}
            <motion.div
              key={activeImage.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeImage.resolvedUrl}
                alt={activeImage.alt || title}
                className="max-h-[80vh] max-w-full rounded-lg object-contain shadow-2xl"
              />
              {/* {activeImage.alt && (
                <p className="mt-3 text-center text-sm md:text-base text-gray-300 font-medium px-4">
                  {activeImage.alt}
                </p>
              )} */}
            </motion.div>

            {/* Navigation Next Button */}
            {resolvedGalleryImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10 text-white z-10 cursor-pointer hidden md:flex items-center justify-center"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Mobile Bottom Navigation Controls */}
            {resolvedGalleryImages.length > 1 && (
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 md:hidden z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handlePrev}
                  aria-label="Previous image"
                  className="p-3 rounded-full bg-white/10 active:bg-white/20 transition-colors backdrop-blur-md border border-white/10 text-white"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
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
}

