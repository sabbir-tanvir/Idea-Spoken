"use client"

import { motion } from "motion/react"
import Image from "next/image"

export default function WhatYouWillLearn() {
  const benefitsData = [
    {
      category: "★ Benefits for Students",
      items: [
        { title: "মনোযোগ ও ফোকাস বৃদ্ধি" },
        { title: "মেমোরি ও পড়ার কার্যকর পদ্ধতি" },
        { title: "আত্মবিশ্বাস ও স্বনির্ভরতা বৃদ্ধি" },
        { title: "শিক্ষার্থী-অভিভাবক সম্পর্ক উন্নয়ন" },
      ]
    },
    {
      category: "★ Benefits for Professionals & Entrepreneurs",
      items: [
        { title: "মানসিক চাপ ও ক্লান্তি ম্যানেজমেন্ট" },
        { title: "ফোকাস ও প্রোডাক্টিভিটি বৃদ্ধি" },
        { title: "আত্মবিশ্বাস ও মাইন্ডসেট ডেভেলপমেন্ট" },
        { title: "লক্ষ্য অর্জনের স্টেপ-বাই-স্টেপ গাইডলাইন" },
      ]
    },
    {
      category: "★ Benefits for Parents",
      items: [
        { title: "সন্তানের মানসিকতা বোঝার দক্ষতা" },
        { title: "কার্যকর অভিভাবকত্বের গাইডলাইন" },
        { title: "ইতিবাচক সম্পর্ক গড়ে তোলার কৌশল" },
      ]
    }
  ]

  return (
    <section className="relative py-20  md:py-24 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/map.jpg"
          alt="Background Map"
          fill
          className="object-cover"
        />
      </div>
      <div className="relative z-10 container mx-auto px-4 ">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            What You'll Learn
          </h2>
        </motion.div>

        {/* Learning Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {benefitsData.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.2 }}
            >
              {/* Category Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {section.category}
              </h3>

              {/* Benefits List */}
              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 rounded-lg p-4 shadow-md shadow-blue-100 hover:shadow-lg hover:shadow-blue-200 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: itemIndex * 0.08 }}
                    whileHover={{ y: -3, scale: 1.01 }}
                  >
                    <div className="flex items-start gap-3">
                      {/* Check Icon */}
                      <div className="shrink-0 w-6 h-6 relative mt-0.5">
                        <Image
                          src="/home/add_task.png"
                          alt="Check icon"
                          fill
                          className="object-contain"
                        />
                      </div>

                      {/* Text Content */}
                      <div className="flex-1">
                        <h4 className="text-base font-semibold text-gray-800 leading-snug">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
