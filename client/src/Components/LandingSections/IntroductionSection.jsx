import React from 'react'
import IntroPhoto from '../../assets/images/blustyles_cut_02.jpg'

export default function IntroductionSection({ cutsRef }) {
  return (
    <section className='min-h-screen bg-[#001528] w-full md:flex md:h-[100vh] pb-4 md:pb-0'>
      {/* Image Section */}
      <div className='h-[50vh] w-full md:w-1/2 md:h-full'>
        <img 
          src={IntroPhoto} 
          alt="Cool guy #2 cutting hair" 
          className='object-cover h-full w-full brightness-90'
        />
      </div>

      {/* Content Section */}
      <div className='flex justify-center items-center w-full md:w-1/2 md:h-full px-4 md:px-8 lg:px-12'>
        <div className="flex flex-col space-y-6 md:space-y-8 justify-center items-center md:items-start w-full max-w-[600px]">
          <div className="pt-5 text-blue-400 uppercase tracking-[0.1em] text-lg md:text-2xl"
               style={{ fontFamily: "Teko" }}>
            Introducing
          </div>

          <h4 className='text-white text-5xl sm:text-6xl lg:text-7xl tracking-wide'
              style={{ 
                fontFamily: "Splash",
                textShadow: '0 6px 4px rgba(63, 105, 183, 0.8)'
              }}>
            BluStyles<br/>Barbershop
          </h4>

          <p className='text-gray-400 text-base sm:text-lg lg:text-xl text-center md:text-left'
             style={{ fontFamily: "Abel", letterSpacing: "0.02em" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt laudantium nisi laborum molestias aperiam consequatur blanditiis in dolore esse. Numquam unde, ratione obcaecati magni reiciendis enim assumenda eaque molestiae debitis.
            Obcaecati optio accusantium, animi inventore aperiam non nihil vel hic nesciunt? Saepe voluptas, sunt nemo ipsa iusto odit, accusantium vitae laborum tenetur qui soluta recusandae totam neque, itaque dolore beatae.
          </p>
         
          <button 
            className="group relative overflow-hidden border border-white/40 px-12 py-3 text-lg uppercase tracking-[0.1em] text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm w-full md:w-auto"
            style={{ fontFamily: "Teko" }}
            onClick={() => {
              if (cutsRef?.current) {
                cutsRef.current.scrollIntoView({
                  behavior: 'smooth',
                })
              }
            }}
          >
            The Cuts
          </button>
        </div>
      </div>
    </section>
  );
}
