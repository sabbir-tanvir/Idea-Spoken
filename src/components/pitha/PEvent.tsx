import React from 'react';
import Event from '../ui/Event';
import { Calendar } from 'lucide-react';

const PEvent = () => {
  const buttons = [
    {
      label: 'Register For Next Program',
      href: '/contact',
      variant: 'primary' as const
    },
    {
      label: 'Invite IDEA To My Campus',
      href: '/contact',
      variant: 'secondary' as const
    }
  ];

  return (
    <Event
      icon={<Calendar className="w-6 h-6" />}
      title="Upcoming Events"
      subtitle="আমাদের আসার ইভেন্টগুলোতে অংশ নিন এবং আপনার Campus-এ IDEA-কে আমন্ত্রণ জানান"
      buttons={buttons}
    />
  );
};

export default PEvent;
