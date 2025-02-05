"use client";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import BookCardSkelletion from "../books/BookCardSkelletion";

const FamousWriter = () => {
  const swiperRef = useRef(null); // Reference to the Swiper component
  const [writers, setWriters] = useState([]);
  const axiosPublic = useAxiosPublic();
  const { data: famousWriters = [], isLoading } = useQuery({
    queryKey: ["writer"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/getAllAuthors`);

      return res?.data;
    },
  });

  console.log("famousWriters", famousWriters);

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
    <section className="container">
      <div className="bg-white my-8 p-2 lg:p-4 relative">
        <div className="flex justify-between mb-6 font-semibold">
          <h1 className="text-[17px] md:text-[20px] lg:text-2xl text-gray-600">
            জনপ্রিয় লেখক
          </h1>
          <Link href={`/featured-books`}>
            <h1 className="text-bg-blue underline">See more</h1>
          </Link>
        </div>

        {/* Swiper for carousel functionality */}
        <Swiper
          ref={swiperRef} // Assign the reference to Swiper
          spaceBetween={20}
          slidesPerView={2} // Default to 1 item per view for small screens
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
        >
          {isLoading ? (
            <div className="container">
              <div className="w-full mx-auto  py-4 bg-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-center gap-4 ">
                {[1, 2, 3, 4].map((card, index) => (
                  <BookCardSkelletion key={index}></BookCardSkelletion>
                ))}
              </div>
            </div>
          ) : (
            famousWriters?.map((writer) => (
              <SwiperSlide key={writer._id}>
                <div className=" rounded-md border-2 p-2 md:p-3 lg:p-4 w-full min-h-[230px]  space-y-3 bg-white flex flex-col justify-between">
                  <figure className="flex justify-center items-center">
                    <Image
                      src={writer?.photo}
                      alt={writer?.name[1]}
                      width={200}
                      height={200}
                      className="rounded-lg object-cover h-[140px]  w-[200px] "
                    />
                  </figure>
                  <h1 className="text-center">
                    <Link
                      href={`/writer/${writer?.authorID}`}
                      className="text-center w-full font-semibold text-gray-700 hover:underline"
                    >
                      {writer.name[1]}
                    </Link>
                  </h1>
                </div>
              </SwiperSlide>
            ))
          )}
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
    </section>
  );
};

export default FamousWriter;
