import React from 'react';

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <ul className="divide-y divide-gray-200">
      {events.map((event, index) => (
        <li key={index} className="py-4 flex space-x-3">
          <div className="flex-shrink-0">
            <span className="inline-block h-8 w-8 rounded-full bg-gray-500 text-white flex items-center justify-center">
              {event.time}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{event.title}</p>
            <p className="text-sm text-gray-500">{event.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Timeline;
