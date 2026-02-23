import Image from 'next/image';
import CourseCard from '@/components/CourseCard';
import { getCourses } from '@/lib/api/courses';

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
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 text-base font-medium text-slate-600 shadow-sm">
                Never stop learning
              </span>
              <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
                Grow up your skills by{' '}
                <span className="text-blue-600">
                  online courses with Onlearning
                </span>
              </h1>
            </div>

            {/* Right Content - Image with floating elements */}
            <div className="relative flex items-end justify-center lg:justify-end">
              <div className="relative">
                {/* Main Image - positioned at bottom */}
                <div className="relative z-10">
                  <Image
                    src="/images/courses-hero.png"
                    alt="Student learning online"
                    width={550}
                    height={650}
                    className="h-auto w-full max-w-lg object-contain"
                    priority
                  />
                </div>

                {/* 250k Card - Left side, positioned higher */}
                <div className="absolute -left-8 top-1/3 z-20 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-xl md:-left-16 lg:-left-20">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.8}
                      >
                        <rect x="3" y="4" width="18" height="16" rx="2" />
                        <path d="M7 2v4M17 2v4M3 10h18" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xl font-bold text-slate-800">250k</p>
                      <p className="text-base font-medium text-slate-500">
                        Assisted Student
                      </p>
                    </div>
                  </div>
                </div>

                {/* Orange Chart Icon - Top right */}
                <div className="absolute -right-4 top-0 z-20 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-xl md:-right-8 md:h-20 md:w-20">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8 md:h-10 md:w-10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M5 17V7m5 10V4m5 13V9m5 8V6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Play Button - Centered between sections */}
      <div className="relative z-30 -mt-20 flex justify-center md:-mt-24">
        <div className="relative flex h-36 w-36 items-center justify-center md:h-44 md:w-44">
          {/* Rotating text circle */}
          <svg
            className="absolute h-full w-full animate-spin-slow"
            viewBox="0 0 100 100"
          >
            <defs>
              <path
                id="circlePath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              />
            </defs>
            <text className="fill-slate-600 text-[10px] font-semibold uppercase tracking-[0.3em]">
              <textPath href="#circlePath">
                Explore More • Explore More •{' '}
              </textPath>
            </text>
          </svg>
          {/* Center play button */}
          <div className="absolute flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-purple-600 text-white shadow-lg transition-transform hover:scale-110 md:h-24 md:w-24">
            <svg viewBox="0 0 24 24" className="h-8 w-8 md:h-10 md:w-10">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          </div>
          {/* Outer ring with white background */}
          <div className="absolute h-full w-full rounded-full border-2 border-purple-200 bg-white/80 backdrop-blur-sm" style={{ zIndex: -1 }} />
        </div>
      </div>

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
              IDEA-র দুটি স্পেশালাইজড কোর্স যা আপনার English দক্ষতা এবং আত্মবিশ্বাসকে
              নতুন উচ্চতায় নিয়ে যাবে 
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
