"use client"

import { motion } from "motion/react"
import Image from "next/image"

export default function WhyRiseAndThrive() {
  const points = [
    "বাস্তব জীবনে প্রয়োগযোগ্য Mind Programming পদ্ধতি।",
    "স্মৃতিশক্তি, মনোযোগ ও চিন্তাশক্তি উন্নয়নে প্র্যাক্টিক্যাল প্রশিক্ষণ।",
    "শিক্ষার্থী, অভিভাবক, শিক্ষক ও পেশাজীবী—সব বয়স ও পেশার মানুষের জন্য উপযোগী কনটেন্ট।",
    "গবেষণাভিত্তিক ও অভিজ্ঞতানির্ভর প্রশিক্ষণ পদ্ধতি।",
    "আত্ম-উন্নয়ন, মানসিক সুস্থতা এবং দীর্ঘমেয়াদি ব্যক্তিগত বিকাশে ধারাবাহিক সহায়তা।",
    "বাংলাদেশের প্রথম Black Belt in Memory অর্জনকারী প্রশিক্ষকের তত্ত্বাবধানে পরিচালিত প্রশিক্ষণ কার্যক্রম।"
  ];

  return (
    <section className="relative py-20 md:py-24 lg:py-24 bg-purple-50 overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 max-w-4xl">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Rise & Thrive?
          </h2>
          <div className="w-24 h-1.5 bg-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Content List */}
        <div className="space-y-4">
          {points.map((point, index) => (
            <motion.div
              key={index}
              className="bg-white border-2 border-purple-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-purple-300 transition-all duration-300 flex items-start gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -2, scale: 1.01 }}
            >
              {/* Check Icon */}
              <div className="shrink-0 w-7 h-7 relative mt-0.5">
                <Image
                  src="/home/add_task.png"
                  alt="Check icon"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Text */}
              <div className="flex-1">
                <p className="text-lg font-medium text-gray-800 leading-relaxed">
                  {point}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
