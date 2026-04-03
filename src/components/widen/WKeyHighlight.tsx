import React from 'react';
import KeyHighlights, { Highlight } from '../KeyHighlights';
import VisionCard from '../ui/cards/VisionCard';
import { Globe } from 'lucide-react';

const WKeyHighlight = () => {
  const highlights: Highlight[] = [
    {
      year: '01',
      title: 'উইনি এই আমি, এই আমার উদ্যোগ:',
      description: '(শিক্ষার্থীদের মাঝে উদ্যোক্তা হওয়ার অনুপ্রেরণা ছড়িয়ে দিতে সফল উদ্যোক্তাদের বাস্তব অভিজ্ঞতা, সংগ্রাম ও সাফল্যের গল্প তুলে ধরা হয়, যা নতুনদের আত্মবিশ্বাস ও সাহস জোগায়।)'
    },
    {
      year: '02',
      title: 'উইনি উদ্যোক্তা প্রশিক্ষণ:',
      description: '(নিয়মিত প্রশিক্ষণ কার্যক্রমের মাধ্যমে উদ্যোক্তাদের দক্ষতা বৃদ্ধি, সঠিক দিকনির্দেশনা প্রদান এবং তাদেরকে যোগ্য ও সমৃদ্ধ উদ্যোক্তা হিসেবে গড়ে তোলার ধারাবাহিক প্রচেষ্টা।)'
    },
    {
      year: '03',
      title: '“৬৪ জেলার অক্সিজেন ব্যাংক” উদ্যোগ:',
      description: '(করোনাকালীন সংকটময় সময়ে উইনির উদ্যোগে পরিচালিত এই অনলাইন প্ল্যাটফর্মের মাধ্যমে দেশের বিভিন্ন প্রান্তে অক্সিজেন সরবরাহ নিশ্চিত করে মানবিক সহায়তার এক অনন্য দৃষ্টান্ত স্থাপন করা হয়।)'
    },
    {
      year: '04',
      title: 'উইনি বই বিতরণ কর্মসূচি:',
      description: '(দেশের প্রত্যন্ত অঞ্চলের অভাবী শিক্ষার্থীদের মাঝে একাডেমিক বই পৌঁছে দিয়ে শিক্ষা অর্জনের সুযোগ তৈরি এবং শিক্ষার প্রসারে কার্যকর ভূমিকা রাখা হয়।)'
    }
  ];

  return (
    <>


      {/* Key Highlights Section */}
      <KeyHighlights 
        title="Key Highlights"
        subtitle="উইনির উল্লেখযোগ্য কার্যক্রম"
        highlights={highlights}
      />
            {/* Vision Card Section */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4 ">
            <VisionCard 
              icon={<Globe className="w-16 h-16" />}
              title="Our Vision"
              subtitle='উদ্যোক্তা, শিক্ষা ও মানবিক উদ্যোগকে একসাথে এগিয়ে নিয়ে দেশের প্রতিটি প্রান্তে আত্মনির্ভর, দক্ষ ও সামাজিকভাবে দায়বদ্ধ একটি প্রজন্ম গড়ে তোলা।'
            />
        </div>
      </section>
    </>
  );
};

export default WKeyHighlight;
