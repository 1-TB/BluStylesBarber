import React from 'react'
import IntroPhoto from '../../assets/images/blustyles_cut_02.jpg'

export default function IntroductionSection() {
  return (
    <section className='min-h-screen bg-[#262E3C] w-full md:flex md:h-[100vh] pb-4 md:pb-0'>
      {/* Image Section */}
      <div className='h-[50vh] w-full md:w-1/2 md:h-full mb-4'>
        <img src={IntroPhoto} alt="Cool guy #2 cutting hair" className='object-cover h-full w-full' />
      </div>

      {/* Content Section */}
      <div className='flex justify-center items-center w-full md:w-1/2 md:h-full'>
        <div className="flex flex-col space-y-3 justify-center items-center md:items-start md:max-w-[380px] lg:max-w-[420px] xl:max-w-[560px] w-full">
          <div className="text-xl font-semibold font-abel text-[#296fbd] sm:text-2xl lg:text-3xl">
            Introducing
          </div>
          <h4 className='text-[#8e9ebc] font-teko text-5xl sm:text-6xl lg:text-7xl  md:max-w-[360px] lg:max-w-[440px]'>
            BluStyles Barbershop
          </h4>
          <p className='text-[#6d7382] text-center max-w-96 lg:max-w-[440px] xl:max-w-[500px] md:text-start text-sm sm:text-base xl:text-xl leading-tight pb-2'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt laudantium nisi laborum molestias aperiam consequatur blanditiis in dolore esse. Numquam unde, ratione obcaecati magni reiciendis enim assumenda eaque molestiae debitis.
            Obcaecati optio accusantium, animi inventore aperiam non nihil vel hic nesciunt? Saepe voluptas, sunt nemo ipsa iusto odit, accusantium vitae laborum tenetur qui soluta recusandae totam neque, itaque dolore beatae.
          </p>
          
          <button class="group relative inline-flex items-center overflow-hidden rounded border-2 border-[#9DAED0] text-lg font-medium text-white hover:bg-gray-50 hover:text-white w-[45%] px-4 py-1 max-w-52">
            <span class="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-[#4B5A72] opacity-100 transition-all group-hover:top-0 group-hover:h-full"></span>
            <span class="ease absolute right-0 flex h-10 w-10 translate-x-full transform items-center justify-start duration-500 group-hover:-translate-x-2">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <span class="relative transform duration-700 group-hover:-translate-x-3">The Cuts</span>
          </button>
        </div>
      </div>
    </section>
  );
}
