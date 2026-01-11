"use client"

import { motion } from "motion/react"
import { ReactNode } from "react"

interface ResearchCard {
  icon: ReactNode
  title: string
  subtitle: string
}

interface ResearchAreaProps {
  heading: string
  subheading: string
  cards: ResearchCard[]
}

export default function ResearchArea({ heading, subheading, cards }: ResearchAreaProps) {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 ">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            {heading}
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            {subheading}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="bg-white border-2 border-purple-200 rounded-2xl p-8 text-center shadow-lg shadow-blue-100 hover:shadow-xl hover:shadow-blue-200 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-purple-600 rounded-2xl flex items-center justify-center">
                  {card.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                {card.title}
              </h3>

              {/* Subtitle */}
              <p className="text-base md:text-lg text-gray-600">
                {card.subtitle}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
