"use client"

import { motion } from "motion/react"
import Image from "next/image"

export default function PhotoGallery() {
  const galleryImages = [
    {
      src: "/gallery/1.jpg",
      alt: "Gallery Image 1",
      span: "row-span-2" // Large image
    },
    {
      src: "/gallery/2.jpg",
      alt: "Gallery Image 2",
      span: ""
    },
    {
      src: "/gallery/3.jpg",
      alt: "Gallery Image 3",
      span: ""
    },
    {
      src: "/gallery/4.jpg",
      alt: "Gallery Image 4",
      span: ""
    },
    {
      src: "/gallery/5.jpg",
      alt: "Gallery Image 5",
      span: ""
    },
    {
      src: "/gallery/6.jpg",
      alt: "Gallery Image 6",
      span: ""
    }
  ]

  return (
    <section className="py-20  md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 ">
        {/* Heading */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <svg 
              className="w-8 h-8 text-purple-600" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Photo Gallery
            </h2>
          </div>
          <p className="text-lg md:text-xl text-gray-600 pl-11">
            আমাদের কার্যক্রমের ঝলক
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[200px] md:auto-rows-[250px] gap-4">
          {/* Large Image - Spans 2 rows */}
          <motion.div
            className="relative overflow-hidden rounded-2xl bg-purple-100 lg:row-span-2 group cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src={galleryImages[0].src}
              alt={galleryImages[0].alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </motion.div>

          {/* Small Images - Right side */}
          <motion.div
            className="relative overflow-hidden rounded-2xl bg-purple-100 group cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src={galleryImages[1].src}
              alt={galleryImages[1].alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-2xl bg-purple-100 group cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src={galleryImages[2].src}
              alt={galleryImages[2].alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </motion.div>

          {/* Bottom Row - 3 equal images */}
          <motion.div
            className="relative overflow-hidden rounded-2xl bg-purple-100 group cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src={galleryImages[3].src}
              alt={galleryImages[3].alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-2xl bg-purple-100 group cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src={galleryImages[4].src}
              alt={galleryImages[4].alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-2xl bg-purple-100 group cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src={galleryImages[5].src}
              alt={galleryImages[5].alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
