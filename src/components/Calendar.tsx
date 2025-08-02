import React from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';

interface CalendarProps {
  onChange: (date: Date) => void;
  value: Date;
  className?: string;
}

const Calendar: React.FC<CalendarProps> = ({ onChange, value, className = '' }) => {
  return (
    <div className={`calendar-container ${className}`} aria-label="calendar">
      <ReactCalendar onChange={onChange} value={value} />
    </div>
  );
};

export default Calendar;
