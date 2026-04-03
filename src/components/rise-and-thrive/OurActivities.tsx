"use client"

import { motion } from "motion/react"
import { Star } from "lucide-react"

export default function OurActivities() {
  const activities = [
    {
      title: "ইতোমধ্যে যশোরে ৭টি দিনব্যাপী Rise & Thrive সেশন সফলভাবে সম্পন্ন হয়েছে, যেখানে প্রায় ৭০০+ শিক্ষার্থী, অভিভাবক ও পেশাজীবী অংশগ্রহণ করেছেন এবং আত্ম-উন্নয়নের প্র্যাক্টিক্যাল দিকনির্দেশনা পেয়েছেন।"
    },
    {
      title: "Rise & Thrive Barishal — \"The Foundation of Youth Mind Programming\" শিরোনামে বরিশাল বি. এম. কলেজের আমন্ত্রণে তাদের শিক্ষার্থীদের জন্য বিশেষ সেশন আয়োজন।"
    },
    {
      title: "Youth & Cultural Forum, Jashore এর উদ্যোগে কর্মীদের জন্য মাইন্ড প্রোগ্রামিং ও দিকনির্দেশনামূলক সেশন পরিচালনা।"
    },
    {
      title: "\"Reshaping Your Mind Map\" শিরোনামে শিক্ষার্থীদের জন্য মোটিভেশনাল সেশন।"
    },
    {
      title: "\"সঠিক নিয়মে লেখাপড়া\" বিষয়ক শিক্ষার্থীদের জন্য অনলাইন সেশন পরিচালনা।"
    },
    {
      title: "পেশাজীবীদের জন্য \"Stress Management\" বিষয়ক বিশেষ সেশন আয়োজন।"
    }
  ]

  return (
    <section className="py-10 md:py-12 lg:pt-12 lg:pb-4  bg-linear-to-b from-white to-purple-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Activities
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-purple-500 to-purple-600 mx-auto"></div>
        </motion.div>

        {/* Activities List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              className="bg-white border-2 border-purple-200 rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, borderColor: "#a855f7" }}
            >
              <div className="flex items-start gap-4">
                {/* Star Icon */}
                <div className="shrink-0 mt-1">
                  <Star className="w-6 h-6 text-purple-600 fill-purple-600" />
                </div>

                {/* Activity Text */}
                <div className="flex-1">
                  <p className="text-gray-800 text-base md:text-lg leading-relaxed font-medium">
                    {activity.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
