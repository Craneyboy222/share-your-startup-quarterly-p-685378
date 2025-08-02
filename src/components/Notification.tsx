import React from 'react';
import { AiOutlineBell } from 'react-icons/ai';

interface NotificationProps {
  count: number;
  ariaLabel?: string;
}

const Notification: React.FC<NotificationProps> = ({ count, ariaLabel }) => {
  return (
    <div className="relative">
      <AiOutlineBell className="text-gray-600" aria-label={ariaLabel} />
      {count > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1.5">
          {count}
        </span>
      )}
    </div>
  );
};

export default Notification;