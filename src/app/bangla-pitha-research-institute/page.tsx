import React from 'react'
import CountUpSection from '@/components/pitha/PCountUp';
import PhotoGallery from '@/components/PhotoGallery';
import PMission from '@/components/bangla-pitha-research-institute/BanglaPithaMission';
import BanglaPithaContact from '@/components/bangla-pitha-research-institute/BanglaPithaContact';
import BanglaPithaResearch from '@/components/bangla-pitha-research-institute/Banglaresearch';
import BanglaPithaInovation from '@/components/bangla-pitha-research-institute/BanglaPithaInovation';
import BanglaPithaActivation from '@/components/bangla-pitha-research-institute/BanglaPithaActivation';
import BanglaPithaHeroSection from '@/components/bangla-pitha-research-institute/BanglaPithaheroSection';
import { getWingMediaBySlug } from '@/lib/api';

async function PithaPatsala() {
  const media = await getWingMediaBySlug('bangla-pitha-research-institute');

  return (
    <>
    <BanglaPithaHeroSection
      title={media.title || undefined}
      description={media.description || undefined}
      coverImageUrl={media.coverImageUrl ?? undefined}
      coverImageAlt={media.coverImageAlt}
    />
    <CountUpSection />
    <BanglaPithaResearch />
        <PhotoGallery images={media.gallery} />

    <BanglaPithaInovation />
    <BanglaPithaActivation />
    <BanglaPithaContact />

    </>
  )
}

export default PithaPatsala;
