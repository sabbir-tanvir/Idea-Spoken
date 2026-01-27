"use client";

import { ActivitiesData } from "@/lib/api";
import { motion } from "framer-motion";
import { Users, Handshake, Map, Calendar } from "lucide-react";

interface AmaderKarjokromProps {
    data: ActivitiesData;
}

const getIcon = (iconName: string) => {
    switch (iconName) {
        case "users": return <Users className="w-7 h-7" />;
        case "handshake": return <Handshake className="w-7 h-7" />;
        case "map": return <Map className="w-7 h-7" />;
        case "calendar": return <Calendar className="w-7 h-7" />;
        default: return <Users className="w-7 h-7" />;
    }
};

export default function AmaderKarjokrom({ data }: AmaderKarjokromProps) {
    if (!data) return null;

    return (
        <section
            className="py-20 bg-white md:py-32 px-4 relative"
        >
            {/* Overlay */}

            <div className="container mx-auto relative z-10">
                {/* Title */}
                <motion.h2
                    className="text-3xl md:text-4xl lg:text-6xl font-bold text-purple-800 text-center mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {data.title}
                </motion.h2>

                {/* Description */}
                <motion.p
                    className="text-slate-600 text-center max-w-3xl mx-auto mb-16 text-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    {data.description}
                </motion.p>

                {/* Stats Bar */}
                <motion.div
                    className="rounded-full py-8 px-8 md:px-16 max-w-5xl mx-auto"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    style={{
                        backgroundImage: `url('/images/map.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {data.stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="flex items-center gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + (index * 0.1) }}
                            >
                                {/* Icon */}
                                <div className="w-14 h-14 rounded-full bg-purple-300/50 flex items-center justify-center text-purple-700 shrink-0">
                                    {getIcon(stat.icon)}
                                </div>

                                {/* Text */}
                                <div>
                                    <div className="text-2xl md:text-3xl font-bold text-slate-800">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-slate-600 font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
