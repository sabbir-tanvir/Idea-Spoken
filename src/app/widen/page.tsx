import PhotoGallery from '@/components/widen/PhotoGallery'
import WActivities from '@/components/widen/WActivities'
import Wcontact from '@/components/widen/Wcontact'
import CountUpSection from '@/components/widen/WCountUp'
import HeroSection from '@/components/widen/WidenHero'
import WKeyHighlight from '@/components/widen/WKeyHighlight'
import React from 'react'

export default function WidenPage() {
  return (
    <>
    <HeroSection />
    <CountUpSection />
    <WActivities />
    <PhotoGallery />
    <WKeyHighlight />
    <Wcontact />
    
    </>
    
  )
}
