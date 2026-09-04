import React from 'react';
import HeroSection from '@/components/pitha/PheroSection';
import CountUpSection from '@/components/pitha/PCountUp';
import OurJourney from '@/components/pitha/OurJourney';
import PithaMenu from '@/components/pitha/PithaMenu';
import PhotoGallery from '@/components/PhotoGallery';
import WingActivities from '@/components/WingActivities';
import OurImpact from '@/components/pitha/OurImpact';
import PReview from '@/components/pitha/PReview';
import Wcontact from '@/components/pitha/PContact';
import { getWingMediaBySlug } from '@/lib/api';
import WingLeadership, { Leader } from '@/components/WingLeadership';

const pithaParkLeaders: Leader[] = [
  {
    name: 'মোঃ হামিদুল হক',
    role: 'প্রতিষ্ঠাতা ও প্রধান উপদেষ্টা',
    designation: 'প্রতিষ্ঠাতা ও প্রধান উপদেষ্টা',
    image: '/images/social/hamid.jpg',
  },
  {
    name: 'জান্নাতুল ফেরদৌস',
    role: 'উদ্যোক্তা ও কোর্ডিনেটর',
    designation: 'কোর্ডিনেটর ও হেড অফ মার্কেটিং, আইডিয়া পিঠা পার্ক',
    image: '/images/pitha/jannat.jpg',
  },
  {
    name: 'সোমা খাতুন',
    role: 'উদ্যোক্তা',
    designation: 'সাবেক কোর্ডিনেটর ও হেড অফ প্রোডাকশন, আইডিয়া পিঠা পার্ক',
    image: '/images/pitha/soma.jpg',
  },
  {
    name: 'তানজিয়া জাহান মমতাজ',
    role: 'উদ্যোক্তা',
    designation: 'হেড অফ অ্যাকাউন্টস, আইডিয়া পিঠা পার্ক',
    image: '/images/pitha/mamtaj.jpg',
  },
  {
    name: 'নাবিলা সুলতানা',
    role: 'উদ্যোক্তা',
    designation: 'হেড অফ অনলাইন মার্কেটিং, আইডিয়া পিঠা পার্ক',
    image: '/images/pitha/nabila.jpg',
  },
];

async function PithaPatsala() {
  const media = await getWingMediaBySlug('idea-pitha-pathshala');

  return (
    <>
      <HeroSection
        title={media.title || undefined}
        description={media.description || undefined}
        coverImageUrl={media.coverImageUrl ?? undefined}
        coverImageAlt={media.coverImageAlt}
      />
      <WingLeadership
        title="আইডিয়া পিঠা পার্ক এর নেতৃত্ব ও উদ্যোক্তাবৃন্দ"
        subtitle="আমাদের ঐতিহ্যবাহী পিঠা তৈরি, পরিচিতি ও বিপণন পরিচালনায় নিয়োজিত টিম"
        leaders={pithaParkLeaders}
      />
      <CountUpSection />
      <OurJourney />
      <PithaMenu />
      <WingActivities activities={media.activities} />
      <PhotoGallery images={media.gallery} />
      <OurImpact />
      <PReview />
      <Wcontact />
    </>
  );
}

export default PithaPatsala;
