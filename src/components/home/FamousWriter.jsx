"use client";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Link from "next/link";

const FamousWriter = () => {
  const swiperRef = useRef(null); // Reference to the Swiper component
  const [writers, setWriters] = useState([]);
  const axiosPublic = useAxiosPublic();
  const { data: famousWriters = [], isLoading } = useQuery({
    queryKey: ["writer"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/getAllAuthors`);

      return res?.data;
    }
  })

  console.log("famousWriters", famousWriters)


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
        {famousWriters?.map((writer) => (
          <SwiperSlide key={writer._id}>
            <div className="rounded-md border-2 p-4 w-full space-y-3 bg-white">
              <figure className="flex justify-center items-center">
                <Image
                  src={writer?.photo}
                  alt={writer?.name[1]}
                  width={200}
                  height={200}
                  className="rounded-lg object-cover h-[200px] w-[200px] "
                />
              </figure>
              <h1 className="text-center">
                <Link href={`/writer/${writer?.authorID}`} className="text-center w-full font-semibold text-gray-700 hover:underline">{writer.name[1]}</Link>
              </h1>
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
