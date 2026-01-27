import HeroAbout from '@/components/about/HeroAbout';
import OurMission from '@/components/about/OurMission';
import AmaderKarjokrom from '@/components/about/AmaderKarjokrom';
import Timeline from '@/components/ui/Timeline';
import { getAboutData, getTimelineData, getActivitiesData } from '@/lib/api';

export default async function AboutPage() {
  const data = await getAboutData();
  const timelineEvents = await getTimelineData();
  const activitiesData = await getActivitiesData();

  return (
    <div className="min-h-screen">
      <section >
        <HeroAbout />
      </section>

      <OurMission data={data} />

      <Timeline events={timelineEvents} />

      <AmaderKarjokrom data={activitiesData} />

    </div>
  );
}
