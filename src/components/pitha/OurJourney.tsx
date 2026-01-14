import React from 'react';
import Journey, { JourneyItem } from '../ui/Journey';

const OurJourney = () => {
  const journeyItems: JourneyItem[] = [
    {
      year: '2017',
      title: 'যাত্রা শুরু',
      description: 'যান ও পাকশাল টাকা ও ৬৪ জন শিল্পগথি নিয়ে'
    },
    {
      year: '2018',
      title: 'প্রথম ব্যাচ সম্পন্ন',
      description: '৫০+ শিক্ষার্থী স্যামিটিকৃতি প্রাপ্ত'
    },
    {
      year: '2020',
      title: 'অনলাইন প্রসার',
      description: 'COVID এ অনলাইন ক্লাস শুরু'
    },
    {
      year: '2024',
      title: 'জাতীয় পর্যায়ে',
      description: 'দেশব্যাপী প্রোগ্রামডিট সফলসারব'
    }
  ];

  return (
    <Journey
      title="Our Journey"
      subtitle='Dream Vs Reality এর লহরিতে "আমদের স্বার" এর দোলায়ে আমাদের পরবনা'
      journeyItems={journeyItems}
    />
  );
};

export default OurJourney;
