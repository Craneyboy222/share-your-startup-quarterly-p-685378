import React from 'react';
import { IconType } from 'react-icons';

interface IconProps {
  Icon: IconType;
  size?: number;
  color?: string;
  ariaLabel?: string;
}

const Icon: React.FC<IconProps> = ({ Icon, size = 24, color = 'currentColor', ariaLabel }) => {
  return (
    <Icon size={size} color={color} aria-label={ariaLabel} />
  );
};

export default Icon;