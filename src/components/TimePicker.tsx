import React, { useState } from 'react';
import TimePicker from 'react-time-picker';

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const CustomTimePicker: React.FC<TimePickerProps> = ({ value, onChange, className = '' }) => {
  return (
    <TimePicker onChange={onChange} value={value} className={`time-picker ${className}`} aria-label="time picker" />
  );
};

export default CustomTimePicker;
