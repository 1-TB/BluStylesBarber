import React from 'react'
import { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';


// Temporary hardcoded reviews array for Blu Styles Barbershop
// Note: This data structure is currently used to avoid frequent API calls to Google Places.
// Consider moving this data fetching to the backend with caching or periodic updates
// to keep the reviews more current and scalable as the application grows.

const reviews = [
  {
    "author_name": "Ash Heaston",
    "author_url": "https://www.google.com/maps/contrib/103766647881005881549/reviews",
    "language": "en",
    "original_language": "en",
    "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjWoL_14pD5A7emoIsMUcHophmtpQB56fZEjlH881qEPM2n_7c4=s128-c0x00000000-cc-rp-mo",
    "rating": 5,
    "relative_time_description": "3 weeks ago",
    "text": "Been to a couple places in town and I told him the my son has ptsd from getting bad hair cuts. Well let’s just say we finally found a barber who actually can cut hair. My son is smiling and feeling confident! Thank you",
    "time": 1728776213,
    "translated": false
  },
  {
    "author_name": "Ger Hang",
    "author_url": "https://www.google.com/maps/contrib/105840642411828217208/reviews",
    "language": "en",
    "original_language": "en",
    "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjUb8bwyNm8qoAUYYwmjyWdgeKrOMsxHndBpCdtzb0ILrt2wWYJY=s128-c0x00000000-cc-rp-mo-ba3",
    "rating": 5,
    "relative_time_description": "a year ago",
    "text": "Really nice and welcoming experience. Love the diversity at this barber ❤️ my bf was really happy about his haircut. The barber did a great job! All of the other barber are really talented. I'm really proud I took my bf here.",
    "time": 1686592061,
    "translated": false
  },
  {
    "author_name": "Jeremy Staley",
    "author_url": "https://www.google.com/maps/contrib/105375894012763046443/reviews",
    "language": "en",
    "original_language": "en",
    "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocJrwCKp3KCc9N3zSWMzBgOC1ObGmU1aXOXVgLKrhzqj3jqmYg=s128-c0x00000000-cc-rp-mo",
    "rating": 5,
    "relative_time_description": "2 months ago",
    "text": "Rod was so friendly and patient with my kid I enjoyed the service here very much we will be back",
    "time": 1724365731,
    "translated": false
  },
  {
    "author_name": "Squirrel",
    "author_url": "https://www.google.com/maps/contrib/100980416523681039907/reviews",
    "language": "en",
    "original_language": "en",
    "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjXc9BIdj7O4zPTmHHZ9dgDSYGi9MI-Iu2vSd24j9q6r3SSjMGY=s128-c0x00000000-cc-rp-mo-ba3",
    "rating": 5,
    "relative_time_description": "7 months ago",
    "text": "I have been to other barbers and this place and all of the barbers there always go above and beyond. I get the best hair cuts of my life. Plus the atmosphere is quiet, very relaxed, and even when you have to wait for awhile the chairs they have there are the big overstuffed and super soft ones that make waiting enjoyable too.\n\nSupport this business. They work hard and deserve it.\n\nAnd update. Just went back. It's still amazing.",
    "time": 1711667167,
    "translated": false
  },
  {
    "author_name": "Nicole Lyn",
    "author_url": "https://www.google.com/maps/contrib/111115455886552643776/reviews",
    "language": "en",
    "original_language": "en",
    "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjUEVMvpkTBnZotyJrUEP4y5HBeGS7MZjzAUXoOjqVX7__as0b2t=s128-c0x00000000-cc-rp-mo-ba4",
    "rating": 5,
    "relative_time_description": "3 years ago",
    "text": "I wished that I could give them 10 stars!!! Extremely professional and friendly!!! Patient with children, caring, and kind!! Top notch Barbers, in ethnic hair and designs!!! Classic Barbershop!!! Treat *Yourself!!!! Their experience speaks volumes!!! They are always happy to serve their customers!!!",
    "time": 1612625999,
    "translated": false
  }
  // Move to backend?
];


export default function ReviewCarousel() {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  useEffect(() => {
    if (reviews.length > 0) {
      const interval = setInterval(() => {
        setCurrentReviewIndex((prevIndex) =>
          (prevIndex + 1) % reviews.length
        );
      }, 7000); // Change review every 7 seconds

      return () => clearInterval(interval);
    }
  }, []);

  const currentReview = reviews[currentReviewIndex]; // Get the current review based on the index

  return (
    <div className="col-span-2 row-start-2 xl:row-start-1 xl:col-start-2 xl:col-span-1 bg-gray-800 rounded shadow p-4 flex flex-col items-center space-y-4 relative max-h-80 min-h-72 pt-10 justify-start mt-16 sm:mt-8">
      <div className="flex flex-col justify-center items-center space-y-3 w-full">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
          <img
            src={currentReview.profile_photo_url}
            alt={`${currentReview.author_name}'s profile`}
            className="w-20 h-20 rounded-full object-cover shadow-sm"
          />
        </div>
        <Rating value={currentReview.rating} readOnly />
        <div className="overflow-y-auto max-h-36 w-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <p className="text-gray-400 text-center px-2 font-abel font-semibold">
            {currentReview.text}
          </p>
        </div>
        <h5 className="font-bold text-white uppercase font-teko text-xl">
          {currentReview.author_name}
        </h5>
      </div>
    </div>
  );
}