"use client";

import { EnglishDebateData } from "@/lib/api";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface OfferCardProps {
    data: EnglishDebateData;
}

export default function OfferCard({ data }: OfferCardProps) {
    if (!data.offer) return null;

    return (
        <section className="bg-white w-full pb-20 px-4 md:px-8">
            <div className="container mx-auto">
                <motion.div
                    className="relative bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-purple-100 overflow-hidden mx-auto p-8 md:p-12 py-10 px-10 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Decorative Background Circles */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 translate-x-1/2 translate-y-1/2"></div>

                    {/* Content */}
                    <div className="relative z-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                            {data.offer.title}
                        </h2>
                        <p className="text-slate-500 mb-8 max-w-lg mx-auto">
                            {data.offer.subtitle}
                        </p>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                            {/* Price */}
                            <div className="text-center md:text-left">
                                <div className="text-slate-400 text-lg line-through decoration-slate-400 decoration-1">
                                    {data.offer.originalPrice}
                                </div>
                                <div className="text-4xl md:text-5xl font-bold text-slate-900">
                                    {data.offer.discountedPrice}
                                </div>
                                <div className="text-xs text-slate-400 mt-1">
                                    {data.offer.paymentText}
                                </div>
                            </div>

                            {/* CTA Button */}
                            <Link href="#" className="w-full md:w-auto">
                                <motion.div
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-200 text-purple-900 rounded-xl font-bold text-lg hover:bg-purple-300 transition-colors duration-300 w-full md:w-auto cursor-pointer"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {data.offer.buttonText}
                                    <ArrowRight className="w-5 h-5" />
                                </motion.div>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
