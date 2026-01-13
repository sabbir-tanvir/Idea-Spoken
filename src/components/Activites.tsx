import React from 'react';

export interface Activity {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
}

interface ActivitiesProps {
  title: string;
  subtitle: string;
  activities: Activity[];
}

const Activites: React.FC<ActivitiesProps> = ({
  title,
  subtitle,
  activities
}) => {
  return (
    <section className="py-20  md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {title}
          </h2>
          <p className="text-gray-600 text-lg">
            {subtitle}
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="group p-6 border-2 border-purple-200 rounded-2xl hover:border-purple-400 transition-all duration-300 hover:shadow-lg bg-white"
            >
              {/* Icon */}
              <div className={`${activity.bgColor} w-16 h-16 rounded-xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                {activity.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {activity.title}
              </h3>
              <p className="text-gray-600">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Activites;