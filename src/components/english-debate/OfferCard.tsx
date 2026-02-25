"use client";

import { useState } from "react";
import { EnglishDebateData } from "@/lib/api";
import { ApiCourseDetail } from "@/lib/api/courses";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PaymentModal from "@/components/ui/PaymentModal";

interface OfferCardProps {
    data: EnglishDebateData;
    courseDetail?: ApiCourseDetail | null;
}

export default function OfferCard({ data, courseDetail }: OfferCardProps) {
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    if (!data.offer) return null;

    const title = courseDetail?.title ?? data.offer.title;
    const subtitle = courseDetail?.description ?? data.offer.subtitle;
    const discountedPrice = courseDetail?.price ? `৳${courseDetail.price}` : data.offer.discountedPrice;

    return (
        <section className="bg-white w-full pb-20 px-4 md:px-8">
            <div className="container mx-auto">
                <motion.div
                    className="relative bg-white rounded-3xl shadow-lg border border-purple-100 overflow-hidden mx-auto p-8 md:p-12 lg:p-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Decorative Background Circles */}
                    {/* Top Left Quarter Circle */}
                    <div className="absolute top-0 left-0 w-32 md:w-48 h-32 md:h-48 bg-purple-200 rounded-br-full"></div>

                    {/* Bottom Right Quarter Circle */}
                    <div className="absolute bottom-0 right-0 w-32 md:w-48 h-32 md:h-48 bg-purple-200 rounded-tl-full"></div>

                    {/* Content */}
                    <div className="relative z-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                            {title}
                        </h2>
                        <p className="text-slate-500 mb-8 max-w-lg mx-auto">
                            {subtitle}
                        </p>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                            {/* Price */}
                            <div className="text-center md:text-left">
                                <div className="text-slate-400 text-lg line-through decoration-slate-400 decoration-1">
                                    {data.offer.originalPrice}
                                </div>
                                <div className="text-4xl md:text-5xl font-bold text-slate-900">
                                    {discountedPrice}
                                </div>
                                <div className="text-xs text-slate-400 mt-1">
                                    {data.offer.paymentText}
                                </div>
                            </div>

                            {/* CTA Button */}
                            <button
                                onClick={() => setIsPaymentOpen(true)}
                                className="w-full md:w-auto cursor-pointer"
                            >
                                <motion.div
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-200 text-purple-900 rounded-xl font-bold text-lg hover:bg-purple-300 transition-colors duration-300 w-full md:w-auto"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {data.offer.buttonText}
                                    <ArrowRight className="w-5 h-5" />
                                </motion.div>
                            </button>
                        </div>
                    </div>

                    <PaymentModal
                        isOpen={isPaymentOpen}
                        onClose={() => setIsPaymentOpen(false)}
                        courseName={title}
                        courseId={courseDetail?.id ?? 0}
                        amount={courseDetail?.price ? Number(courseDetail.price) : 2500}
                    />
                </motion.div>
            </div>
        </section>
    );
}
