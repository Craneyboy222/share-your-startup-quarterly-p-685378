import React from 'react';

interface ProgressProps {
  value: number;
  max: number;
  ariaLabel?: string;
}

const Progress: React.FC<ProgressProps> = ({ value, max, ariaLabel }) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={ariaLabel}
      />
    </div>
  );
};

export default Progress;