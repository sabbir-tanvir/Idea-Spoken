import PEvent from '@/components/bangla-pitha-research-institute/BanglaPithaEvent';
import PhotoGallery from '@/components/PhotoGallery';
import WingActivities from '@/components/WingActivities';

import React from 'react';
import { getWingMediaBySlug } from '@/lib/api';
import OurImpactText from '@/components/youth-development/OurImpactText';
import { getEvents } from "@/lib/api/events";
import SocialHome from '@/components/social-welfare/SocialHome';
import WingLeadership, { Leader } from '@/components/WingLeadership';

const socialWelfareLeaders: Leader[] = [
  {
    name: 'মোঃ হামিদুল হক',
    role: 'প্রতিষ্ঠাতা ও প্রধান উপদেষ্টা',
    designation: 'প্রতিষ্ঠাতা ও প্রধান উপদেষ্টা',
    image: '/images/social/hamid.jpg',
  },
  {
    name: 'সোমা খান',
    role: 'সভাপতি',
    designation: 'সভাপতি, আইডিয়া সমাজকল্যাণ সংস্থা',
    image: '/images/social/soma.jpg',
  },
  {
    name: 'জান্নাতুল ফেরদৌস',
    role: 'সেক্রেটারি',
    designation: 'সাধারণ সম্পাদক, আইডিয়া সমাজকল্যাণ সংস্থা',
    image: '/images/social/jannat.jpg',
  },
];

export default async function Home() {
  const [media, events] = await Promise.all([
    getWingMediaBySlug("idea-social-welfare"),
    getEvents(),
  ]);

  return (
    <>
      <SocialHome
        title={media.title || undefined}
        description={media.description || undefined}
        coverImageUrl={media.coverImageUrl ?? undefined}
        coverImageAlt={media.coverImageAlt}
      />
      <WingLeadership 
        title="আইডিয়া সমাজকল্যাণ সংস্থার নেতৃত্ব"
        subtitle="আমাদের সমাজকল্যাণমূলক কার্যক্রম পরিচালনা ও সার্বিক নির্দেশনায়"
        leaders={socialWelfareLeaders} 
      />
      <WingActivities activities={media.activities} />
      <PhotoGallery images={media.gallery} />
      <OurImpactText />

      <PEvent />

    </>
  );
};

