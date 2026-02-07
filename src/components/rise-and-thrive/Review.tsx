"use client"

import { motion } from "motion/react"
import Image from "next/image"

export default function Review() {
  const reviews = [
    {
      name: "রাফি আহমেদ",
      location: "চট্টগ্রাম, কুমিল্লা",
      review: "শিক্ষা নিয়ে কাজে লাগাতে পেরে ১৭,০০০ টাকা আয়ম করছি"
    },
    {
      name: "রাফি আহমেদ",
      location: "চট্টগ্রাম, কুমিল্লা",
      review: "নিজের পরিবার নিয়ে বুঝতে পারছি"
    }
  ]

  return (
    <section className="py-20  md:py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 ">


        {/* Participant Reviews Section */}
        <motion.div
          className="relative bg-white rounded-3xl shadow-blue-200  shadow-lg p-8 md:p-12 overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Top Left Quarter Circle */}
          <div className="absolute top-0 left-0 w-48 h-48 bg-blue-300 rounded-br-full"></div>
          
          {/* Bottom Right Quarter Circle */}
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-300 rounded-tl-full"></div>

          {/* Heading */}
          <div className="text-center mb-12 relative z-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <img src="/home/partner_heart.png" alt=""  className="w-auto h-10"/>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                Participant Reviews
              </h2>
            </div>
            <p className="text-lg md:text-xl text-gray-600">
              সফল অংশগ্রহণকারী পর্ব
            </p>
          </div>

          {/* Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-md shadow-emerald-600 hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Quote */}
                <div className="mb-4">
                  <svg className="w-8 h-8 text-purple-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                  </svg>
                </div>

                {/* Review Text */}
                <p className="text-lg md:text-xl text-gray-800 font-medium mb-6 leading-relaxed">
                  "{review.review}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{review.name}</p>
                    <p className="text-sm text-gray-600">{review.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
