'use client';

import { Puzzle, Users, Lightbulb } from 'lucide-react';

const gameCategories = [
  {
    title: 'Vocabulary Games',
    icon: Puzzle,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    games: [
      'Curry Game',
      'Word Passing',
      'Cold Word War',
      'Fruit Game',
      'এবং আরও skill-focused vocabulary challenges',
    ],
  },
  {
    title: 'Interactive Social Games',
    icon: Users,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    games: [
      'I Have a Complaint Against My Friend',
      'Finding Friends',
      'Who Am I?',
      'Role Playing',
      'Counter the Role',
    ],
  },
  {
    title: 'Amusing & Creative Tools',
    icon: Lightbulb,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    games: [
      'Debate for Language Fluency',
      'Drama and Creative Performance',
    ],
  },
];

export default function TypesofGame() {
  return (
    <section className="py-20 md:py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
          Types of Games
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {gameCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Icon */}
                <div className={`w-12 h-12 ${category.iconBg} rounded-xl flex items-center justify-center mb-5`}>
                  <IconComponent className={`w-6 h-6 ${category.iconColor}`} />
                </div>

                {/* Category Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  {category.title}
                </h3>

                {/* Games List */}
                <ul className="space-y-3">
                  {category.games.map((game, gameIndex) => (
                    <li key={gameIndex} className="flex items-start gap-2">
                      <svg
                        className="w-4 h-4 text-purple-500 mt-1 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path d="M7 17L17 7" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-base text-gray-600">{game}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
