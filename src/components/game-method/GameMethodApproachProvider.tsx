import React from 'react';
import GameMethodApproach, { Approach } from './GameMethodApproach';
import { BookOpen, Users, MessageCircle } from 'lucide-react';

const GameMethodApproachProvider = () => {
  const approaches: Approach[] = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Vocabulary Games',
      description: 'বিভিন্ন শব্দের মাধ্যমে শব্দভাণ্ডার সমৃদ্ধকরণ',
      bgColor: 'bg-purple-600'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Social Games',
      description: 'Group Activity ও Social Interaction এর মাধ্যমে Fluency',
      bgColor: 'bg-purple-600'
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Debate & Drama',
      description: 'Creative Performance এর মাধ্যমে আত্মবিশ্বাস',
      bgColor: 'bg-purple-600'
    }
  ];

  return (
    <GameMethodApproach 
      title="Our Approach"
      subtitle=""
      approaches={approaches}
    />
  );
};

export default GameMethodApproachProvider;
