import HeroAbout from '@/components/about/HeroAbout';
import Timeline from '@/components/ui/Timeline';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section >

    <HeroAbout/>


      </section>
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Our Journey</h2>
        <Timeline />
      </section>




    </div>
  );
}
