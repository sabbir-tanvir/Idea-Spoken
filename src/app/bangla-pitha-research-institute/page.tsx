import React from 'react'
import CountUpSection from '@/components/pitha/PCountUp';
import PhotoGallery from '@/components/pitha/PPhotoGallery';
import PMission from '@/components/bangla-pitha-research-institute/BanglaPithaMission';
import BanglaPithaContact from '@/components/bangla-pitha-research-institute/BanglaPithaContact';
import BanglaPithaResearch from '@/components/bangla-pitha-research-institute/Banglaresearch';
import BanglaPithaInovation from '@/components/bangla-pitha-research-institute/BanglaPithaInovation';
import BanglaPithaActivation from '@/components/bangla-pitha-research-institute/BanglaPithaActivation';
import BanglaPithaHeroSection from '@/components/bangla-pitha-research-institute/BanglaPithaheroSection';

function PithaPatsala() {
  return (
    <>
    <BanglaPithaHeroSection />
    <CountUpSection />
    <BanglaPithaResearch />
    <BanglaPithaInovation />
    <BanglaPithaActivation />
    <PhotoGallery />
    <PMission />
    <BanglaPithaContact />

    </>
  )
}

export default PithaPatsala;
