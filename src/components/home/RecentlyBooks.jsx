"use client";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper components
import BooksCard from "../books/BookCard";
import BookCardSkelletion from "../books/BookCardSkelletion";
import CommonSectionForTitleAndSeeMore from "./CommonSectionForTitleAndSeeMore";

const RecentlyBooks = () => {
  const [userRating, setUserRating] = useState(3);
  const swiperRef = useRef(null); // Reference to the Swiper component
  const axiosPublic = useAxiosPublic();
  const currentDateTime = new Date().getTime() - 2592000000;
  const [books, setBooks] = useState([]);

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
      const newPublishedBooks = res?.data?.filter(
        (book) => new Date(book?.updatedAt).getTime() > currentDateTime
      );
      console.log("all books", res?.data);
      setBooks(newPublishedBooks);
      return res?.data;
    },
  });

  return (
    <CommonSectionForTitleAndSeeMore
      title={"নতুন সংযোজন বই"}
      seeMorePathName={"/new-books"}
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
        {isPending ? (
          <div className="container">
            <div className="w-full mx-auto  py-4 bg-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-center gap-4 ">
              {[1, 2, 3, 4].map((card, index) => (
                <BookCardSkelletion key={index}></BookCardSkelletion>
              ))}
            </div>
          </div>
        ) : (
          books?.map((book) => (
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
    </CommonSectionForTitleAndSeeMore>
  );
};

export default RecentlyBooks;
