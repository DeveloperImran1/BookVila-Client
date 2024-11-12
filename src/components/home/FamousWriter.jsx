"use client";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";

const FamousWriter = () => {
  const swiperRef = useRef(null); // Reference to the Swiper component
  const [writers, setWriters] = useState([]);

  useEffect(() => {
    const writersData = [
      {
        _id: "1",
        image: "https://i.postimg.cc/C5ZwRcK7/main-qimg-99eb055ce0df63ce8b7b68ee23e50a4d.webp",
        name: "রবীন্দ্রনাথ ঠাকুর",
      },
      {
        _id: "2",
        image: "https://i.postimg.cc/1zntnRYw/image.jpg",
        name: "জীবনানন্দ দাশ",
      },
      {
        _id: "3",
        image: "https://i.postimg.cc/Lsyj6D3m/image.jpg",
        name: "কাজী নজরুল ইসলাম",
      },
      {
        _id: "4",
        image: "https://i.postimg.cc/CLY5XDb7/image.jpg",
        name: "জয়নুল আবেদিন",
      },
      {
        _id: "5",
        image: "https://i.postimg.cc/4dV4FNdj/image.jpg",
        name: "সুফিয়া কামাল",
      },
    ];

    setWriters(writersData); // Set data in the state
  }, []);

  const prevSlider = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev(); // Go to previous slide
    }
  };

  const nextSlider = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext(); // Go to next slide
    }
  };

  return (
    <div className="container p-8 bg-white my-8 relative">
      <div className="flex justify-between mb-6 font-semibold">
        <h1 className="text-2xl text-gray-600">জনপ্রিয় লেখক</h1>
        <h1>See more</h1>
      </div>

      {/* Swiper for carousel functionality */}
      <Swiper
        ref={swiperRef} // Assign the reference to Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {writers.map((writer) => (
          <SwiperSlide key={writer._id}>
            <div className="rounded-md border-2 p-4 w-full space-y-3 bg-white">
              <figure className="flex justify-center items-center">
                <Image
                  src={writer?.image}
                  alt={writer?.name}
                  width={200}
                  height={200}
                  className="rounded-lg object-cover h-[200px] w-[200px] "
                />
              </figure>
              <h1 className="text-center font-semibold text-gray-700">{writer.name}</h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Arrow left */}
      <button
        onClick={prevSlider}
        className="absolute top-1/2 left-3 z-50 flex justify-center items-center hover:bg-blue-500 bg-slate-200 rounded-full w-8 h-8 group"
      >
        <svg
          className="icon h-6 w-6 fill-black group-hover:fill-white"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"></path>
        </svg>
      </button>

      {/* Arrow right */}
      <button
        onClick={nextSlider}
        className="absolute top-1/2 right-3 z-50 flex justify-center items-center hover:bg-blue-500 bg-slate-200 rounded-full w-8 h-8 group"
      >
        <svg
          className="icon h-6 w-6 fill-black group-hover:fill-white"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          transform="rotate(180)"
        >
          <path d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"></path>
        </svg>
      </button>
    </div>
  );
};

export default FamousWriter;
