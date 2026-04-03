import Image from 'next/image';

const projects = [
  'IDEA Share Project',
  'IDEA Friday Day',
  'IDEA Winter Warmth (শীতার্ত বিতরণ)',
  'Flood Relief & Emergency Support',
  'Tree Plantation Campaign',
  'ফিউনারিম সহায়তা',
  'ওষুধ ও স্বাস্থ্যসেবা সহায়তা',
  'IDEA Eid Festival - শিশু ও বৃদ্ধাশ্রমে নতুন পোশাক বিতরণ',
  'Wheelchair, Filter, Fan, বাইসাইকেল, বই ইত্যাদি বিতরণ',
];

export default function KeyProjects() {
  return (
    <section className="py-20 md:py-24 lg:py-32 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
            Key Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 rounded-lg p-4 min-h-21 shadow-md shadow-blue-100 hover:shadow-lg hover:shadow-blue-200 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-6 h-6 relative mt-0.5">
                    <Image
                      src="/home/add_task.png"
                      alt="Check icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-slate-800 text-base leading-relaxed">{project}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
