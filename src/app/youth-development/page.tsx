import PEvent from '@/components/bangla-pitha-research-institute/BanglaPithaEvent';
import PhotoGallery from '@/components/PhotoGallery';
import YouthHero from '@/components/youth-development/YouthHero';
import React from 'react';
import { getWingMediaBySlug } from '@/lib/api';
import KeyProjects from '@/components/youth-development/KeyProjects';
import OurImpactText from '@/components/youth-development/OurImpactText';

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
    <KeyProjects />
    <PhotoGallery images={media.gallery} />
    <OurImpactText />
    
    <PEvent />
    
    </>
  );
};

