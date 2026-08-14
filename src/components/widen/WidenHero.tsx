"use client"

import Image from 'next/image';
import { motion } from "motion/react"

interface HeroSectionProps {
  title?: string;
  description?: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
}

export default function HeroSection({
  title = "Bangladeshi Students & Entrepreneurs Group (WIDEN)",
  description = "বাংলাদেশ শিক্ষার্থী ও উদ্যোক্তা গ্রুপ (WINI) একটি উদ্ভাবনী ও স্বপ্নমুখী অনলাইন প্ল্যাটফর্ম, যা তরুণ শিক্ষার্থী ও সম্ভাবনাময় উদ্যোক্তাদের দক্ষ, আত্মনির্ভরশীল এবং দায়িত্বশীল উদ্যোক্তা হিসেবে গড়ে তোলার লক্ষ্যে কাজ করে যাচ্ছে। দেশজুড়ে ছড়িয়ে থাকা উদ্যমী শিক্ষার্থীদের একটি শক্তিশালী নেটওয়ার্কের মাধ্যমে দেশীয় পণ্যের প্রচার, বাজার সম্প্রসারণ এবং উদ্যোক্তাদের জন্য টেকসই সুযোগ সৃষ্টি করাই আমাদের অন্যতম লক্ষ্য। ২০২০ সালে করোনা মহামারির কঠিন সময়ে WINI-এর যাত্রা শুরু হয়। সংকটকালেও প্রায় ১০০-এর অধিক শিক্ষার্থী উদ্যোক্তা তৈরির মাধ্যমে আত্মকর্মসংস্থানের এক অনন্য দৃষ্টান্ত স্থাপন করে এই প্ল্যাটফর্ম। সময়ের পরিক্রমায় WINI আজ দেশের বিভিন্ন জেলার উদ্যোক্তা, শিক্ষার্থী ও স্বপ্নবাজ তরুণদের একটি নির্ভরযোগ্য কমিউনিটিতে পরিণত হয়েছে। বর্তমানে প্রায় ৩২ হাজার সদস্যের এই অনলাইন প্ল্যাটফর্ম উদ্যোক্তা উন্নয়ন, দক্ষতা বৃদ্ধি, সামাজিক উদ্যোগ এবং শিক্ষাবান্ধব কার্যক্রমের মাধ্যমে দেশের যুবসমাজকে ইতিবাচক পরিবর্তনের পথে এগিয়ে নিয়ে যাচ্ছে।",
  coverImageUrl = "/home/vai.jpg",
  coverImageAlt = "Hamidul Huq",
}: HeroSectionProps) {
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
                <span className="w-2 h-2 bg-white rounded-full"></span>
                <span className="text-sm font-medium">Mind Programming</span>
              </motion.div>
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
