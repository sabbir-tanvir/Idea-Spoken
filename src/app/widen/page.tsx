import PhotoGallery from '@/components/PhotoGallery'
import WingActivities from '@/components/WingActivities'
import Wcontact from '@/components/widen/Wcontact'
import CountUpSection from '@/components/widen/WCountUp'
import HeroSection from '@/components/widen/WidenHero'
import WKeyHighlight from '@/components/widen/WKeyHighlight'
import WBankDetails from '@/components/widen/WBankDetails'
import React from 'react'
import { getWingMediaBySlug } from '@/lib/api'
import WingLeadership, { Leader } from '@/components/WingLeadership'

const widenLeaders: Leader[] = [
  {
    name: 'মোঃ হামিদুল হক',
    role: 'প্রতিষ্ঠাতা ও প্রধান উপদেষ্টা',
    designation: 'প্রতিষ্ঠাতা ও প্রধান উপদেষ্টা',
    image: '/images/social/hamid.jpg',
  },
  {
    name: 'মল্লিকা আফরোজ',
    role: 'সিইও',
    designation: 'সিইও, বাংলাদেশ শিক্ষার্থী ও উদ্যোক্তা গ্রুপ উইনি',
    image: '/images/social/malika.png',
  },
];

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
      <WingLeadership
        title="উইনি (WINI) এর নেতৃত্ব"
        subtitle="বাংলাদেশ শিক্ষার্থী ও উদ্যোক্তা গ্রুপ উইনি এর পরিচালনা ও দিকনির্দেশনায়"
        leaders={widenLeaders}
      />
      <CountUpSection />
      <WingActivities activities={media.activities} />
      <PhotoGallery images={media.gallery} />
      <WKeyHighlight />
      <WBankDetails />
      <Wcontact />
    </> 
  )
}
