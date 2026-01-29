import React from 'react'
import page from '../page'
import HeroSection from '@/components/pitha/PheroSection';
import CountUpSection from '@/components/pitha/PCountUp';
import OurJourney from '@/components/pitha/OurJourney';
import PhotoGallery from '@/components/pitha/PPhotoGallery';
import OurImpact from '@/components/pitha/OurImpact';
import PReview from '@/components/pitha/PReview';
import Wcontact from '@/components/pitha/PContact';
import PEvent from '@/components/pitha/PEvent';
import PMission from '@/components/pitha/PMission';

function PithaPatsala() {
  return (
    <>
    <HeroSection />
    <CountUpSection />
    <OurJourney />
    <PhotoGallery />
    <OurImpact />
    <PReview />
    <Wcontact />
    <PMission />
    <PEvent />
    </>
  )
}

export default PithaPatsala;
