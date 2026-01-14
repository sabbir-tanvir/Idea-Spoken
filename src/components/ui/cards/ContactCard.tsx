"use client";

import { motion } from "motion/react";
import Link from "next/link";
import React from "react";

interface ContactCardProps {
  title: string;
  subtitle: string;
  buttonLabel: string;
  buttonHref: string;
  buttonTarget?: string;
  backgroundClassName?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({
  title,
  subtitle,
  buttonLabel,
  buttonHref,
  buttonTarget,
  backgroundClassName = "bg-purple-200"
}) => {
  return (
    <section className={`py-20 md:py-24 lg:py-32 ${backgroundClassName}`}>
      <div className="container mx-auto px-4">
        <motion.div
          className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 mx-auto text-center shadow-[0_15px_60px_rgba(124,58,237,0.15)]"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-8">
            {subtitle}
          </p>

          <Link
            href={buttonHref}
            target={buttonTarget}
            rel={buttonTarget === "_blank" ? "noopener noreferrer" : undefined}
          >
            <motion.button
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-purple-600 text-white rounded-lg font-semibold text-base md:text-lg hover:bg-purple-700 transition-colors duration-300"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.97 }}
              type="button"
            >
              {buttonLabel}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCard;
