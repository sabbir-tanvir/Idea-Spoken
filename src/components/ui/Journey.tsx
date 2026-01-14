import React from 'react';

export interface JourneyItem {
  year: string;
  title: string;
  description: string;
}

interface JourneyProps {
  title: string;
  subtitle: string;
  journeyItems: JourneyItem[];
}

const Journey: React.FC<JourneyProps> = ({ title, subtitle, journeyItems }) => {
  return (
    <section className="py-20 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {title}
          </h2>
          <p className="text-base md:text-lg text-gray-600">
            {subtitle}
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto flex justify-center items-center">
          <div className="relative">
            {/* Timeline Items */}
            <div className="space-y-0">
              {journeyItems.map((item, index) => (
                <div key={index} className="relative">
                  {/* Item Content */}
                  <div className="relative flex items-start gap-6 md:gap-8 pb-12">
                    {/* Year */}
                    <div className="flex-shrink-0 w-[60px] md:w-[80px] text-right">
                      <span className="text-xl md:text-2xl font-bold text-gray-900">
                        {item.year}
                      </span>
                    </div>

                    {/* Dot Container */}
                    <div className="flex-shrink-0 relative flex flex-col items-center">
                      {/* Dot */}
                      <div className="w-5 h-5 bg-purple-600 rounded-full z-10"></div>
                      
                      {/* Dotted Line Below (only if not last item) */}
                      {index < journeyItems.length - 1 && (
                        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-[2px] h-[calc(100%+3rem)] border-l-2 border-dashed border-purple-300"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-0">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
