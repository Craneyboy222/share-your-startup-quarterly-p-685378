import React from 'react';
import PropTypes from 'prop-types';

interface MapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  className?: string;
}

const Map: React.FC<MapProps> = ({ latitude, longitude, zoom = 10, className = '' }) => {
  const mapSrc = `https://maps.google.com/maps?q=${latitude},${longitude}&z=${zoom}&output=embed`;
  return (
    <iframe src={mapSrc} className={`w-full h-64 ${className}`} aria-label="map">
      This map cannot be displayed.
    </iframe>
  );
};

Map.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  zoom: PropTypes.number,
  className: PropTypes.string
};

export default Map;
