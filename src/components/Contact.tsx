"use client"

import { motion } from "motion/react"
import Link from "next/link"

export default function Contact() {
  return (
    <section className="py-20 md:py-24 lg:py-32 bg-purple-200">
      <div className="container mx-auto px-4">
        <motion.div
          className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 max-w-8xl mx-auto text-center shadow-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
            Registration & Contact
          </h2>

          {/* Phone Number */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            <a 
              href="tel:+8801616031402" 
              className="text-xl md:text-2xl text-purple-600 font-semibold hover:text-purple-700 transition-colors"
            >
              +8801616031402
            </a>
          </div>

          {/* Register Button */}
          <Link href="/contact">
            <motion.button
              className="inline-flex items-center gap-3 px-8 py-4 bg-purple-600 text-white rounded-full font-semibold text-lg hover:bg-purple-700 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register For Next Workshop
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
