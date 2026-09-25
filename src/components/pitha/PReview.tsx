import React from 'react';
import Review, { ReviewItem } from '../ui/Review';
import { Users } from 'lucide-react';

const PReview = () => {
  const reviews: ReviewItem[] = [
    {
      review: 'চাকরি করবো না দেবো এটাই আমাদের লক্ষ্য',
      name: 'সোমা খাতুন',
      location: 'উদ্যোক্তা, আইডিয়া পিঠা পার্ক'
    },
    {
      review: 'আমাদের নিজেদের স্বাবলম্বী হওয়ার পাশাপাশি পিঠা পার্কে কর্মসংস্থান সৃষ্টি হয়েছে প্রায় দেড়শত শিক্ষার্থীর',
      name: 'জান্নাতুল ফেরদৌস',
      location: 'উদ্যোক্তা, আইডিয়া পিঠা পার্ক'
    }
  ];

  return (
    <Review
      icon={<Users className="w-10 h-10" />}
      title="Success Stories"
      subtitle="সফল উদ্যোক্তাদের গল্প"
      reviews={reviews}
    />
  );
};

export default PReview;
