import { courses } from '@/lib/data';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  // TODO: Add proper slug support to courses data
  return [];
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // TODO: Update courses data to include slug field
  const course = courses.find((c) => c.title.toLowerCase().replace(/\s+/g, '-') === slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-64 bg-gray-200"></div>
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-xl text-gray-700 mb-6">{course.description}</p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-4 bg-gray-50 rounded">
                <h3 className="font-semibold mb-2">Duration</h3>
                <p>{course.duration}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <h3 className="font-semibold mb-2">Price</h3>
                <p className="text-2xl font-bold text-blue-600">{course.price}</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">What You&apos;ll Learn</h2>
            <ul className="space-y-2 mb-8">
              {course.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg font-semibold">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
