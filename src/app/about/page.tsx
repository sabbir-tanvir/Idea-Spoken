import HeroAbout from '@/components/about/HeroAbout';
import OurMission from '@/components/about/OurMission';
import AmaderKarjokrom from '@/components/about/AmaderKarjokrom';
import Timeline from '@/components/ui/Timeline';
import { 
  getAboutData, 
  getTimelineData, 
  getActivitiesData, 
  getTvMedia, 
  getNewspaperClips 
} from '@/lib/api';

export default async function AboutPage() {
  const [data, timelineEvents, activitiesData, tvMedia, newspaperClips] = await Promise.all([
    getAboutData(),
    getTimelineData(),
    getActivitiesData(),
    getTvMedia(),
    getNewspaperClips(),
  ]);

  return (
    <div className="min-h-screen">
      <section>
        <HeroAbout />
      </section>

      <OurMission data={data} />

      <Timeline events={timelineEvents} />

      <AmaderKarjokrom 
        data={activitiesData} 
        tvMedia={tvMedia}
        newspaperClips={newspaperClips}
      />

    </div>
  );
}
