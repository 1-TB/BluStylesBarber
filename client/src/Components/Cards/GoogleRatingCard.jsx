import React from 'react'
import Rating from '@mui/material/Rating';
import GoogleIcon from '../../assets/images/google-logo.png';
import { useEffect, useState } from 'react';

export default function GoogleRatingCard() {
  const [googleStoreRating, setGoogleStoreRating] = useState()
  const [totalGoogleUserRating, setTotalGoogleUserRating] = useState()

  useEffect(() => {
    const fetchReviews = async () => {
      const url = `http://localhost:3001/api/reviews`; // Full URL with the server's port
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data) {
          setGoogleStoreRating(data.rating)
          setTotalGoogleUserRating(data.user_ratings_total)
          console.log(data)
        } else {
          console.log('No reviews found');
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="col-span-1 flex flex-col justify-center items-center">
            <div className="w-10 h-10 mb-3">
              <img
                src={GoogleIcon}
                alt="Google icon"
                className="w-full h-full"
              />
            </div>
            <div className="font-bold uppercase">Google</div>
            <div className="font-bold text-6xl">{googleStoreRating || 4.7}</div>
            <Rating value={googleStoreRating || 4.7} precision={0.5} readOnly />
            <div>{totalGoogleUserRating || 179} reviews</div>
          </div>
  )
}
