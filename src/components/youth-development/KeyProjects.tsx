import Image from 'next/image';

const projects = [
  'আইডিয়া ফ্রাইডে মিল',
  'আইডিয়া লস প্রজেক্ট',
  'মধ্যবিত্তের ইদ বাজার',
  'বৃক্ষরোপণ অভিযান',
  'ইদবস্ত্র ও শীতবস্ত্র বিতরণ ',
  'আইডিয়া বিশুদ্ধ ঠান্ডা পানি প্রকল্প',
  'গৃহহীন এর গৃহনির্মাণ ',
  'গৃহহীন এর গৃহনির্মাণ ',
  'করোনা কালীন ত্রাণসামগ্রী বিতরণ ',
  'গভীর নলকূপ স্থাপন',
  'হুইলচেয়ার বিতরণ',
  'ভিন্নধর্মী থার্টি-ফাস্ট নাইট উদযাপন'
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
                className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 rounded-2xl p-4 min-h-21 shadow-md shadow-blue-100 hover:shadow-lg hover:shadow-blue-200 transition-all duration-300"
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
