import PhotoGallery from '@/components/PhotoGallery'
import WingActivities from '@/components/WingActivities'
import Wcontact from '@/components/widen/Wcontact'
import CountUpSection from '@/components/widen/WCountUp'
import HeroSection from '@/components/widen/WidenHero'
import WKeyHighlight from '@/components/widen/WKeyHighlight'
import React from 'react'
import { getWingMediaBySlug } from '@/lib/api'

export default async function WidenPage() {
  const media = await getWingMediaBySlug('widen');

  return (
    <>
    <HeroSection
      title={media.title || undefined}
      description={media.description || undefined}
      coverImageUrl={media.coverImageUrl ?? undefined}
      coverImageAlt={media.coverImageAlt}
    />
    <CountUpSection />
    <WingActivities activities={media.activities} />
    <PhotoGallery images={media.gallery} />
    <WKeyHighlight />
    <Wcontact />
    
    </>
    
  )
}
