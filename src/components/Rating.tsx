import React, { useState } from 'react';

interface RatingProps {
  maxRating: number;
  currentRating: number;
  onRate: (rating: number) => void;
}

const Rating: React.FC<RatingProps> = ({ maxRating, currentRating, onRate }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseOver = (rating: number) => {
    setHoverRating(rating);
  };

  const handleMouseOut = () => {
    setHoverRating(0);
  };

  return (
    <div className="rating" role="radiogroup" aria-label="Rating">
      {[...Array(maxRating)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={ratingValue} aria-checked={currentRating === ratingValue} aria-label={`Rate ${ratingValue}`} className="cursor-pointer">
            <input
              type="radio"
              value={ratingValue}
              onClick={() => onRate(ratingValue)}
              className="hidden"
            />
            <span
              onMouseOver={() => handleMouseOver(ratingValue)}
              onMouseOut={handleMouseOut}
              className={`p-2 ${
                ratingValue <= (hoverRating || currentRating) ? 'text-yellow-500' : 'text-gray-300'
              }`}
            >
              ★
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default Rating;
