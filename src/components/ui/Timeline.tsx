"use client";

import { TimelineEvent } from "@/lib/api";
import { motion } from "framer-motion";
import { Sprout, Flag, BookOpen, Laptop, GraduationCap, X } from "lucide-react";

interface TimelineProps {
  events: TimelineEvent[];
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "seedling": return <Sprout className="w-6 h-6" />;
    case "flag": return <Flag className="w-6 h-6" />;
    case "book": return <BookOpen className="w-6 h-6" />;
    case "laptop": return <Laptop className="w-6 h-6" />;
    case "graduation": return <GraduationCap className="w-6 h-6" />;
    default: return <X className="w-6 h-6" />;
  }
};

export default function Timeline({ events }: TimelineProps) {
  if (!events || events.length === 0) return null;

  return (
    <section
      className="py-20 md:py-32 relative"
      style={{
        backgroundImage: `url('/images/map.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 "></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="inline-block text-3xl md:text-4xl font-bold text-slate-800 border-b-4 border-purple-300 pb-2">
            Our Journey
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-purple-400 transform -translate-x-1/2"></div>

          {events.map((event, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={index}
                className={`relative flex items-center justify-center mb-16 last:mb-0`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Left Content */}
                <div className={`w-5/12 flex items-center ${isLeft ? 'justify-end' : 'invisible'}`}>
                  {isLeft && (
                    <>
                      <div className="text-right pr-4">
                        <span className="text-2xl md:text-3xl font-bold text-slate-600">{event.year}</span>
                        <h3 className="text-lg md:text-xl font-bold text-purple-700 mt-1">{event.title}</h3>
                        <p className="text-sm text-slate-500 mt-2">{event.description}</p>
                      </div>
                      {/* Dotted Line Connector */}
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                        <div className="w-16 md:w-24 border-t-2 border-dashed border-purple-400"></div>
                      </div>
                    </>
                  )}
                </div>

                {/* Icon */}
                <div className="z-10">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-purple-100 border-2 border-purple-200 flex items-center justify-center text-purple-600 shadow-lg">
                    {getIcon(event.icon)}
                  </div>
                </div>

                {/* Right Content */}
                <div className={`w-5/12 flex items-center ${!isLeft ? 'justify-start' : 'invisible'}`}>
                  {!isLeft && (
                    <>
                      {/* Dotted Line Connector */}
                      <div className="flex items-center">
                        <div className="w-16 md:w-24 border-t-2 border-dashed border-purple-400"></div>
                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      </div>
                      <div className="text-left pl-4">
                        <span className="text-2xl md:text-3xl font-bold text-slate-600">{event.year}</span>
                        <h3 className="text-lg md:text-xl font-bold text-purple-700 mt-1">{event.title}</h3>
                        <p className="text-sm text-slate-500 mt-2">{event.description}</p>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
