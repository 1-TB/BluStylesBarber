import { ZapIcon } from 'lucide-react';
import FeaturedCutCard from '../Components/FeaturedCutCard';
import ScrollChevron from '../Components/ScrollChevron';
import { useRef, useState, useEffect } from 'react'
import tempCutImg from '../assets/images/blustyles_cuttype_01.jpg'

const FeaturedCuts = () => {
  const scrollContainerRef = useRef(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  {/* Featured cuts data */}
  const featuredCuts = [
    { 
      id: 1, 
      title: 'Cool Cut #1', 
      price: '68.75', 
      time: '45',
      summary: 'Classic fade with textured top, perfect for a modern professional look',
      image: tempCutImg 
    },
    { 
      id: 2, 
      title: 'Cool Cut #2', 
      price: '33.75', 
      time: '30',
      summary: 'Clean taper fade with line up, ideal for a sharp, crisp appearance',
      image: tempCutImg 
    },
    { 
      id: 3, 
      title: 'Cool Cut #3', 
      price: '28.75', 
      time: '35',
      summary: 'Low fade with cropped top, great for easy maintenance and style',
      image: tempCutImg 
    },
    { 
      id: 4, 
      title: 'Cool Cut #4', 
      price: '12.75', 
      time: '25',
      summary: 'High and tight with subtle fade, perfect for a clean, professional look',
      image: tempCutImg 
    },
    { 
        id: 5, 
        title: 'Cool Cut #5', 
        price: '12.75', 
        time: '25',
        summary: 'High and tight with subtle fade, perfect for a clean, professional look',
        image: tempCutImg 
    }
  ];

  {/* Handles left/right Scroll */}
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollWidth = container.scrollWidth - container.clientWidth;
      const percentage = (container.scrollLeft / scrollWidth) * 100;
      setScrollPercentage(percentage);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-800 p-8 md:p-16 content-center">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-slate-300 mb-4">
            FEATURED CUTS
          </h2>
          <ZapIcon className="w-8 h-8 mx-auto mb-2 text-blue-400 animate-pulse" />
        </div>

        {/* Scroll Container */}
        <div className="relative">
          <ScrollChevron direction="left" onClick={() => scroll('left')} />
          <ScrollChevron direction="right" onClick={() => scroll('right')} />

          {/* Scrollable Content */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide flex gap-6 px-4 py-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredCuts.map((cut) => (
              <FeaturedCutCard
                key={cut.id}
                image={cut.image}
                title={cut.title}
                price={cut.price}
                time={cut.time}
                summary={cut.summary}
              />
            ))}
          </div>

          {/* Continuous Scroll Indicator */}
        <div className="mt-4 h-1 bg-gray-200 rounded-full">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${scrollPercentage}%` }}
          />
        </div>

        </div>
      </div>
    </div>
  );
};

export default FeaturedCuts;