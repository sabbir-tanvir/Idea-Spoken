import PEvent from '@/components/bangla-pitha-research-institute/BanglaPithaEvent';
import CountUpSection from '@/components/pitha/PCountUp';
import PhotoGallery from '@/components/PhotoGallery';
import Review from '@/components/rise-and-thrive/Review';
import RecentEvent from '@/components/youth-development/RecentEvent';
import WhatWeDo from '@/components/youth-development/WhatWeDo';
import YouthHero from '@/components/youth-development/YouthHero';
import React from 'react';
import { getWingGalleryBySlug } from '@/lib/api';

export default async function YouthDevelopment() {
  const galleryImages = await getWingGalleryBySlug('idea-youth-development-center');

  return (
    <>
    <YouthHero />
    <CountUpSection />
    <PhotoGallery images={galleryImages} />
    <WhatWeDo />
    <RecentEvent />
    <Review />
    <PEvent />
    
    </>
  );
};

