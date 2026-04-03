import PEvent from '@/components/bangla-pitha-research-institute/BanglaPithaEvent';
import PhotoGallery from '@/components/PhotoGallery';
import HeroSection from "@/components/rise-and-thrive/HeroSection";

import React from 'react';
import { getWingMediaBySlug } from '@/lib/api';
import KeyProjects from '@/components/youth-development/KeyProjects';
import OurImpactText from '@/components/youth-development/OurImpactText';
import { getEvents } from "@/lib/api/events";


export default async function Home() {
  const [media, events] = await Promise.all([
    getWingMediaBySlug("idea-social-welfare"),
    getEvents(),
  ]);

  return (
    <>
      <HeroSection
        title={media.title || undefined}
        description={media.description || undefined}
        coverImageUrl={media.coverImageUrl ?? undefined}
        coverImageAlt={media.coverImageAlt}
      />
      <KeyProjects />
      <PhotoGallery images={media.gallery} />
      <OurImpactText />

      <PEvent />

    </>
  );
};

