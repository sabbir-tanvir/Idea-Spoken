import Hero from "@/components/home/Hero";
import WhichIdea from "@/components/home/WhichIdea";
import SevenWings from "@/components/home/7wings";
import TopCourse from "@/components/home/TopCourse";
import { getHomeHeroData, getWhyIdeaData, getSevenWingsData, getTopCoursesData } from "@/lib/api";

export default async function Home() {
  const heroData = await getHomeHeroData();
  const whyIdeaData = await getWhyIdeaData();
  const sevenWingsData = await getSevenWingsData();
  const topCoursesData = await getTopCoursesData();

  return (
    <>
      <Hero data={heroData} />
      <TopCourse data={topCoursesData} />
      <WhichIdea data={whyIdeaData} />
      <SevenWings data={sevenWingsData} />
    </>
  );
}
