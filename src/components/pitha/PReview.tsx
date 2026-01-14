import React from 'react';
import Review, { ReviewItem } from '../ui/Review';
import { Users } from 'lucide-react';

const PReview = () => {
  const reviews: ReviewItem[] = [
    {
      review: 'পিঠা বিক্রি করে মাসে ১৫,০০০ টাকা আয় করছি',
      name: 'রাফিক আহাবাম',
      location: 'শিক্ষাথী, বরাট'
    },
    {
      review: 'নিজের পিঠার দোকান খুলেছি',
      name: 'রাফিক আহাবাম',
      location: 'শিক্ষাথী, বরাট'
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
