"use client";

import { WingCardData } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

interface IdeaCardProps {
    wing: WingCardData;
}

export default function IdeaCard({ wing }: IdeaCardProps) {
    const [imageError, setImageError] = useState(false);
    
    // Determine the correct link path
    const href = wing.slug.startsWith('/') ? wing.slug : `/${wing.slug}`;

    return (
        <div className="bg-[#f7f4f4] border border-red-200 gap-4 min-h-[420px] h-full p-7 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
            {/* Image */}
            <div className="relative h-50 w-full rounded-md overflow-hidden mb-4">
                {!imageError ? (
                    <Image
                        src={wing.image}
                        alt={wing.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-full bg-linear-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                        <div className="text-center text-slate-400">
                            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                )}
            </div>

            {/* Title */}
            <h3 className="text-lg md:text-3xl font-bold pr-24 text-slate-900 mb-4 line-clamp-2">
                {wing.title}
            </h3>

            {/* Description */}
            <p className="text-xl text-slate-600 mb-4 pr-20 line-clamp-2">
                {wing.description}
            </p>

            {/* Read More Button */}
            <Link 
                href={href}
                className="inline-flex items-center justify-between gap-2 px-5 pr-0 rounded-full bg-[#e8e3ff] text-purple-600 font-medium text-lg transition-all duration-300 hover:bg-purple-100 group/btn"
            >
                Read More
                <span className="inline-flex ml-auto items-center justify-center w-12 h-12 rounded-full bg-[#ddd8f3] text-purple-600 border border-purple-100 ">
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </span>
            </Link>
        </div>
    );
}
