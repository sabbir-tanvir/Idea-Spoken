import React from 'react';
import KeyHighlights, { Highlight } from '../KeyHighlights';
import VisionCard from '../ui/cards/VisionCard';
import { Globe } from 'lucide-react';

const WKeyHighlight = () => {
  const highlights: Highlight[] = [
    {
      year: '2020',
      title: 'COVID-19 Support',
      description: 'মানসিক সহায় এসএমএফ মুভমেন্ট জন্য Positive Platform'
    },
    {
      year: '2021',
      title: 'শিক্ষা সবাইকা',
      description: 'জাতি দোষতো বইয়ে সবিয় উপকারে বিবরন'
    },
    {
      year: '2022',
      title: '2022 উদ্যোক্তা নেটওয়ার্ক',
      description: 'সারাদেশে উদ্যোক্তা কমিউনিটি গঠন'
    },
    {
      year: '2023',
      title: '2023 District Meetups',
      description: '64 জেলায় সাক্ষাৎ-মিলন Meet & Greet'
    }
  ];

  return (
    <>


      {/* Key Highlights Section */}
      <KeyHighlights 
        title="Key Highlights"
        subtitle="আমাদের যাত্রায় মাইলফলক্স 2020"
        highlights={highlights}
      />
            {/* Vision Card Section */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4 ">
            <VisionCard 
              icon={<Globe className="w-16 h-16" />}
              title="Our Vision"
              subtitle='"Local To Global" – গ্রামের পিঠাকে বিয়ামেলার স্কুলে ডোমনার স্বপ্ন'
            />
        </div>
      </section>
    </>
  );
};

export default WKeyHighlight;
