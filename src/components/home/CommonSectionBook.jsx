"use client";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRef, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper components
import BooksCard from "../books/BookCard";
import BookCardSkelletion from "../books/BookCardSkelletion";

const CommonSectionBook = ({ sectionTitle, attribute }) => {
  const [userRating, setUserRating] = useState(3);
  const axiosPublic = useAxiosPublic();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data: attributeBooks = {}, isLoading } = useQuery({
    queryKey: ["attributeBooks", attribute],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/getAttributeBooks?attribute=${attribute}&searchQuery=${search}&page=${page}`
      );
      //  const res = await axiosPublic.get(`/getFeaturedBooks?subCategory=টপ ট্রেন্ডস&searchQuery=Humanity&page=1`);
      return res?.data;
    },
  });
  console.log("attributeBooks", attributeBooks);

  const swiperRef = useRef(null); // Reference to the Swiper component

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
    <div className="container   ">
      <div className="bg-white my-8 p-2 lg:p-4 relative">
        <div className="flex justify-between mb-4 md:mb-6 font-semibold ">
          <h1 className="text-[16px] md:text-[18px]  text-gray-600">
            {sectionTitle}
          </h1>
          {/* {featuredBooks?.books?.length && books?.length > 0 && ( */}
          <Link href={`/attribute/getAttributeBooks?attribute=${attribute}`}>
            <h1 className="text-bg-blue underline">See more</h1>
          </Link>
          {/* // )}{" "} */}
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
            attributeBooks?.books?.map((book) => (
              <SwiperSlide key={book._id}>
                <BooksCard book={book}></BooksCard>
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
      </div>
    </div>
  );
};

export default CommonSectionBook;
