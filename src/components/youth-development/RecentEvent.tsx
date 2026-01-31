'use client';

import { Calendar, Clock, MapPin, Users } from 'lucide-react';

const events = [
  {
    title: 'ক্যারিয়ার টক – বরিশাল বিশ্ববিদ্যালয়',
    date: '১৫ নভেম্বর ২০২৪',
    location: 'বরিশাল',
    attendees: '250+ অংশগ্রহণকারী',
  },
  {
    title: 'ক্যারিয়ার টক – বরিশাল বিশ্ববিদ্যালয়',
    date: '১৫ নভেম্বর ২০২৪',
    location: 'বরিশাল',
    attendees: '250+ অংশগ্রহণকারী',
  },
  {
    title: 'ক্যারিয়ার টক – বরিশাল বিশ্ববিদ্যালয়',
    date: '১৫ নভেম্বর ২০২৪',
    location: 'বরিশাল',
    attendees: '250+ অংশগ্রহণকারী',
  },
];

export default function RecentEvent() {
  return (
    <section className="py-20 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Recent Events
            </h2>
            <p className="text-gray-500">সাম্প্রতিক কার্যক্রম</p>
          </div>

          {/* Events List */}
          <div className="flex flex-col gap-4">
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-6 hover:shadow-md transition-shadow"
              >
                {/* Calendar Icon */}
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center shrink-0">
                  <Calendar className="w-8 h-8 text-white" />
                </div>

                {/* Event Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-purple-600 mb-2">
                    {event.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
