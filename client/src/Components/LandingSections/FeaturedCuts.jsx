import { ZapIcon } from 'lucide-react';
import FeaturedCutCard from '../Cards/FeaturedCutCard';
import ScrollChevron from '../MSC/ScrollChevron';
import { useRef, useState, useEffect } from 'react';

const FeaturedCuts = ({ cutsRef }) => {
  const scrollContainerRef = useRef(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [featuredCuts, setFeaturedCuts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkForCuts = () => {
      const storedCuts = localStorage.getItem('cuts');
      if (storedCuts) {
        const cuts = JSON.parse(storedCuts);
        const specialtyCuts = cuts.filter(cut => cut.specialty);
        setFeaturedCuts(specialtyCuts);
        setIsLoading(false);
      } else {
        setTimeout(checkForCuts, 500);
      }
    };

    checkForCuts();
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
    <div className="w-full min-h-screen bg-[#001528] p-8 md:p-16 content-center" ref={cutsRef}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
        <h2 
              className="text-5xl md:text-6xl lg:text-7xl text-white uppercase"
              style={{ 
                fontFamily: "Teko",
                textShadow: '0 5px 2px rgba(63, 105, 183, 0.2)'
              }}
            >
              Featured Cuts
            </h2>
            <ZapIcon className="w-8 h-8 text-blue-400 mx-auto" />
        </div>

        {/* Scroll Container */}
        <div className="relative">
          {isLoading ? (
            <div className="text-center text-white">Loading featured cuts...</div>
          ) : featuredCuts.length > 0 ? (
            <>
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
            </>
          ) : (
            <div className="text-center text-white">No featured cuts available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCuts;