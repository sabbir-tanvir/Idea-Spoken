import PhotoGallery from '@/components/PhotoGallery'
import WActivities from '@/components/widen/WActivities'
import Wcontact from '@/components/widen/Wcontact'
import CountUpSection from '@/components/widen/WCountUp'
import HeroSection from '@/components/widen/WidenHero'
import WKeyHighlight from '@/components/widen/WKeyHighlight'
import React from 'react'
import { getWingGalleryBySlug } from '@/lib/api'

export default async function WidenPage() {
  const galleryImages = await getWingGalleryBySlug('widen');

  return (
    <>
    <HeroSection />
    <CountUpSection />
    <WActivities />
    <PhotoGallery images={galleryImages} />
    <WKeyHighlight />
    <Wcontact />
    
    </>
    
  )
}
