"use client"

import { motion } from "motion/react"

export default function UpcomingWorkshop() {
  const workshops = [
    {
      title: "Rise And Thrive – Dhaka",
      date: "১৫ নভেম্বর ২০২৪",
      location: "পূর্বাচল",
      participants: "250+ অংশগ্রহণকারী"
    },
    {
      title: "Rise And Thrive – Dhaka",
      date: "১৫ নভেম্বর ২০২৪",
      location: "পূর্বাচল",
      participants: "250+ অংশগ্রহণকারী"
    },
    {
      title: "Rise And Thrive – Dhaka",
      date: "১৫ নভেম্বর ২০২৪",
      location: "পূর্বাচল",
      participants: "250+ অংশগ্রহণকারী"
    },
    {
      title: "Rise And Thrive – Dhaka",
      date: "১৫ নভেম্বর ২০২৪",
      location: "পূর্বাচল",
      participants: "250+ অংশগ্রহণকারী"
    }
  ]

  return (
    <section className="py-20 md:py-24 lg:py-32 bg-purple-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            Upcoming Workshops
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            আসন্ন ওয়ার্কশপসমূহ
          </p>
        </motion.div>

        {/* Workshop Cards */}
        <div className="space-y-6">
          {workshops.map((workshop, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                {/* Calendar Icon */}
                <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 bg-purple-600 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
                  </svg>
                </div>

                {/* Workshop Details */}
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                    {workshop.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-600">
                    {/* Date */}
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{workshop.date}</span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{workshop.location}</span>
                    </div>

                    {/* Participants */}
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>{workshop.participants}</span>
                    </div>
                  </div>
                </div>

                {/* Register Button */}
                <div className="flex-shrink-0 w-full md:w-auto">
                  <motion.button
                    className="w-full md:w-auto px-8 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Register
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
