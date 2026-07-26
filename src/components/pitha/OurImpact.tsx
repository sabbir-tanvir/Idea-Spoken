import React from 'react';
import ResearchArea from '../ResearchArea';
import { TrendingUp, Bike, Flower2 } from 'lucide-react';

const OurImpact = () => {
  const impactCards = [
    {
      icon: <TrendingUp className="w-10 h-10 text-white" />,
      title: 'ঐতিহ্য পুনরুদ্ধার',
      subtitle: 'বাংলার হারানো প্রায় ঐতিহ্য কে পুনরুদ্ধারের মাধ্যমে এর অর্থনৈতিক উৎকর্ষ সাধন করা'
    },
    {
      icon: <Bike className="w-10 h-10 text-white" />,
      title: 'কর্মসংস্থান সৃষ্টি',
      subtitle: 'প্রায় শতাধিক শিক্ষার্থীর কর্মসংস্থান তৈরী ও নারী উদ্যোক্তা '
    },
    {
      icon: <Flower2 className="w-10 h-10 text-white" />,
      title: 'বৈশ্বিক সম্প্রসারণ',
      subtitle: 'দেশ ছাড়িয়ে বিদেশেও বাংলার ঐতিহ্য পিঠা কে রপ্তানির মাধ্যমে অর্থনৈতিক ও সাংস্কৃতিক উভয় অঙ্গণে ভূমিকা রাখা।'
    }
  ];


  return (
    <ResearchArea
      heading="Our Impact"
      subheading=""
      cards={impactCards}
    />
  );
};

export default OurImpact;
