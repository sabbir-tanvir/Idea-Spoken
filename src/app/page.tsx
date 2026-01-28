import Hero from "@/components/home/Hero";
import WhichIdea from "@/components/home/WhichIdea";
import SevenWings from "@/components/home/7wings";
import { getHomeHeroData, getWhyIdeaData, getSevenWingsData } from "@/lib/api";

export default async function Home() {
  const heroData = await getHomeHeroData();
  const whyIdeaData = await getWhyIdeaData();
  const sevenWingsData = await getSevenWingsData();

  return (
    <>
      <Hero data={heroData} />
      <WhichIdea data={whyIdeaData} />
      <SevenWings data={sevenWingsData} />
    </>
  );
}
