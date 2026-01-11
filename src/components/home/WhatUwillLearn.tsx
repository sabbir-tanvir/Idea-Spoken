"use client"

import { motion } from "motion/react"
import Image from "next/image"

export default function WhatYouWillLearn() {
  const learningTopics = [
    {
      title: "Mind Pylons & Focus Routines"
    },
    {
      title: "Habit Formation",
      subtitle: "(Neuroplasticity-Based)"
    },
    {
      title: "Anxiety/Stress Tools & Self-Talk Protocols"
    },
    {
      title: "Academic/Work Performance Systems"
    },
    {
      title: "Self-Confidence & Life Direction"
    }
  ]

  return (
    <section className="relative py-20  md:py-24 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/home/map.jpg"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {learningTopics.map((topic, index) => (
            <motion.div
              key={index}
              className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 rounded-2xl p-6 md:p-8 shadow-lg shadow-blue-100 hover:shadow-xl hover:shadow-blue-200 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex items-start gap-4">
                {/* Check Icon */}
                <div className="flex-shrink-0 w-8 h-8 relative">
                  <Image
                    src="/home/add_task.png"
                    alt="Check icon"
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Text Content */}
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 leading-snug">
                    {topic.title}
                  </h3>
                  {topic.subtitle && (
                    <p className="text-base md:text-lg text-gray-700 mt-1">
                      {topic.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
