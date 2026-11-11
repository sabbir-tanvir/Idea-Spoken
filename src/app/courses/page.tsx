import Image from 'next/image';
import CourseCard from '@/components/CourseCard';
import { getCourses } from '@/lib/api/courses';
import CoursePurchaseVideoModal from '@/components/courses/CoursePurchaseVideoModal';

export default async function CoursesPage() {
  const courses = await getCourses();
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-200 via-white to-blue-100 px-4 pb-32 pt-16 md:pb-40 md:pt-20 lg:pb-48 lg:pt-24">
        <div className="container mx-auto max-w-7xl">
          <div className="relative grid gap-12 lg:grid-cols-2 lg:items-start">
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-8 lg:pt-12">
              <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-5 py-2.5 text-base font-semibold text-purple-700 shadow-xs">
                Boost yourself with our online Education
              </span>
              <h1 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
                The most powerful investment in your life is{' '}
                <span className="text-purple-600">
                  investment in Education
                </span>
              </h1>
            </div>

            {/* Right Content - Image with Hamidul Huq details */}
            <div className="relative flex flex-col items-center justify-center lg:items-end lg:justify-end">
              <div className="relative group">
                {/* Main Image */}
                <div className="relative z-10 overflow-hidden rounded-3xl border-4 border-white shadow-2xl bg-slate-100 max-w-md">
                  <Image
                    src="/images/hamid.jpg"
                    alt="Md. Hamidul Huq"
                    width={500}
                    height={600}
                    className="h-auto w-full object-cover object-top transition-transform duration-500 hover:scale-105"
                    priority
                  />
                </div>

                {/* Info Card */}
                <div className="absolute -bottom-6 -left-4 md:-left-10 z-20 rounded-2xl border border-purple-100 bg-white/95 backdrop-blur-md p-5 shadow-xl max-w-xs md:max-w-sm">
                  <h3 className="text-lg md:text-xl font-bold text-slate-900">
                    Md. Hamidul Huq
                  </h3>
                  <p className="text-xs md:text-sm font-bold text-purple-600 mt-0.5">
                    Mind Programmer & Social Psychologist,
                  </p>
                  <p className="text-xs md:text-sm font-medium text-slate-600">
                    Founder & Chief Adviser 
                  </p>
                  <p className="text-xs text-slate-500 mt-1.5 font-medium border-t border-slate-100 pt-1.5">
                    Institute of Development, Education and Education (IDEA)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Play Button - Centered between sections */}
      <CoursePurchaseVideoModal />

      {/* Courses Section */}
      <section className="px-4 py-20 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12 text-center md:mb-16">
            <span className="inline-flex items-center rounded-full bg-purple-100 px-6 py-2.5 text-base font-semibold text-purple-700">
              আমাদের কোর্সসমূহ
            </span>
            <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
              Our Courses
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-600 md:text-xl">
              আত্মউন্নয়নের এই যাত্রায় আইডিয়া সবসময় আপনার সাথে আছে।
            </p>
          </div>

          {courses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-6">
              <div className="relative flex items-center justify-center w-32 h-32 rounded-full bg-purple-50 border-2 border-dashed border-purple-200">
                <svg viewBox="0 0 24 24" className="w-14 h-14 text-purple-300" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-slate-800">কোর্স শীঘ্রই আসছে</h3>
                <p className="text-slate-500 text-base max-w-md">
                  আমরা আপনার জন্য দারুণ কোর্স তৈরি করছি। খুব শীঘ্রই এখানে নতুন কোর্স যোগ হবে — Coming Soon!
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-6 py-2.5 text-sm font-semibold text-purple-700 animate-pulse">
                🚀 Coming Soon
              </span>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
              {courses.map((course, index) => (
                <CourseCard key={index} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
