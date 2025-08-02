import React from 'react';
import PropTypes from 'prop-types';

interface VideoProps {
  src: string;
  controls?: boolean;
  autoPlay?: boolean;
  className?: string;
}

const Video: React.FC<VideoProps> = ({ src, controls = true, autoPlay = false, className = '' }) => {
  return (
    <video src={src} controls={controls} autoPlay={autoPlay} className={`w-full ${className}`} aria-label="video player">
      Your browser does not support the video tag.
    </video>
  );
};

Video.propTypes = {
  src: PropTypes.string.isRequired,
  controls: PropTypes.bool,
  autoPlay: PropTypes.bool,
  className: PropTypes.string
};

export default Video;
