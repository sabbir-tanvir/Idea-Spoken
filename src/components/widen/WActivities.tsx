import React from 'react';
import Activites, { Activity } from '../Activites';
import { Monitor, MessageSquare, BookOpen, Briefcase, MapPin, Users } from 'lucide-react';

const WActivities = () => {
  const activities: Activity[] = [
    {
      icon: <Monitor className="w-8 h-8" />,
      title: 'Online Grooming Mission',
      description: 'Professional Development Sessions',
      bgColor: 'bg-purple-500'
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'WIDEN উদ্যোক্তা আড্ডা',
      description: 'Entrepreneur Networking',
      bgColor: 'bg-purple-500'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'WIDEN শেখাও-শেখানো',
      description: 'Peer Learning Program',
      bgColor: 'bg-purple-500'
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: 'Online Entrepreneur Sessions',
      description: 'Business Training',
      bgColor: 'bg-purple-500'
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: '64 District Meetups',
      description: 'Nationwide Gatherings',
      bgColor: 'bg-purple-500'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Multi-Point Mentoring',
      description: 'Comprehensive Guidance',
      bgColor: 'bg-purple-500'
    }
  ];

  return (
    <Activites 
      title="Our Activities"
      subtitle="অনলাইন ও অফলাইনে আমাদের কার্যক্রম"
      activities={activities}
    />
  );
};

export default WActivities;