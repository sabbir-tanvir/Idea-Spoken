import Hero from "@/components/home/Hero";
import WhichIdea from "@/components/home/WhichIdea";
import SevenWings from "@/components/home/7wings";
import TopCourse from "@/components/home/TopCourse";
import { getHomeHeroData, getWhyIdeaData, getSevenWingsData } from "@/lib/api";
import { getCourses } from "@/lib/api/courses";

export default async function Home() {
  const heroData = await getHomeHeroData();
  const whyIdeaData = await getWhyIdeaData();
  const sevenWingsData = await getSevenWingsData();
  const courses = await getCourses();

  return (
    <>
      <Hero data={heroData} />
      <TopCourse courses={courses} />
      <WhichIdea data={whyIdeaData} />
      <SevenWings data={sevenWingsData} />
    </>
  );
}
