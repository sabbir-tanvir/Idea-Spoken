import React from 'react';
import OurMission, { MissionCard } from '../OurMission';

const YouthMission = () => {
  const missionCards: MissionCard[] = [
    {
      icon: '/images/Over.png',
      title: 'আত্মবিশ্বাস তৈরি',
      description: 'যুব সমাজ-কে আত্মনির্ভরশীল করে গড়ে তোলার জন্য বিনামূল্যে বিভিন্ন প্রশিক্ষণ প্রদান',
      bgColor: 'bg-blue-100/50'
    },
    {
      icon: '/images/backk.png',
      title: 'Clear Vision',
      description: 'যুব সমাজ কে দক্ষ মানব সম্পদে পরিণত করা আমাদের লক্ষ্য',
      bgColor: 'bg-blue-100/50'
    }
  ];

  return (
    <OurMission
      title="Our Mission"
      subtitle="প্রতিটি যুবককে আত্মবিশ্বাসী ও দক্ষ করে গড়ে তোলা"
      cards={missionCards}
    />
  );
};

export default YouthMission;
