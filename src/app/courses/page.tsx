import CourseCard from '@/components/CourseCard';
import { courses } from '@/lib/data';

export default function CoursesPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Our Courses</h1>
        <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
          Explore our wide range of courses designed to enhance your skills and knowledge
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}
