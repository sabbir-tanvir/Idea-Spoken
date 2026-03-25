import PEvent from '@/components/bangla-pitha-research-institute/BanglaPithaEvent';
import CountUpSection from '@/components/pitha/PCountUp';
import PhotoGallery from '@/components/PhotoGallery';
import Review from '@/components/rise-and-thrive/Review';
import RecentEvent from '@/components/youth-development/RecentEvent';
import WhatWeDo from '@/components/youth-development/WhatWeDo';
import YouthHero from '@/components/youth-development/YouthHero';
import React from 'react';
import { getWingMediaBySlug } from '@/lib/api';

export default async function YouthDevelopment() {
  const media = await getWingMediaBySlug('idea-youth-development-center');

  return (
    <>
    <YouthHero
      title={media.title || undefined}
      description={media.description || undefined}
      coverImageUrl={media.coverImageUrl ?? undefined}
      coverImageAlt={media.coverImageAlt}
    />
    <CountUpSection />
    <PhotoGallery images={media.gallery} />
    <WhatWeDo />
    <RecentEvent />
    <Review />
    <PEvent />
    
    </>
  );
};

