import PEvent from '@/components/bangla-pitha-research-institute/BanglaPithaEvent';
import PhotoGallery from '@/components/PhotoGallery';

import React from 'react';
import { getWingMediaBySlug } from '@/lib/api';
import { getEvents } from "@/lib/api/events";
import YouthHero from '@/components/youth-development/YouthHero';
import WhatWeDo from '@/components/youth-development/WhatWeDo';
import UpcomingWorkshop from '@/components/rise-and-thrive/UpcomingWorkshop';
import YouthMission from '@/components/youth-development/YouthMission';
import Review from '@/components/youth-development/YouthReview';
import CountUpSection from '@/components/youth-development/YCountUp';


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
      <CountUpSection />
      <YouthMission />

      <PhotoGallery images={media.gallery} />
      <WhatWeDo />
      <UpcomingWorkshop events={events} />
      <Review />

      <PEvent />

    </>
  );
};

