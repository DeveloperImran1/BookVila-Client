"use client"
import { FaCartShopping } from "react-icons/fa6";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper components
import "swiper/css";
import Link from "next/link";
import Image from "next/image";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import BooksCard from "../books/BookCard";
import BookCardSkelletion from "../books/BookCardSkelletion";

const RecentlyBooks = () => {

  const [userRating, setUserRating] = useState(3);
  const swiperRef = useRef(null); // Reference to the Swiper component
  const axiosPublic = useAxiosPublic()
  const currentDateTime = new Date().getTime() - 2592000000;
  const [books, setBooks] = useState([])

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

  const { booksss = [], isPending } = useQuery({
    queryKey: ["newBooksHome"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/getBooks`);
      const newPublishedBooks = res?.data?.filter(book => new Date(book?.updatedAt).getTime() > currentDateTime)
      console.log("all books", res?.data)
      setBooks(newPublishedBooks)
      return res?.data;
    }
  })


  return (


    <div className="container   ">
      <div className="bg-white my-8 p-4 relative">
        <div className="flex justify-between mb-6 font-semibold ">
          <h1 className="text-2xl text-gray-600">Recently Added Books</h1>
          <Link href={`/new-books`}>
            <h1 className="text-bg-blue underline">See more</h1>
          </Link>
        </div>

        {/* Swiper for carousel functionality */}
        <Swiper
          ref={swiperRef} // Assign the reference to Swiper
          spaceBetween={20}
          slidesPerView={1} // Default to 1 item per view for small screens
          breakpoints={{
            640: {
              slidesPerView: 1, // 1 item per view for screens up to 640px
            },
            768: {
              slidesPerView: 2, // 2 items per view for medium screens
            },
            1024: {
              slidesPerView: 4, // 4 items per view for large screens
            },
          }}
        >
          {isPending ? <div className="container">
            <div className="w-full mx-auto pl-6 py-4 bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {
                [1, 2, 3, 4].map((card, index) => <BookCardSkelletion key={index}></BookCardSkelletion>)
              }
            </div>
          </div> :
          books?.map((book) => (
            <SwiperSlide key={book._id}>
              <BooksCard book={book}></BooksCard>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* arrow left */}
        <button
          onClick={prevSlider}
          className="absolute top-1/2 left-3 z-50 flex justify-center items-center hover:bg-bg-blue bg-slate-200 rounded-full w-8 h-8 md:w-8 md:h-8 group"
        >
          <svg
            className="icon h-6 w-6 fill-black group-hover:fill-white md:h-6 md:w-6"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"></path>
          </svg>
        </button>

        {/* arrow right */}
        <button
          onClick={nextSlider}
          className="absolute top-1/2 right-3 z-50 flex justify-center items-center hover:bg-bg-blue bg-slate-200 rounded-full w-8 h-8 md:w-8 md:h-8 group"
        >
          <svg
            className="icon h-6 w-6 fill-black group-hover:fill-white  md:h-6 md:w-6 "
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

export default RecentlyBooks;