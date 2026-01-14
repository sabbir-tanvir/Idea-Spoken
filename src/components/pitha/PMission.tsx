import React from 'react';
import OurMission, { MissionCard } from '../OurMission';

const PMission = () => {
  const missionCards: MissionCard[] = [
    {
      icon: '/images/backk.png',
      title: 'আত্মবিশ্বাসী নেতা',
      description: 'যুব ও শিক্ষার্থীদের দুবলতা, উদ্যোক্তা ও দক্ষ নাগরিক স্বয়ংসম্পূর্ণ করা',
      bgColor: 'bg-blue-100'
    },
    {
      icon: '/images/Over.png',
      title: 'Clear Vision',
      description: 'Career, এবং ও life direction নিয়ে clear vision তৈরি করা',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <OurMission
      title="Our Mission"
      subtitle="প্রতিটি যুবককে আত্মনির্ভরশীল ও দক্ষ করে গড়ে তোলা"
      cards={missionCards}
    />
  );
};

export default PMission;
