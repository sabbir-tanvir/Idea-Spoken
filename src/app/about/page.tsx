import Timeline from '@/components/ui/Timeline';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
        <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12">
          We are dedicated to providing quality education and empowering individuals
          through our various programs and initiatives.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700">
              To empower individuals through education and social development programs
              that foster personal growth and community development.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-gray-700">
              A society where everyone has access to quality education and opportunities
              for personal and professional development.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-8">Our Journey</h2>
        <Timeline />
      </section>
    </div>
  );
}
