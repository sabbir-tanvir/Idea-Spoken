import React from 'react'
import HeroSection from '@/components/pitha/PheroSection';
import CountUpSection from '@/components/pitha/PCountUp';
import OurJourney from '@/components/pitha/OurJourney';
import PhotoGallery from '@/components/PhotoGallery';
import OurImpact from '@/components/pitha/OurImpact';
import PReview from '@/components/pitha/PReview';
import Wcontact from '@/components/pitha/PContact';
import { getWingMediaBySlug } from '@/lib/api';

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
    <CountUpSection />
    <OurJourney />
    <PhotoGallery images={media.gallery} />
    <OurImpact />
    <PReview />
    <Wcontact />

    </>
  )
}

export default PithaPatsala;
