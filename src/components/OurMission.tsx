import React from 'react';
import Image from 'next/image';

export interface MissionCard {
  icon: string;
  title: string;
  description: string;
  bgColor: string;
}

interface OurMissionProps {
  title: string;
  subtitle: string;
  cards: MissionCard[];
}

const OurMission: React.FC<OurMissionProps> = ({ title, subtitle, cards }) => {
  return (
    <section className="py-20 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {title}
          </h2>
          <p className="text-base md:text-lg text-gray-600">
            {subtitle}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`${card.bgColor} rounded-3xl p-8 md:p-10 flex items-center gap-4 md:gap-6`}
            >
              {/* Icon */}
              <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center">
                <Image
                  src={card.icon}
                  alt={card.title}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-sm md:text-base text-gray-700">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurMission;
