import DashboardSidebar from '@/components/DashboardSidebar';
import LessonCard, { LessonCardData } from '@/components/dashborad/LessonCard';
import { Play } from 'lucide-react';

// Dummy lesson data
const recentLessons: LessonCardData[] = [
  {
    id: '1',
    title: 'Understanding Game Method & Mindset',
    courseName: 'IDEA SPOKEN',
    duration: '45 Min',
    status: 'completed',
  },
  {
    id: '2',
    title: 'Understanding Game Method & Mindset',
    courseName: 'IDEA SPOKEN',
    duration: '45 Min',
    status: 'continue',
  },
  {
    id: '3',
    title: 'Understanding Game Method & Mindset',
    courseName: 'IDEA SPOKEN',
    duration: '45 Min',
    status: 'completed',
  },
  {
    id: '4',
    title: 'Understanding Game Method & Mindset',
    courseName: 'IDEA SPOKEN',
    duration: '45 Min',
    status: 'continue',
  },
  {
    id: '5',
    title: 'Understanding Game Method & Mindset',
    courseName: 'IDEA SPOKEN',
    duration: '45 Min',
    status: 'completed',
  },
  {
    id: '6',
    title: 'Understanding Game Method & Mindset',
    courseName: 'IDEA SPOKEN',
    duration: '45 Min',
    status: 'completed',
  },
];

export default function LessonsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-90 shrink-0">
            <DashboardSidebar />
          </div>

          {/* Main Content */}
          <main className="flex-1">
            {/* Lessons Card */}
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center">
                    <Play className="w-7 h-7 text-white fill-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Recent Lessons</h2>
                    <p className="text-base text-gray-500">Pick Up Where You Stopped</p>
                  </div>
                </div>
              </div>

              {/* Lessons List */}
              <div className="p-6 space-y-4">
                {recentLessons.map((lesson) => (
                  <LessonCard key={lesson.id} lesson={lesson} />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
