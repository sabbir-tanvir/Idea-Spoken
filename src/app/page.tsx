import CountUpSection from "@/components/home/CountUp";
import HeroSection from "@/components/home/HeroSection";
import WhoIsItFor from "@/components/home/Whoisthisfor";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <HeroSection />
    <CountUpSection />
    <WhoIsItFor />
    </>
    
  );
}
