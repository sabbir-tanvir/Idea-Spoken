"use client"

import { motion } from "motion/react"
import Image from "next/image"

export default function WhatYouWillLearn() {
  const benefitsData = [
    {
      category: "★ For Students",
      items: [
        { 
          title: "মনোযোগ ও ফোকাস বৃদ্ধি",
          desc: "বিক্ষিপ্ত মনোযোগ নিয়ন্ত্রণ করে দীর্ঘ সময় কার্যকরভাবে পড়াশোনা বা যেকোনো গুরুত্বপূর্ণ কাজে মনোযোগ ধরে রাখার কৌশল শেখানো হয়।"
        },
        { 
          title: "স্মৃতিশক্তি ও কার্যকর শেখার কৌশল",
          desc: "তথ্য দ্রুত মনে রাখা, দীর্ঘদিন সংরক্ষণ করা এবং পরীক্ষার সময় সহজে স্মরণ করার জন্য বিভিন্ন মেমোরি টেকনিক ও শেখার পদ্ধতি অনুশীলন করা হয়।"
        },
        { 
          title: "আত্মবিশ্বাস ও ইতিবাচক মানসিকতা",
          desc: "নিজের সক্ষমতার উপর বিশ্বাস তৈরি, ভয় ও দ্বিধা কাটিয়ে ওঠা এবং লক্ষ্যভিত্তিক মানসিকতা গড়ে তোলার বাস্তবধর্মী দিকনির্দেশনা দেওয়া হয়।"
        },
        { 
          title: "শিক্ষার্থী–অভিভাবক সম্পর্ক উন্নয়ন",
          desc: "পারস্পরিক বোঝাপড়া, কার্যকর যোগাযোগ এবং ইতিবাচক পারিবারিক সহযোগিতার মাধ্যমে শেখার অনুকূল পরিবেশ তৈরি করার বিষয়ে আলোচনা করা হয়।"
        },
      ]
    },
    {
      category: "★ For Parents",
      items: [
        { 
          title: "সন্তানের মানসিকতা বুঝতে শেখা",
          desc: "বয়সভেদে সন্তানের মানসিক পরিবর্তন, শেখার ধরন এবং প্রয়োজনগুলো বোঝার কার্যকর দৃষ্টিভঙ্গি তুলে ধরা হয়।"
        },
        { 
          title: "কার্যকর অভিভাবকত্ব",
          desc: "অতিরিক্ত চাপ বা ভয় নয়, বরং উৎসাহ, সহযোগিতা এবং ইতিবাচক যোগাযোগের মাধ্যমে সন্তানকে এগিয়ে নেওয়ার বাস্তব কৌশল শেয়ার করা হয়।"
        },
        { 
          title: "সুস্থ পারিবারিক সম্পর্ক গড়ে তোলা",
          desc: "পরিবারে পারস্পরিক সম্মান, আস্থা এবং ইতিবাচক পরিবেশ তৈরির মাধ্যমে সন্তানদের মানসিক বিকাশে সহায়ক ভূমিকা রাখার বিষয়ে দিকনির্দেশনা দেওয়া হয়।"
        },
      ]
    },
    {
      category: "★ For Professionals & Entrepreneurs",
      items: [
        { 
          title: "মানসিক চাপ ও ক্লান্তি ব্যবস্থাপনা",
          desc: "ব্যস্ত কর্মজীবনে মানসিক চাপ নিয়ন্ত্রণ, আবেগের ভারসাম্য বজায় রাখা এবং সুস্থ মানসিক অভ্যাস গড়ে তোলার উপায় শেখানো হয়।"
        },
        { 
          title: "ফোকাস ও উৎপাদনশীলতা বৃদ্ধি",
          desc: "সময় ও মনোযোগকে কার্যকরভাবে কাজে লাগিয়ে ব্যক্তিগত এবং পেশাগত পারফরম্যান্স উন্নত করার কৌশল নিয়ে কাজ করা হয়।"
        },
        { 
          title: "আত্মবিশ্বাস ও মাইন্ডসেট ডেভেলপমেন্ট",
          desc: "চ্যালেঞ্জ মোকাবিলা, সিদ্ধান্ত গ্রহণ এবং দীর্ঘমেয়াদি লক্ষ্য অর্জনের জন্য প্রয়োজনীয় মানসিক প্রস্তুতি ও আত্মবিশ্বাস তৈরিতে সহায়তা করা হয়।"
        },
        { 
          title: "লক্ষ্য অর্জনের পরিকল্পনা",
          desc: "লক্ষ্য নির্ধারণ, পরিকল্পনা বাস্তবায়ন এবং ধারাবাহিক উন্নয়নের জন্য ধাপে ধাপে অনুসরণযোগ্য বাস্তবভিত্তিক কৌশল শেখানো হয়।"
        },
      ]
    }
  ]

  return (
    <section className="relative py-20 md:py-24 lg:py-32 overflow-hidden">
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
            What You'll Learn?
          </h2>
        </motion.div>

        {/* Learning Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-start">
          {benefitsData.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.2 }}
              className="flex flex-col h-full"
            >
              {/* Category Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center md:text-left">
                {section.category}
              </h3>

              {/* Benefits List */}
              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    className="bg-white/95 backdrop-blur-md border-2 border-purple-200 rounded-xl p-5 shadow-md shadow-blue-100/50 hover:shadow-xl hover:shadow-purple-200/50 hover:border-purple-300 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: itemIndex * 0.08 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Check Icon */}
                      <div className="shrink-0 w-7 h-7 relative mt-1">
                        <Image
                          src="/home/add_task.png"
                          alt="Check icon"
                          fill
                          className="object-contain"
                        />
                      </div>

                      {/* Text Content */}
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-800 leading-snug mb-2">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed font-medium">
                          {item.desc}
                        </p>
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
