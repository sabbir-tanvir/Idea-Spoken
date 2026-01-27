import Contact from "@/components/Contact";
import CountUpSection from "@/components/rise-and-thrive/CountUp";
import HeroSection from "@/components/rise-and-thrive/HeroSection";
import HomeResearch from "@/components/rise-and-thrive/HomeResearch";
import PhotoGallery from "@/components/rise-and-thrive/PhotoGallery";
import Review from "@/components/rise-and-thrive/Review";
import UpcomingWorkshop from "@/components/rise-and-thrive/UpcomingWorkshop";
import WhatYouWillLearn from "@/components/rise-and-thrive/WhatUwillLearn";
import WhoIsItFor from "@/components/rise-and-thrive/Whoisthisfor";
import Image from "next/image";

export default function Home() {
    return (
        <>
            <HeroSection />
            <CountUpSection />
            <WhoIsItFor />
            <WhatYouWillLearn />
            <PhotoGallery />
            <HomeResearch />
            <UpcomingWorkshop />
            <Review />
            <Contact />
        </>

    );
}
