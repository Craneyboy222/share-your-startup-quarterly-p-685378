import React from 'react';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  ariaLabel?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'medium', ariaLabel }) => {
  const sizeClass = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-16 w-16',
  }[size];

  return (
    <div
      className={`border-t-2 border-b-2 border-gray-900 rounded-full animate-spin ${sizeClass}`}
      role="status"
      aria-label={ariaLabel}
    />
  );
};

export default Spinner;