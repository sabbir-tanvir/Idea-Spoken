"use client";

import { useState } from "react";
import { ApiCourseDetail } from "@/lib/api/courses";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PaymentModal from "@/components/ui/PaymentModal";

interface CourseOfferProps {
    courseDetail?: ApiCourseDetail | null;
}

export default function CourseOffer({ courseDetail }: CourseOfferProps) {
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    const title = courseDetail?.title ?? "Ready to Get Started?";
    const subtitle =
        courseDetail?.description ??
        "Enroll now and start your learning journey with expert-guided content and hands-on practice.";
    const salePriceVal = courseDetail?.salePrice ?? (courseDetail as any)?.selePrice ?? (courseDetail as any)?.selesPrice ?? (courseDetail as any)?.salesPrice;
    const hasSale = salePriceVal != null && salePriceVal !== "";
    const displayPrice = hasSale ? `৳${salePriceVal}` : (courseDetail?.price ? `৳${courseDetail.price}` : "৳2,500");
    const originalPrice = courseDetail?.price ? `৳${courseDetail.price}` : null;

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
                    {/* Top-left quarter circle */}
                    <div className="absolute top-0 left-0 w-32 md:w-48 h-32 md:h-48 bg-purple-200 rounded-br-full"></div>

                    {/* Bottom-right quarter circle */}
                    <div className="absolute bottom-0 right-0 w-32 md:w-48 h-32 md:h-48 bg-purple-200 rounded-tl-full"></div>

                    {/* Content */}
                    <div className="relative z-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                            {title}
                        </h2>
                        <p className="text-slate-500 mb-8 max-w-lg mx-auto">{subtitle}</p>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                            {/* Price */}
                            <div className="text-center md:text-left flex flex-col items-center md:items-start">
                                <div className="flex items-end gap-3 justify-center md:justify-start">
                                    {hasSale && <span className="text-xl font-medium text-slate-400 line-through mb-1">{originalPrice}</span>}
                                    <div className="text-4xl md:text-5xl font-bold text-slate-900">
                                        {displayPrice}
                                    </div>
                                </div>
                                <div className="text-xs text-slate-400 mt-1">
                                    One-time payment
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
                                    Enroll Now
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
                        amount={hasSale ? Number(salePriceVal) : (courseDetail?.price ? Number(courseDetail.price) : 2500)}
                    />
                </motion.div>
            </div>
        </section>
    );
}
