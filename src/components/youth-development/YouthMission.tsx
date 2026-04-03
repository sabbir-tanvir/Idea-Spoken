import React from 'react';
import OurMission, { MissionCard } from '../OurMission';

const YouthMission = () => {
  const missionCards: MissionCard[] = [
    {
      icon: '/images/over.png',
      title: 'আত্মবিশ্বাস তৈরি',
      description: 'যুব ও শিক্ষার্থীদের হতাশা, হীনমন্যতা ও ভয় কাটিয়ে আত্মবিশ্বাসী করা',
      bgColor: 'bg-blue-100/50'
    },
    {
      icon: '/images/backk.png',
      title: 'Clear Vision',
      description: 'Career, skill ও life direction নিয়ে clear vision তৈরি করা',
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
