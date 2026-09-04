import PEvent from '@/components/bangla-pitha-research-institute/BanglaPithaEvent';
import PhotoGallery from '@/components/PhotoGallery';
import WingActivities from '@/components/WingActivities';

import React from 'react';
import { getWingMediaBySlug } from '@/lib/api';
import { getEvents } from "@/lib/api/events";
import YouthHero from '@/components/youth-development/YouthHero';
import WhatWeDo from '@/components/youth-development/WhatWeDo';
import UpcomingWorkshop from '@/components/rise-and-thrive/UpcomingWorkshop';
import YouthMission from '@/components/youth-development/YouthMission';
import Review from '@/components/youth-development/YouthReview';
import CountUpSection from '@/components/youth-development/YCountUp';
import WingLeadership, { Leader } from '@/components/WingLeadership';

const youthDevelopmentLeaders: Leader[] = [
  {
    name: 'মোঃ হামিদুল হক',
    role: 'প্রতিষ্ঠাতা ও প্রধান উপদেষ্টা',
    designation: 'প্রতিষ্ঠাতা ও প্রধান উপদেষ্টা',
    image: '/images/youth/hamidd.jpg',
  },
  {
    name: 'তানজিয়া জাহান মমতাজ',
    role: 'সভাপতি',
    designation: 'সভাপতি, আইডিয়া যুব উন্নয়ন কেন্দ্র',
    image: '/images/youth/mamtaj.jpg',
  },
  {
    name: 'নাবিলা সুলতানা',
    role: 'সেক্রেটারি',
    designation: 'সাধারণ সম্পাদক, আইডিয়া যুব উন্নয়ন কেন্দ্র',
    image: '/images/youth/nabila.jpg',
  },
];

export default async function Home() {
  const [media, events] = await Promise.all([
    getWingMediaBySlug("idea-youth-development-center"),
    getEvents(),
  ]);

  return (
    <>
      <YouthHero
        title={media.title || undefined}
        description={media.description || undefined}
        coverImageUrl={media.coverImageUrl ?? undefined}
        coverImageAlt={media.coverImageAlt}
      />
      <WingLeadership
        title="আইডিয়া যুব উন্নয়ন কেন্দ্রের নেতৃত্ব"
        subtitle="আমাদের যুব উন্নয়নমূলক কার্যক্রম পরিচালনা ও সার্বিক নির্দেশনায়"
        leaders={youthDevelopmentLeaders}
      />
      <CountUpSection />
      <YouthMission />
      <WingActivities activities={media.activities} />

      <PhotoGallery images={media.gallery} />
      <WhatWeDo />
      <UpcomingWorkshop events={events} />
      <Review />
      <PEvent />
    </>
  );
};

