"use client"

import Image from 'next/image';
import { motion } from "motion/react"

interface YouthHeroProps {
  title?: string;
  description?: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
}

export default function SocialHome({
  title = "IDEA Youth Development Center",
  description = "তরুণদের হতাশা দূর করে দক্ষ ও উদ্ভাবনী হিসেবে গড়ে তুলতে যুব উন্নয়ন মন্ত্রণালয় ২০১৫ সালে আইডিয়া প্রোগ্রাম চালু করে। দেশে বিভিন্ন স্থানে শিক্ষার্থীদের জন্য নিয়মিত কর্মশালা ও দক্ষতা उन्नयन कार्यक्रम आयोजित होता है, जिससे वे सीखें, समझें और भविष्य के लिए अपने आपको तैयार कर सकें।",
  coverImageUrl = "/images/vai.jpg",
  coverImageAlt = "Hamidul Huq",
}: YouthHeroProps) {
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
              <span className="text-sm font-medium">Registration No: যুউঅ-১৭/২০২০</span>
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
                <span className="w-2 h-2 bg-white rounded-full"></span>

                <span className="text-sm font-medium">Since 2015</span>
              </motion.div>
              <motion.div 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-xl">🎯</span>
                <span className="text-sm font-medium">যশোর,বাংলাদেশ</span>
              </motion.div>

            </motion.div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div 
              className="relative w-full max-w-146.5 h-90 mx-auto rounded-2xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverImageUrl}
                alt={coverImageAlt}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
