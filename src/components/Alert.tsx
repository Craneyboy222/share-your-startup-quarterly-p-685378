import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import classNames from 'classnames';

interface AlertProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  ariaLabel?: string;
}

const Alert: React.FC<AlertProps> = ({ type, message, ariaLabel }) => {
  const alertClass = classNames('px-4 py-3 rounded relative', {
    'bg-green-100 border-green-500 text-green-700': type === 'success',
    'bg-red-100 border-red-500 text-red-700': type === 'error',
    'bg-blue-100 border-blue-500 text-blue-700': type === 'info',
    'bg-yellow-100 border-yellow-500 text-yellow-700': type === 'warning',
  });

  return (
    <div className={alertClass} role="alert" aria-label={ariaLabel}>
      <span className="block sm:inline">
        <AiOutlineInfoCircle className="inline-block mr-2" />{message}
      </span>
    </div>
  );
};

export default Alert;