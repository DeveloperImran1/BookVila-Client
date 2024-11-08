"use client"
import { FaCartShopping } from "react-icons/fa6";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper components
import "swiper/css";
import Link from "next/link";
import Image from "next/image";
import BooksCard from "../books/BookCard";

const BudgetFriendlyBooks = () => {
    
     
    const [userRating, setUserRating] = useState(3);
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


  const books = [
    {
      _id: "1",
      category: "Electronics",
      color: "Black",
      description: "High-quality wireless headphones with noise cancellation.",
      image: "https://www.shutterstock.com/image-vector/3d-wireless-headphones-mockup-set-260nw-2130630635.jpg",
      offer: 20,
      price: 79.99,
      title: "Wireless Headphones",
      totalAvailable: 30,
    },
    {
      _id: "2",
      category: "Home Appliances",
      color: "Silver",
      description: "Energy-efficient smart vacuum cleaner.",
      image: "https://img.drz.lazcdn.com/static/bd/p/70de89e7dfae0fdc030ed5c5006f93d2.jpg_720x720q80.jpg",
      offer: 15,
      price: 199.99,
      title: "Smart Vacuum Cleaner",
      totalAvailable: 15,
    },
    {
      _id: "3",
      category: "Fashion",
      color: "Blue",
      description: "Stylish denim jacket for all occasions.",
      image: "https://www.shutterstock.com/image-vector/3d-wireless-headphones-mockup-set-260nw-2130630635.jpg",
      offer: 10,
      price: 49.99,
      title: "Denim Jacket",
      totalAvailable: 25,
    },
    {
      _id: "4",
      category: "Fitness",
      color: "Green",
      description: "Durable yoga mat for all fitness levels.",
      image: "https://img.drz.lazcdn.com/static/bd/p/70de89e7dfae0fdc030ed5c5006f93d2.jpg_720x720q80.jpg",
      offer: 5,
      price: 29.99,
      title: "Yoga Mat",
      totalAvailable: 50,
    },
    {
      _id: "5",
      category: "book",
      color: "Multi",
      description: "A motivational book for personal growth.",
      image: "https://img.drz.lazcdn.com/static/bd/p/70de89e7dfae0fdc030ed5c5006f93d2.jpg_720x720q80.jpg",
      offer: 25,
      price: 14.99,
      title: "Motivational Book",
      totalAvailable: 100,
    },
  ];
    
    return (
        <div className="container p-8 bg-white relative my-8">
      <div className="flex justify-between mb-6 font-semibold">
        <h1 className="text-2xl text-gray-600">Budget Friendly Books</h1>
        {books && books?.length > 0 && (
          <Link href={`/book/${books[0]._id}`}>
            <h1 className="text-bg-blue underline">See more</h1>
          </Link>
        )}      </div>

      {/* Swiper for carousel functionality */}
      <Swiper
        ref={swiperRef} // Assign the reference to Swiper
        spaceBetween={20}
        slidesPerView={4} // 4 items per view
        breakpoints={{
          640: {
            slidesPerView: 1, // 1 item per view for small screens
          },
          768: {
            slidesPerView: 2, // 2 items per view for medium screens
          },
          1024: {
            slidesPerView: 4, // 4 items per view for large screens
          },
        }}
      >
        {books?.map((book) => (
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
    );
};

export default BudgetFriendlyBooks;