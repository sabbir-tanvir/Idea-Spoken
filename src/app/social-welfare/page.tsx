import PEvent from '@/components/bangla-pitha-research-institute/BanglaPithaEvent';
import PhotoGallery from '@/components/PhotoGallery';

import React from 'react';
import { getWingMediaBySlug } from '@/lib/api';
import KeyProjects from '@/components/youth-development/KeyProjects';
import OurImpactText from '@/components/youth-development/OurImpactText';
import { getEvents } from "@/lib/api/events";
import SocialHome from '@/components/social-welfare/SocialHome';


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
      <KeyProjects />
      <PhotoGallery images={media.gallery} />
      <OurImpactText />

      <PEvent />

    </>
  );
};

