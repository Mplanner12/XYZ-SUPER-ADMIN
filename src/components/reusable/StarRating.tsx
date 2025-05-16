import React, { useState } from 'react';

interface StarProps {
  filled: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const Star: React.FC<StarProps> = ({ filled, onClick, onMouseEnter, onMouseLeave }) => {
  return (
    <span
      style={{ cursor: onClick ? 'pointer' : 'default', color: filled ? '#ffbf00' : '#e0e0e0', fontSize: '24px' }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      ★
    </span>
  );
};

interface StarRatingProps {
  rating: number;
  onRate?: (rating: number) => void;
  totalStars?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRate, totalStars = 5 }) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleRate = (rate: number) => {
    if (onRate) {
      onRate(rate);
    }
  };

  return (
    <div style={{ display: 'inline-block' }}>
      {Array.from({ length: totalStars }, (_, index) => {
        const starNumber = index + 1;
        const isFilled = hoverRating !== null ? starNumber <= hoverRating : starNumber <= rating;

        return (
          <Star
            key={index}
            filled={isFilled}
            onClick={onRate ? () => handleRate(starNumber) : undefined}
            onMouseEnter={() => setHoverRating(starNumber)}
            onMouseLeave={() => setHoverRating(null)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
