import PhotoGallery from '@/components/PhotoGallery'
import WingActivities from '@/components/WingActivities'
import GameMethodApproachProvider from '@/components/game-method/GameMethodApproachProvider'
import HeroSection from '@/components/widen/WidenHero'
import React from 'react'
import { getWingMediaBySlug } from '@/lib/api'
import WingLeadership, { Leader } from '@/components/WingLeadership'
import GameMethodDocumentary from '@/components/game-method/GameMethodDocumentary'

const gameMethodLeaders: Leader[] = [
  {
    name: 'মোঃ হামিদুল হক',
    role: 'প্রতিষ্ঠাতা ও প্রধান উপদেষ্টা',
    designation: 'প্রতিষ্ঠাতা ও প্রধান উপদেষ্টা',
    image: '/images/social/hamid.jpg',
  },
  {
    name: 'নাবিলা সুলতানা',
    role: 'কোর্ডিনেটর',
    designation: 'কোর্ডিনেটর, আইডিয়া স্পোকেন ও আইডিয়া ডিবেটিং সোসাইটি (MA in ELT & Applied Linguistics)',
    image: '/images/social/nabilla.jpg',
  },
];

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
      <WingLeadership
        title="আইডিয়া স্পোকেন (দ্য গেইম মেথড) এর নেতৃত্ব"
        subtitle="আমাদের কার্যক্রম পরিচালনা ও দিকনির্দেশনায় নিয়োজিত সুধিজন"
        leaders={gameMethodLeaders}
      />
      <GameMethodDocumentary />
      <GameMethodApproachProvider />
      <WingActivities activities={media.activities} />
      <PhotoGallery images={media.gallery} />
    </>
  )
}
