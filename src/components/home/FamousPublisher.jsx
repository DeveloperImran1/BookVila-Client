"use client";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import BookCardSkelletion from "../books/BookCardSkelletion";
import CommonSectionForTitleAndSeeMore from "./CommonSectionForTitleAndSeeMore";

const FamousPublisher = () => {
  const swiperRef = useRef(null); // Reference to the Swiper component
  const axiosPublic = useAxiosPublic();

  const { data: famousPublisher = [], isLoading } = useQuery({
    queryKey: ["publisher"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/getPublications`);

      return res?.data;
    },
  });

  console.log("famousPublisher", famousPublisher);

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
    <CommonSectionForTitleAndSeeMore
      title={"জনপ্রিয় প্রকাশনী"}
      seeMorePathName={"/featured-books"}
    >
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
          famousPublisher.map((publisher) => (
            <SwiperSlide key={publisher?._id}>
              <div className="rounded-md border-2 p-2 md:p-3 lg:p-4 w-full min-h-[230px]  space-y-3 bg-white flex flex-col justify-between">
                <figure className="flex justify-center items-center">
                  <Image
                    src={
                      publisher?.photo ||
                      "https://pathokpoint.com/_next/image?url=%2Fdefault%2Fpublisher.png&w=1920&q=75"
                    }
                    alt={publisher?.name?.[1]}
                    width={200}
                    height={200}
                    className="rounded-lg  h-[150px] md:h-[180px] lg:h-[210px] w-[140px] md:w-[170px] lg:w-[200px]"
                  />
                </figure>
                <h1 className="text-center">
                  <Link
                    href={`/publisher/${publisher?._id}`}
                    className="text-center text-sm w-full font-semibold text-gray-700 hover:underline"
                  >
                    {publisher?.name?.[1]}
                  </Link>
                </h1>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>

      {/* arrow left */}
      <button
        onClick={prevSlider}
        className="absolute top-1/2 left-3 z-50 flex justify-center items-center hover:bg-bg-blue bg-slate-200 rounded-full w-6 h-6 md:w-8 md:h-8 group"
      >
        <svg
          className="icon h-4 md:h-6 w-4 md:w-6 fill-black group-hover:fill-white "
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"></path>
        </svg>
      </button>

      {/* arrow right */}
      <button
        onClick={nextSlider}
        className="absolute top-1/2 right-3 z-50 flex justify-center items-center hover:bg-bg-blue bg-slate-200 rounded-full w-6 h-6 md:w-8 md:h-8 group"
      >
        <svg
          className="icon h-4 md:h-6 w-4 md:w-6 fill-black group-hover:fill-white  "
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          transform="rotate(180)"
        >
          <path d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"></path>
        </svg>
      </button>
    </CommonSectionForTitleAndSeeMore>
  );
};

export default FamousPublisher;
