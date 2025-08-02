import React from 'react';
import PropTypes from 'prop-types';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, className = '' }) => {
  return (
    <img src={src} alt={alt} className={`max-w-full h-auto ${className}`} aria-label={alt} />
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Image;
