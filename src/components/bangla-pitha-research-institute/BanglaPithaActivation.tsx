'use client';

import { ExternalLink, Globe } from 'lucide-react';
import VisionCard from '../ui/cards/VisionCard';

const activities = [
  {
    title: 'ঝাল পিঠা সিরিজ',
    category: 'Innovation',
  },
  {
    title: 'স্থানীয় উপকরণ দিয়ে গ্রিল-কনসেপ্ট পিঠা',
    category: 'Research',
  },
  {
    title: 'IDEA নাড়ু',
    category: 'Product',
  },
  {
    title: 'IDEA কাবাব',
    category: 'Fusion',
  },
  {
    title: 'মিষ্টি পিঠা সংগ্রহ',
    category: 'Traditional',
  },
  {
    title: 'Region-Wise পিঠা ডকুমেন্টেশন',
    category: 'Research',
  },
];

export default function BanglaPithaActivation() {
  return (
    <section className="py-10 md:py-14 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className=" mx-auto">
          {/* Section Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
            Activities & Creations
          </h2>

          {/* Cards Grid - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-blue-300 shadow-lg shadow-blue-200  p-5 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                {/* Icon */}
                <div className="shrink-0 mt-0.5">
                  <ExternalLink className="w-5 h-5 text-purple-600" />
                </div>

                {/* Text */}
                <p className="text-2xl font-bold text-slate-900">
                  {activity.title}
                  <span className="text-gray-500">({activity.category})</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-12 ">
        <VisionCard
          icon={<Globe className="w-16 h-16" />}
          title="Our Vision"
          subtitle='"Local to Global" – গ্রামের পিঠাকে বিশ্বমেলার স্টলে তোলার স্বপ্ন।'
        />
      </div>
    </section>



  );
}
