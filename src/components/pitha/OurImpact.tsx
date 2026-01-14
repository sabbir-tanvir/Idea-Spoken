import React from 'react';
import ResearchArea from '../ResearchArea';
import { TrendingUp, Bike, Flower2 } from 'lucide-react';

const OurImpact = () => {
  const impactCards = [
    {
      icon: <TrendingUp className="w-10 h-10 text-white" />,
      title: 'অর্থনৈতিক স্বাবলম্বিতা',
      subtitle: 'খুশবুর নিজের পায়ে দাঁড়ানোর সংসার ১ডিরি'
    },
    {
      icon: <Bike className="w-10 h-10 text-white" />,
      title: 'স্থানীয় উপাকরণ',
      subtitle: 'Local Resources ব্যবহার করে মাল্টিসাপার শিল্প ১ডিরি'
    },
    {
      icon: <Flower2 className="w-10 h-10 text-white" />,
      title: 'নারী ও যুব অংশগ্রহণ',
      subtitle: 'নারী ও যুবদের সক্রিয় অংশগ্রহণ সামাজিক পরিবর্তন'
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
