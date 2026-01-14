"use client";

import { motion } from "motion/react";
import React from "react";

export interface ReviewItem {
  review: string;
  name: string;
  location: string;
}

interface ReviewProps {
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
  reviews: ReviewItem[];
}

const Review: React.FC<ReviewProps> = ({ icon, title, subtitle, reviews }) => {
  return (
    <section className="py-20 md:py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="relative bg-white rounded-3xl shadow-lg p-8 md:p-12 lg:p-16 overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Top Left Quarter Circle */}
          <div className="absolute top-0 left-0 w-32 md:w-48 h-32 md:h-48 bg-purple-200 rounded-br-full"></div>
          
          {/* Bottom Right Quarter Circle */}
          <div className="absolute bottom-0 right-0 w-32 md:w-48 h-32 md:h-48 bg-purple-200 rounded-tl-full"></div>

          {/* Heading */}
          <div className="text-center mb-12 relative z-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              {icon && <div className="text-purple-600">{icon}</div>}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                {title}
              </h2>
            </div>
            <p className="text-base md:text-lg text-gray-600">
              {subtitle}
            </p>
          </div>

          {/* Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 md:p-8 border-2 border-purple-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -3 }}
              >
                {/* Quote */}
                <div className="mb-4">
                  <svg className="w-8 h-8 text-purple-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                  </svg>
                </div>

                {/* Review Text */}
                <p className="text-base md:text-lg text-gray-800 font-medium mb-6 leading-relaxed">
                  "{review.review}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{review.name}</p>
                    <p className="text-sm text-gray-600">{review.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Review;
