"use client"

import { motion } from "motion/react"

export default function WhoIsItFor() {
  const targetAudience = [
    {
      text: "যারা হতাশা, Lack Of Focus, Fear থেকে বের হতে চান"
    },
    {
      text: "চাকরি/ব্যবসায় নিরোয়েজিত পেশাজীবী"
    },
    {
      text: "শিক্ষক ও অভিভাবক"
    },
    {
      text: "১২+ বয়সী শিক্ষার্থী"
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 ">
        {/* First Row - Flex Layout with 3 items */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start mb-6 lg:mb-8">
          {/* Left Card */}
          <motion.div
            className="flex-1 bg-white border border-gray-200 rounded-2xl mt-16 p-8 md:p-10 shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-shadow duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0 }}
            whileHover={{ y: -5 }}
          >
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 text-center leading-relaxed">
              {targetAudience[0].text}
            </p>
          </motion.div>

          {/* Center Heading - aligned higher */}
          <motion.div 
            className="flex-1 flex flex-col justify-start pt-12 md:pt-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 text-center">
              Who Is It For?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 text-center">
              এই প্রোগ্রাম কাদের জন্য
            </p>
          </motion.div>

          {/* Right Card */}
          <motion.div
            className="flex-1 bg-white border border-gray-200 rounded-2xl p-8 mt-16 md:p-10 shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-shadow duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 text-center leading-relaxed">
              {targetAudience[1].text}
            </p>
          </motion.div>
        </div>

        {/* Second Row - Grid with 2 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Third Card */}
          <motion.div
            className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-shadow duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 text-center leading-relaxed">
              {targetAudience[2].text}
            </p>
          </motion.div>

          {/* Fourth Card */}
          <motion.div
            className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-shadow duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -5 }}
          >
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 text-center leading-relaxed">
              {targetAudience[3].text}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
