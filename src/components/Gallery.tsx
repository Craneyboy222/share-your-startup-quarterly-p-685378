import React from 'react';

interface GalleryProps {
  images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <div className="gallery grid grid-cols-3 gap-2" aria-label="Image gallery">
      {images.map((image, index) => (
        <img key={index} src={image} alt={`Gallery image ${index + 1}`} className="w-full h-auto" />
      ))}
    </div>
  );
};

export default Gallery;
