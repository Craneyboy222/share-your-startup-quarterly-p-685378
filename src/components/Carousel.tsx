import React, { useState } from 'react';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel" aria-live="polite">
      <button onClick={prevSlide} aria-label="Previous slide">&lt;</button>
      <img src={images[currentIndex]} alt="Carousel slide" className="w-full" />
      <button onClick={nextSlide} aria-label="Next slide">&gt;</button>
    </div>
  );
};

export default Carousel;
