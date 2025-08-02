import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
  selected: Date;
  onChange: (date: Date) => void;
  className?: string;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({ selected, onChange, className = '' }) => {
  return (
    <DatePicker selected={selected} onChange={onChange} className={`date-picker ${className}`} aria-label="date picker" />
  );
};

export default CustomDatePicker;
