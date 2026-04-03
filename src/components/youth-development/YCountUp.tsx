"use client"

import { motion } from "motion/react"
import CountUp from 'react-countup'

export default function CountUpSection() {
  const stats = [
    {
      end: 10000,
      suffix: "+",
      label: "যুবক প্রশিক্ষিত",
      duration: 2.5
    },
    {
      end: 500,
      suffix: "+",
      label: "সেমিনার সম্পন্ন",
      duration: 2
    },
    {
      end: 64,
      suffix: "",
      label: "জেলার কার্যক্রম",
      duration: 1.5
    },
    {
      end: 9,
      suffix: "%",
      label: "বছরের অভিজ্ঞতা",
      duration: 2.5
    }
  ]

  return (
    <section className="bg-gray-50 py-6 md:py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="mb-2">
                <CountUp
                  end={stat.end}
                  suffix={stat.suffix}
                  duration={stat.duration}
                  enableScrollSpy
                  scrollSpyOnce
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-600"
                />
              </div>
              <p className="text-sm md:text-base text-gray-600 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
