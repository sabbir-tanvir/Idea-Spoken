'use client';

import React from 'react';

const innovations = [
  { title: 'ঝাল পিঠা সবজি লতিকা', badge: 'উদ্ভাবন' },
  { title: 'গরমে- কুলফি পিঠা', badge: 'উদ্ভাবন' },
  { title: 'হৃদয়হরণ', badge: 'ঐতিহ্যবাহী' },
  { title: 'চিকেন পাটিসাপটা', badge: 'ফিউশন' },
  { title: 'বৈশাখী পিঠা', badge: 'উৎসব' },
  { title: 'দোলন', badge: 'বিশেষ' },
  { title: 'আইডিয়া রোজ', badge: 'উদ্ভাবন' },
  { title: 'আইডিয়া নাড়ু', badge: 'সিগনেচার' },
  { title: 'আইডিয়া বাঁশ কাবাব ও বাঁশ চা', badge: 'ফিউশন' },
  { title: 'ফুচকা পাকান', badge: 'উদ্ভাবন' },
  { title: 'সাবুর নাড়ু', badge: 'স্বাস্থ্যকর' },
  { title: 'ঝাল পাকান', badge: 'স্পাইসি' },
  { title: 'ঝাল ভাপা', badge: 'উদ্ভাবন' },
];

export default function BanglaPithaInovation() {
  return (
    <section className="py-10 md:py-14 lg:py-18 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Title & Subtitle */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Our Innovations
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            বাংলাদেশ পিঠা গবেষণা ইন্সটিটিউট এর আওতায় দেশের ৮ টি বিভাগে বিভাগীয় কমিটি গঠন করা হয়। দেশের বিভিন্ন স্থানে এলাকাভিত্তিক গবেষণা চলছে এর আওতায়।
          </p>
        </div>

        {/* Innovations Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {innovations.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center hover:border-purple-300 hover:shadow-md transition-all duration-300 flex flex-col items-center justify-between"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {item.title}
              </h3>
              <span className="inline-block px-4 py-1 bg-purple-100 text-purple-600 text-sm font-medium rounded-full">
                {item.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
