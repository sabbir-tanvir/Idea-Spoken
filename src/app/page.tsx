import Hero from "@/components/home/Hero";
import { getHomeHeroData } from "@/lib/api";

export default async function Home() {
  const heroData = await getHomeHeroData();

  return (
    <>
      <Hero data={heroData} />
    </>
  );
}
