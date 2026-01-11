import CountUpSection from "@/components/home/CountUp";
import HeroSection from "@/components/home/HeroSection";
import HomeResearch from "@/components/home/HomeResearch";
import PhotoGallery from "@/components/home/PhotoGallery";
import WhatYouWillLearn from "@/components/home/WhatUwillLearn";
import WhoIsItFor from "@/components/home/Whoisthisfor";
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
    </>
    
  );
}
