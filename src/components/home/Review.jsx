import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import img from 'public/asssets/images/premium_photo-1673014202191-7fc46fdbc38c.avif'
import Image from 'next/image';

const Review = () => {
    return (
        <div className='my-10 container mx-auto'>
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper "
        >
         
          <SwiperSlide>
            
          <div
      className="hero h-[700px] border-8 border-sky-500"
      style={{
      backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
     }}>
        
       <div className="hero-overlay bg-opacity-90"></div>
       
        <div className="hero-content text-neutral-content text-center">
          
        <div className='flex'>
          
            <div>
            <Image 
            className='rounded-full'
          src={img}
          ></Image>
            </div>
        <div className="max-w-md">
       <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
      <p className="mb-5">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
    </div>
        </div>
  </div>
</div>
          </SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide>
        </Swiper>
      </div>
    );
};

export default Review;