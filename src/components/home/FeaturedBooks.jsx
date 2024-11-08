"use client"
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper components
import "swiper/css"; 

const FeaturedBooks = () => {
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
        <div className="p-8 bg-white relative my-8">
      <div className="flex justify-between mb-6 font-semibold">
        <h1 className="text-2xl text-gray-600">Featured book</h1>
        {books && books.length > 0 && (
              <Link to={`/book/${books[0]._id}`}>
                <h1 className="text-[#f2b00a] underline">See more</h1>
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
            <Link to={`/book/${book._id}`}>
              <div className="rounded-md border-2 p-4 w-full space-y-3 relative bg-white h-[400px]">
              <div className="clit-element absolute top-[-12px] left-0 z-50">
                        <p className="-rotate-[50deg] text-white top-3 left-1 font-semibold absolute">New</p>
                    </div>
                <div className="hover:scale-110 my-transition cursor-pointer flex flex-col justify-center items-center">
                  <img
                    src={
                      book.image ||
                      "https://i.ibb.co/x6jR8ny/Link-prod16-png.png"
                    }
                    alt={book.title}
                    className="w-[180px] h-[150px] my-4 rounded-md"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#ff4d6d] px-3 py-1 text-xs text-white">
                    {book.offer}% Off
                  </span>
                  <span className="rounded-full hidden md:block bg-[#ff4d6d] px-3 py-1 text-xs text-white">
                    Best Seller
                  </span>
                </div>
                <h1 className="text-[15px] font-semibold">{book.title}</h1>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      onClick={() => setUserRating(star)}
                      className="w-4 cursor-pointer"
                      viewBox="0 0 24 24"
                      fill="#94a3b8"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                        fill={star <= userRating ? "#f2b00a" : "#94a3b8"}
                      />
                    </svg>
                  ))}
                  <span>{`(08)`}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <h1 className="text-[17px] font-semibold">${book.price}</h1>
                    <del className="text-[17px] font-semibold text-gray-600">
                      ${book.price - 10}
                    </del>
                  </div>
                  <div className="hover:scale-150 my-transition cursor-pointer">
                    <FaCartShopping size={22} className="text-[#ff4d6d]" />
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

     {/* arrow left */}
<button
  onClick={prevSlider}
  className="absolute top-1/2 left-3 z-50 flex justify-center items-center hover:bg-[#f2b00a] bg-slate-200 rounded-full w-8 h-8 md:w-8 md:h-8"
>
  <svg
    className="icon h-6 w-6 fill-black md:h-6 md:w-6"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"></path>
  </svg>
</button>

{/* arrow right */}
<button
  onClick={nextSlider}
  className="absolute top-1/2 right-3 z-50 flex justify-center items-center hover:bg-[#f2b00a] bg-slate-200 rounded-full w-8 h-8 md:w-8 md:h-8"
>
  <svg
    className="icon h-6 w-6 fill-black  md:h-6 md:w-6 "
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

export default FeaturedBooks;