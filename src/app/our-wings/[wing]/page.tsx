import { wings } from '@/lib/data';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return wings.map((wing) => ({
    wing: wing.slug,
  }));
}

export default function WingDetailPage({ params }: { params: { wing: string } }) {
  const wing = wings.find((w) => w.slug === params.wing);

  if (!wing) {
    notFound();
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-64 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">{wing.title}</h1>
            <p className="text-xl text-gray-700 mb-8">{wing.description}</p>
            
            <h2 className="text-2xl font-bold mb-4">Our Focus Areas</h2>
            <ul className="space-y-3 mb-8">
              {wing.focusAreas.map((area, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-2">●</span>
                  <span className="text-gray-700">{area}</span>
                </li>
              ))}
            </ul>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Get Involved</h3>
              <p className="text-gray-700 mb-4">
                Join us in making a difference. Contact us to learn how you can contribute to this initiative.
              </p>
              <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
