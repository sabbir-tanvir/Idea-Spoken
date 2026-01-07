import Link from 'next/link';

interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  duration: string;
  image?: string;
}

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/courses/${course.slug}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
        <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500"></div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-blue-600">{course.price}</span>
            <span className="text-sm text-gray-500">{course.duration}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
