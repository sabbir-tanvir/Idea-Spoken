/**
 * Mock data for courses, wings, and other content
 */

export const courses = [
  {
    id: 1,
    title: 'IDEA Spoken English',
    slug: 'idea-spoken',
    description: 'Master spoken English with our comprehensive course designed for all levels.',
    price: '৳2,500',
    duration: '3 months',
    image: '/images/courses/spoken-english.jpg',
    features: [
      'Interactive live sessions',
      'Native speaker practice',
      'Pronunciation training',
      'Real-world conversation practice',
      'Certificate upon completion'
    ]
  },
  {
    id: 2,
    title: 'English Debate Course',
    slug: 'english-debate',
    description: 'Develop critical thinking and public speaking skills through structured debate training.',
    price: '৳3,000',
    duration: '4 months',
    image: '/images/courses/debate.jpg',
    features: [
      'Parliamentary debate format',
      'Critical thinking development',
      'Research skills',
      'Public speaking practice',
      'Competition preparation'
    ]
  },
  {
    id: 3,
    title: 'Leadership Development',
    slug: 'leadership',
    description: 'Build essential leadership skills for personal and professional growth.',
    price: '৳4,000',
    duration: '2 months',
    image: '/images/courses/leadership.jpg',
    features: [
      'Leadership fundamentals',
      'Team management',
      'Decision making',
      'Conflict resolution',
      'Project management basics'
    ]
  }
];

export const wings = [
  {
    id: 1,
    title: 'Rise and Thrive',
    slug: 'rise-and-thrive',
    description: 'Empowering individuals to reach their full potential through personal development programs.',
    icon: '🚀',
    focusAreas: [
      'Personal development workshops',
      'Career guidance and mentoring',
      'Skill development programs',
      'Networking opportunities',
      'Success coaching'
    ]
  },
  {
    id: 2,
    title: 'Pitha Pathshala',
    slug: 'pitha-pathshala',
    description: 'Preserving and promoting traditional Bengali culture and heritage.',
    icon: '🎭',
    focusAreas: [
      'Traditional food workshops',
      'Cultural events and festivals',
      'Heritage preservation',
      'Community engagement',
      'Cultural education programs'
    ]
  },
  {
    id: 3,
    title: 'Youth Development',
    slug: 'youth-development',
    description: 'Nurturing the next generation of leaders through comprehensive youth programs.',
    icon: '🌟',
    focusAreas: [
      'Youth leadership training',
      'Educational support',
      'Skills workshops',
      'Volunteer opportunities',
      'Youth forums and clubs'
    ]
  },
  {
    id: 4,
    title: 'WIDEN',
    slug: 'widen',
    description: 'Women\'s Inclusive Development and Empowerment Network - supporting women in all spheres.',
    icon: '💪',
    focusAreas: [
      'Women\'s empowerment programs',
      'Economic independence training',
      'Leadership development',
      'Health and wellness',
      'Support networks'
    ]
  },
  {
    id: 5,
    title: 'Social Welfare',
    slug: 'social-welfare',
    description: 'Community service initiatives to support underprivileged communities.',
    icon: '🤝',
    focusAreas: [
      'Community outreach programs',
      'Educational support',
      'Health awareness campaigns',
      'Environmental initiatives',
      'Disaster relief efforts'
    ]
  }
];

/**
 * Payment transaction interface and mock data
 */
export interface PaymentTransaction {
  id: string;
  courseTitle: string;
  date: string;
  amount: string;
  method: string;
  status: 'paid' | 'pending' | 'failed';
  transactionId: string;
}

export const mockPaymentHistory: PaymentTransaction[] = [
  {
    id: '1',
    courseTitle: 'IDEA SPOKEN – The Game Method',
    date: '15 Nov 2024',
    amount: '৳ 2,500',
    method: 'Bkash',
    status: 'paid',
    transactionId: 'PAY-001'
  },
  {
    id: '2',
    courseTitle: 'English Debate Course',
    date: '20 Dec 2024',
    amount: '৳ 3,000',
    method: 'Nagad',
    status: 'paid',
    transactionId: 'PAY-002'
  },
  {
    id: '3',
    courseTitle: 'Leadership Development',
    date: '10 Jan 2025',
    amount: '৳ 4,000',
    method: 'Rocket',
    status: 'paid',
    transactionId: 'PAY-003'
  },
  {
    id: '4',
    courseTitle: 'IDEA Spoken English',
    date: '5 Jan 2025',
    amount: '৳ 2,500',
    method: 'Bkash',
    status: 'pending',
    transactionId: 'PAY-004'
  }
];
