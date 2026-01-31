import OurMission from '@/components/about/OurMission';
import PEvent from '@/components/bangla-pitha-research-institute/BanglaPithaEvent';
import CountUpSection from '@/components/pitha/PCountUp';
import PhotoGallery from '@/components/pitha/PPhotoGallery';
import Review from '@/components/rise-and-thrive/Review';
import RecentEvent from '@/components/youth-development/RecentEvent';
import WhatWeDo from '@/components/youth-development/WhatWeDo';
import YouthHero from '@/components/youth-development/YouthHero';
import React from 'react';

export default function YouthDevelopment() {
  return (
    <>
    <YouthHero />
    <CountUpSection />
    <OurMission  />
    <PhotoGallery />
    <WhatWeDo />
    <RecentEvent />
    <Review />
    <PEvent />
    
    </>
  );
};

