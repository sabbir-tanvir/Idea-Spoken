'use client';

const innovations = [
  {
    year: '2020',
    title: 'Spicy Pitha Series',
    badge: 'Bestseller',
  },
  {
    year: '2021',
    title: 'Grilled Pitha',
    badge: 'Launched',
  },
  {
    year: '2022',
    title: 'Fusion Kabab',
    badge: 'Popular',
  },
  {
    year: '2023',
    title: 'Sugar-Free Naru',
    badge: 'Testing',
  },
];

export default function BanglaPithaInovation() {
  return (
    <section className="py-20 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className=" mx-auto">
          {/* First Row - 3 column grid: Card | Title | Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-8">
            {/* Left Card - 2020 */}
            <div className="order-2 md:order-1">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-8 px-10 text-center">
                <p className="text-5xl font-light text-gray-400 mb-2">{innovations[0].year}</p>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{innovations[0].title}</h3>
                <span className="inline-block px-5 py-1.5 bg-purple-100 text-purple-600 text-base rounded-full">
                  {innovations[0].badge}
                </span>
              </div>
            </div>

            {/* Center Title */}
            <div className="flex justify-center order-1 md:order-2 mb-6 md:mb-0">
              <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-slate-900">Our Innovations</h2>
            </div>

            {/* Right Card - 2021 */}
            <div className="order-3">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-8 px-10 text-center">
                <p className="text-5xl font-light text-gray-400 mb-2">{innovations[1].year}</p>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{innovations[1].title}</h3>
                <span className="inline-block px-5 py-1.5 bg-purple-100 text-purple-600 text-base rounded-full">
                  {innovations[1].badge}
                </span>
              </div>
            </div>
          </div>

          {/* Second Row - 6 column grid: Empty | Card(2) | Card(2) | Empty */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
            {/* Empty Left Space */}
            <div className="hidden md:block"></div>

            {/* 2022 Card - spans 2 columns */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-8 px-10 text-center">
                <p className="text-5xl font-light text-gray-400 mb-2">{innovations[2].year}</p>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{innovations[2].title}</h3>
                <span className="inline-block px-5 py-1.5 bg-purple-100 text-purple-600 text-base rounded-full">
                  {innovations[2].badge}
                </span>
              </div>
            </div>

            {/* 2023 Card - spans 2 columns */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-8 px-10 text-center">
                <p className="text-5xl font-light text-gray-400 mb-2">{innovations[3].year}</p>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{innovations[3].title}</h3>
                <span className="inline-block px-5 py-1.5 bg-purple-100 text-purple-600 text-base rounded-full">
                  {innovations[3].badge}
                </span>
              </div>
            </div>

            {/* Empty Right Space */}
            <div className="hidden md:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
