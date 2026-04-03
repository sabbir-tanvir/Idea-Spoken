import PhotoGallery from '@/components/PhotoGallery'
import GameMethodApproachProvider from '@/components/game-method/GameMethodApproachProvider'
import HeroSection from '@/components/widen/WidenHero'
import React from 'react'
import { getWingMediaBySlug } from '@/lib/api'

export default async function GameMethodPage() {
  const media = await getWingMediaBySlug('the-game-method');

  return (
    <>
      <HeroSection
        title={media.title || "The Game Method"}
        description={media.description || undefined}
        coverImageUrl={media.coverImageUrl ?? undefined}
        coverImageAlt={media.coverImageAlt}
      />
      <GameMethodApproachProvider />
      <PhotoGallery images={media.gallery} />
    </>
  )
}
