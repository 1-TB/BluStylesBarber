import { ZapIcon } from 'lucide-react';
import FeaturedCutCard from '../Cards/FeaturedCutCard';
import ScrollChevron from '../MSC/ScrollChevron';
import { useRef, useState, useEffect } from 'react';

const FeaturedCuts = ({ cutsRef }) => {
  const scrollContainerRef = useRef(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [featuredCuts, setFeaturedCuts] = useState([]);

  useEffect(() => {
    const storedCuts = localStorage.getItem('cuts');
    if (storedCuts) {
      const cuts = JSON.parse(storedCuts);
      const specialtyCuts = cuts.filter(cut => cut.specialty); // Filter for specialty cuts
      setFeaturedCuts(specialtyCuts);
    }
  }, []);

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
    <div className="w-full min-h-screen bg-slate-800 p-8 md:p-16 content-center" ref={cutsRef}>
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
                key={cut._id} // Assuming _id is used as the unique identifier
                image={cut.picture} // Assuming picture is the correct field for the image
                title={cut.name} // Assuming name is the correct field for the title
                price={cut.price} // Assuming price is available in the cut object
                time={cut.time} // Assuming time is available in the cut object
                summary={cut.description} // Assuming description is the correct field for the summary
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