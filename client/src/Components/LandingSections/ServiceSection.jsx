import React from 'react';
import { Zap } from 'lucide-react';
import { motion } from "framer-motion";
import RazorBlade from '../../assets/images/razor-barber.png'
import HairClippers from '../../assets/images/hair-clipper.png'
import Scissors from '../../assets/images/scissors.png'
import HairComb from '../../assets/images/comb-hair.png'
const services = [
  {
    id: 1,
    title: "HAIRCUT STYLES",
    description: "Get a fresh look with our wide range of haircut styles...",
    icon: <img src={HairClippers} alt="Hair Clippers" width={32} height={32} />
  },
  {
    id: 2,
    title: "SHAVING", 
    description: "Experience a smooth and comfortable shave...",
    icon: <img src={RazorBlade} alt="Razor Blade" width={32} height={32} />
  },
  {
    id: 3,
    title: "TRIMMING",
    description: "Maintain a neat and tidy appearance...", 
    icon: <img src={Scissors} alt="Scissors" width={32} height={32} />
  },
  {
    id: 4,
    title: "STYLING",
    description: "Let our expert stylists create a look that's uniquely yours...",
    icon: <img src={HairComb} alt="Hair Comb" width={32} height={32} />
  }
 ];

  const containerVariants = {
    hidden: {opacity: 0},
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }


const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function ServiceSection({ pricingRef }) {
  return (
    <section className='min-h-screen bg-[#9DAED0] w-full py-16 md:py-24 content-center'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col items-center space-y-16'>
          {/* Header */}
          <div className='text-center space-y-4'>
            <h2 
              className="text-5xl md:text-6xl lg:text-7xl text-[#001528] uppercase"
              style={{ 
                fontFamily: "Teko",
                textShadow: '0 5px 2px rgba(63, 105, 183, 0.2)'
              }}
            >
              Our Services
            </h2>
            <Zap className="w-8 h-8 text-white mx-auto" />
            <p 
              className="text-2xl text-[#001528] uppercase tracking-[0.1em]"
              style={{ fontFamily: "Teko" }}
            >
              Find it all at BluStyles
            </p>
          </div>

          {/* Services Grid */}
          <div 
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl'
          >
            {services.map((service) => (
              <motion.div 
                key={service.id} 
                className="bg-[#001528] p-8 flex flex-col items-center text-center space-y-6 group"
                initial= {{opacity: 0, y:50}}
                whileInView={{ opacity: 1, y:0}}
                viewport={{once:true, amount: 0.2}}
                transition={{duration: 0.5}}
              >
                {service.icon}
                
                <h4 
                  className="text-3xl text-white uppercase tracking-wide"
                  style={{ fontFamily: "Teko" }}
                >
                  {service.title}
                </h4>
                
                <p 
                  className="text-gray-400 text-lg"
                  style={{ fontFamily: "Teko", letterSpacing: "0.05em" }}
                >
                  {service.description}
                </p>

                <button
                  className="text-blue-400 uppercase text-lg tracking-wide hover:text-white transition-colors duration-300"
                  style={{ fontFamily: "Teko" }}
                  onClick={() => {
                    if (pricingRef?.current) {
                      pricingRef.current.scrollIntoView({
                        behavior: 'smooth',
                      });
                    }
                  }}
                >
                  View Pricing →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}