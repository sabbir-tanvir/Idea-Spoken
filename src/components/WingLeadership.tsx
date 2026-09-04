"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { UserCheck } from "lucide-react";

export interface Leader {
  name: string;
  role: string;
  designation: string;
  image: string;
}

interface WingLeadershipProps {
  title?: string;
  subtitle?: string;
  leaders: Leader[];
}

export default function WingLeadership({
  title = "সংগঠনের নেতৃত্ব",
  subtitle = "আইডিয়া সমাজকল্যাণ সংস্থার পরিচালনা ও দিকনির্দেশনায় নিয়োজিত সুধিজন",
  leaders,
}: WingLeadershipProps) {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-purple-50/40 to-slate-50 relative overflow-hidden">
      {/* Background Decorative Blur Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-sm font-semibold mb-4">
            <UserCheck className="w-4 h-4 text-purple-600" />
            Leadership & Guidance
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Leaders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-stretch">
          {leaders.map((leader, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group bg-white rounded-3xl border border-purple-100 shadow-lg shadow-purple-500/5 hover:shadow-2xl hover:shadow-purple-500/15 transition-all duration-300 overflow-hidden flex flex-col items-center text-center p-6 md:p-8 relative"
            >
              {/* Top Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600" />

              {/* Leader Image Container */}
              <div className="relative w-40 h-40 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-purple-100 group-hover:border-purple-500 transition-colors duration-300 shadow-md mb-6 shrink-0 mt-2">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  sizes="(max-width: 768px) 160px, 176px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Role Badge */}
              <span className="inline-block px-3.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold uppercase tracking-wider mb-3">
                {leader.role}
              </span>

              {/* Leader Name */}
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 group-hover:text-purple-700 transition-colors">
                {leader.name}
              </h3>

              {/* Leader Designation */}
              <p className="text-sm md:text-base font-medium text-slate-600 mt-auto leading-relaxed">
                {leader.designation}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
