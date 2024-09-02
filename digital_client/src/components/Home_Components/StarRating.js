
import React from 'react';

const Star = ({ filled, onClick }) => {
  return (
    <span onClick={onClick} style={{ cursor: 'pointer', color: filled ? 'gold' : 'gray', fontSize:"30px" }}>
      ★
    </span>
  );
};

const StarRating = ({ rating, setRating }) => {
  return (
    <div style={{width:"50px"}}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          filled={star <= rating}
          onClick={() => setRating(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;
