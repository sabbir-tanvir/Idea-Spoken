import React from 'react'
import HeroSection from '@/components/pitha/PheroSection';
import CountUpSection from '@/components/pitha/PCountUp';
import OurJourney from '@/components/pitha/OurJourney';
import PhotoGallery from '@/components/PhotoGallery';
import OurImpact from '@/components/pitha/OurImpact';
import PReview from '@/components/pitha/PReview';
import Wcontact from '@/components/pitha/PContact';
import { getWingGalleryBySlug } from '@/lib/api';

async function PithaPatsala() {
  const galleryImages = await getWingGalleryBySlug('idea-pitha-pathshala');

  return (
    <>
    <HeroSection />
    <CountUpSection />
    <OurJourney />
    <PhotoGallery images={galleryImages} />
    <OurImpact />
    <PReview />
    <Wcontact />

    </>
  )
}

export default PithaPatsala;
