'use client';

import { Presentation, Lightbulb, Building2 } from 'lucide-react';

const activities = [
  {
    icon: Presentation,
    title: 'বিনামূল্যে বিভিন্ন সেমিনার ও ওয়ার্কশপের আয়োজন',
    description: 'শিক্ষার্থীদের আত্ম-উন্নয়ন ও দক্ষতা বৃদ্ধির লক্ষ্যে বিনামূল্যে নানান সেমিনার ও ওয়ার্কশপের আয়োজন করা হয়।',
  },
  {
    icon: Lightbulb,
    title: 'বিনামূল্যে ইন্টার্নশিপ আয়োজন',
    description: 'বিভিন্ন মেয়াদে বিনামূল্যে শিক্ষার্থীদের ইন্টার্নশিপের আওতায় এনে চাকরির বাজারে তাদের মানসিক ও কার্যকর দক্ষতা সাধন।',
  },
  {
    icon: Building2,
    title: ' বিনামূল্যে সফট স্কিল ডেভেলপমেন্ট কোর্স',
    description: 'পাবলিক স্পিকিং, প্রেজেন্টেশন, ভিডিও এডিটিং সহ একাধিক সফট স্কিল সম্পূর্ণ বিনামূল্যে শেখানোর হয় এই কোর্সের মাধ্যমে। ',
  },
];

export default function WhatWeDo() {
  return (
    <section className="py-20 md:py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className=" mx-auto">
          {/* Section Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
            What We Do
          </h2>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activities.map((activity, index) => {
              const IconComponent = activity.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {activity.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base text-gray-600 leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
