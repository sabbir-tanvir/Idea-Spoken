import Link from 'next/link';

interface Wing {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon?: string;
}

export default function WingCard({ wing }: { wing: Wing }) {
  return (
    <Link href={`/our-wings/${wing.slug}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow p-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-3xl">{wing.icon || '🎯'}</span>
        </div>
        <h3 className="text-xl font-semibold mb-3">{wing.title}</h3>
        <p className="text-gray-600 line-clamp-3">{wing.description}</p>
        <div className="mt-4">
          <span className="text-blue-600 hover:underline">Learn More →</span>
        </div>
      </div>
    </Link>
  );
}
