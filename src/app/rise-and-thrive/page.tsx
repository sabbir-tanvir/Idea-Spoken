import Contact from "@/components/Contact";
import CountUpSection from "@/components/rise-and-thrive/CountUp";
import HeroSection from "@/components/rise-and-thrive/HeroSection";
import HomeResearch from "@/components/rise-and-thrive/HomeResearch";
import PhotoGallery from "@/components/PhotoGallery";
import Review from "@/components/rise-and-thrive/Review";
import UpcomingWorkshop from "@/components/rise-and-thrive/UpcomingWorkshop";
import WhatYouWillLearn from "@/components/rise-and-thrive/WhatUwillLearn";
import WhoIsItFor from "@/components/rise-and-thrive/Whoisthisfor";
import { getWingGalleryBySlug } from "@/lib/api";

export default async function Home() {
    const galleryImages = await getWingGalleryBySlug("rise-and-thrive");

    return (
        <>
            <HeroSection />
            <CountUpSection />
            <WhoIsItFor />
            <WhatYouWillLearn />
            <PhotoGallery images={galleryImages} />
            <HomeResearch />
            <UpcomingWorkshop />
            <Review />
            <Contact />
        </>

    );
}
