"use client";

import React from 'react';
import Link from 'next/link';

interface Button {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
  target?: string;
}

interface EventProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  buttons: Button[];
  backgroundClassName?: string;
}

const Event: React.FC<EventProps> = ({
  icon,
  title,
  subtitle,
  buttons,
  backgroundClassName = "bg-purple-200"
}) => {
  return (
    <section className={`py-20 md:py-24 lg:py-32 ${backgroundClassName}`}>
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 max-w-5xl mx-auto shadow-lg">
          {/* Header with Icon and Title */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <div className="text-white">
                {icon}
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {title}
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-gray-600 mb-8">
            {subtitle}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {buttons.map((button, index) => (
              <Link
                key={index}
                href={button.href}
                target={button.target}
                rel={button.target === "_blank" ? "noopener noreferrer" : undefined}
              >
                <button
                  className={`
                    inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 
                    rounded-full font-semibold text-base md:text-lg transition-all duration-300
                    ${button.variant === 'primary' 
                      ? 'bg-purple-600 text-white hover:bg-purple-700' 
                      : 'bg-transparent border-2 border-purple-600 text-purple-600 hover:bg-purple-50'
                    }
                  `}
                >
                  {button.label}
                  {button.variant === 'primary' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  )}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Event;
