import React from 'react';

export interface Highlight {
  year: string;
  title: string;
  description: string;
}

interface KeyHighlightsProps {
  title: string;
  subtitle: string;
  highlights: Highlight[];
}

const KeyHighlights: React.FC<KeyHighlightsProps> = ({
  title,
  subtitle,
  highlights
}) => {
  return (
    <section className="pt-20 md:pt-24 lg:pt-32 pb-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {title}
          </h2>
          <p className="text-gray-600 text-lg">
            {subtitle}
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto space-y-6">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="flex items-start gap-6 bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Year Badge */}
              <div className="flex-shrink-0">
                <div className="bg-purple-500 text-white font-bold text-lg px-6 py-3 rounded-xl min-w-[80px] min-h-[80px] text-center justify-center flex items-center">
                  {highlight.year}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {highlight.title}
                </h3>
                <p className="text-gray-600">
                  {highlight.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyHighlights;
