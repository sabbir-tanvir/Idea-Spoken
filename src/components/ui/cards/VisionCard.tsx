import React from 'react';

interface VisionCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const VisionCard: React.FC<VisionCardProps> = ({ icon, title, subtitle }) => {
  return (
    <div className="relative bg-white rounded-3xl shadow-lg p-8 md:p-12 overflow-hidden">
      {/* Top Left Quarter Circle */}
      <div className="absolute top-0 left-0 w-32 md:w-48 h-32 md:h-48 bg-purple-200 rounded-br-full"></div>
      
      {/* Bottom Right Quarter Circle */}
      <div className="absolute bottom-0 right-0 w-32 md:w-48 h-32 md:h-48 bg-purple-200 rounded-tl-full"></div>

      {/* Content */}
      <div className="text-center relative z-10">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="text-purple-600">
            {icon}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {title}
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default VisionCard;
