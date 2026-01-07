import WingCard from '@/components/WingCard';
import { wings } from '@/lib/data';

export default function OurWingsPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Our Wings</h1>
        <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
          Discover our various initiatives dedicated to education, youth development, and social welfare
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wings.map((wing) => (
            <WingCard key={wing.id} wing={wing} />
          ))}
        </div>
      </div>
    </div>
  );
}
