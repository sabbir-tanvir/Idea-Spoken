import React from 'react';
import Journey, { JourneyItem } from '../ui/Journey';

const OurJourney = () => {
  const journeyItems: JourneyItem[] = [
    {
      year: '2017',
      title: 'যাত্রা শুরু',
      description: ''
    }
  ];

  return (
    <Journey
      title="স্বপ্ন থেকে ঐতিহ্য সংরক্ষণের অভিযাত্রা__"
      subtitle="পিঠা পার্কের পথচলা শুধু একটি ব্যবসার গল্প নয়—এটি বাংলার পিঠা, লোকজ সংস্কৃতি ও শেকড়ের ঐতিহ্যকে নতুন প্রজন্মের কাছে পৌঁছে দেওয়ার এবং পিঠাকে বিশ্ব দরবারে সমাদৃত করার এক নিরন্তর প্রয়াস।"
      journeyItems={journeyItems}
    />
  );
};

export default OurJourney;
