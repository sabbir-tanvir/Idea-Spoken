import React from 'react'
import CountUpSection from '@/components/pitha/PCountUp';
import PhotoGallery from '@/components/PhotoGallery';
import PMission from '@/components/bangla-pitha-research-institute/BanglaPithaMission';
import BanglaPithaContact from '@/components/bangla-pitha-research-institute/BanglaPithaContact';
import BanglaPithaResearch from '@/components/bangla-pitha-research-institute/Banglaresearch';
import BanglaPithaInovation from '@/components/bangla-pitha-research-institute/BanglaPithaInovation';
import BanglaPithaActivation from '@/components/bangla-pitha-research-institute/BanglaPithaActivation';
import BanglaPithaHeroSection from '@/components/bangla-pitha-research-institute/BanglaPithaheroSection';
import { getWingGalleryBySlug } from '@/lib/api';

async function PithaPatsala() {
  const galleryImages = await getWingGalleryBySlug('bangla-pitha-research-institute');

  return (
    <>
    <BanglaPithaHeroSection />
    <CountUpSection />
    <BanglaPithaResearch />
    <BanglaPithaInovation />
    <BanglaPithaActivation />
    <PhotoGallery images={galleryImages} />
    <PMission />
    <BanglaPithaContact />

    </>
  )
}

export default PithaPatsala;
