'use client';

import { Presentation, Lightbulb, Building2 } from 'lucide-react';

const activities = [
  {
    icon: Presentation,
    title: 'সেমিনার ও ওয়ার্কশপ',
    description: 'দেশের বিভিন্ন অঞ্চলে সেমিনার, ওয়ার্কশপ ও ক্যারিয়ার টক',
  },
  {
    icon: Lightbulb,
    title: 'Skill Development',
    description: 'Motivation, Skill Development, Life Planning সেশন',
  },
  {
    icon: Building2,
    title: 'Campus Programs',
    description: 'IDEA Campus Programs – যারা জানতে চায়, বুঝতে চায়, এগিয়ে যেতে চায় তাদের জন্য',
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
