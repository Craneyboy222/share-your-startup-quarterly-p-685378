import React from 'react';

interface DividerProps {
  orientation: 'horizontal' | 'vertical';
  ariaLabel?: string;
}

const Divider: React.FC<DividerProps> = ({ orientation, ariaLabel }) => {
  return (
    <div
      className={orientation === 'horizontal' ? 'border-t border-gray-300' : 'border-l border-gray-300 h-full'}
      role="separator"
      aria-label={ariaLabel}
    />
  );
};

export default Divider;