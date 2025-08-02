import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface ReviewProps {
  rating: number;
  maxRating: number;
  ariaLabel?: string;
}

const Review: React.FC<ReviewProps> = ({ rating, maxRating, ariaLabel }) => {
  return (
    <div className="flex" role="img" aria-label={ariaLabel}>
      {Array.from({ length: maxRating }, (_, index) => (
        index < rating ? (
          <AiFillStar key={index} className="text-yellow-500" />
        ) : (
          <AiOutlineStar key={index} className="text-gray-300" />
        )
      ))}
    </div>
  );
};

export default Review;