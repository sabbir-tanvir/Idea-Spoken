import { getCourseById } from '@/lib/api/courses';
import { notFound } from 'next/navigation';
import CourseHero from '@/components/course-detail/CourseHero';
import CoursePhilosophy from '@/components/course-detail/CoursePhilosophy';
import CourseWhatYoullLearn from '@/components/course-detail/CourseWhatYoullLearn';
import CourseHighlights from '@/components/course-detail/CourseHighlights';
import CourseModules from '@/components/course-detail/CourseModules';
import CourseOffer from '@/components/course-detail/CourseOffer';

export const dynamic = 'force-dynamic';

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const numericId = parseInt(slug, 10);
  if (isNaN(numericId)) {
    notFound();
  }

  // Fetch course from API; components handle null with fallback data
  const courseDetail = await getCourseById(numericId);

  return (
    <main className="min-h-screen bg-white">
      <CourseHero courseDetail={courseDetail} />
      <CoursePhilosophy courseDetail={courseDetail} />
      <CourseWhatYoullLearn courseDetail={courseDetail} />
      <CourseHighlights courseDetail={courseDetail} />
      <CourseModules courseDetail={courseDetail} />
      <CourseOffer courseDetail={courseDetail} />
    </main>
  );
}
