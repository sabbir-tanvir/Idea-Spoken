import Contact from "@/components/Contact";
import AboutHamidul from "@/components/rise-and-thrive/AboutHamidul";
import CountUpSection from "@/components/rise-and-thrive/CountUp";
import HeroSection from "@/components/rise-and-thrive/HeroSection";
import HomeResearch from "@/components/rise-and-thrive/HomeResearch";
import WingActivities from "@/components/WingActivities";
import PhotoGallery from "@/components/PhotoGallery";
import Review from "@/components/rise-and-thrive/Review";
import UpcomingWorkshop from "@/components/rise-and-thrive/UpcomingWorkshop";
import WhatYouWillLearn from "@/components/rise-and-thrive/WhatUwillLearn";
import WhoIsItFor from "@/components/rise-and-thrive/Whoisthisfor";
import WhyRiseAndThrive from "@/components/rise-and-thrive/WhyRiseAndThrive";
import { getWingMediaBySlug } from "@/lib/api";
import { getEvents } from "@/lib/api/events";

export default async function Home() {
    const [media, events] = await Promise.all([
        getWingMediaBySlug("rise-and-thrive"),
        getEvents(),
    ]);

    return (
        <>
            <HeroSection
                title={media.title || undefined}
                description={media.description || undefined}
                coverImageUrl={media.coverImageUrl ?? undefined}
                coverImageAlt={media.coverImageAlt}
            />
            <CountUpSection />
            <WhyRiseAndThrive />
            <WhoIsItFor />
            <WhatYouWillLearn />
            <PhotoGallery images={media.gallery} />
            <HomeResearch />
            <WingActivities activities={media.activities} />
            <UpcomingWorkshop events={events} />
            <AboutHamidul />
            <Review />
            <Contact />
        </>

    );
}
