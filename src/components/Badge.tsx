import React from 'react';
import classNames from 'classnames';

interface BadgeProps {
  text: string;
  type?: 'success' | 'error' | 'warning' | 'info';
}

const Badge: React.FC<BadgeProps> = ({ text, type = 'info' }) => {
  const badgeClass = classNames('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', {
    'bg-green-100 text-green-800': type === 'success',
    'bg-red-100 text-red-800': type === 'error',
    'bg-yellow-100 text-yellow-800': type === 'warning',
    'bg-blue-100 text-blue-800': type === 'info',
  });

  return <span className={badgeClass}>{text}</span>;
};

export default Badge;
