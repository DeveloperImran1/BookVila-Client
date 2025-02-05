"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import Image from "next/image";

import useAxiosPublic from "@/hooks/useAxiosPublic";

const Review = () => {
  const axiosPublic = useAxiosPublic();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axiosPublic.get(`/getAllReviews`).then((res) => {
      console.log(res);
      setReviews(res?.data);
    });
  }, []);
  console.log(reviews);

  return (
    <>
      <div className="my-6 md:my-8 lg:my-10 h-full container mx-auto ">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {reviews?.map((review, index) => (
            <SwiperSlide key={index}>
              <div
                className="hero h-full "
                style={{
                  backgroundImage:
                    "url(https://i.ibb.co.com/YcXWz0w/Untitled-design-16-1.png)",
                }}
              >
                <div className="hero-overlay h-full  bg-opacity-80  bg-bg-blue"></div>

                <div className=" text-center my-[20px] md:my-[35px] lg:my-[45px] w-[93%]  flex flex-col items-center justify-center bg-white bg-opacity-85 text-black  rounded-md  ">
                  <h3 className=" bg-[#fb7310] mt-[15px] md:mt-[25px] lg:mt-[30px] rounded-full w-[100px] min-h-3"></h3>
                  <h3 className="text-[30px] md:text-[39px] lg:text-[46px] font-bold text-center">
                    Testimonials
                  </h3>

                  <div className="flex flex-col lg:flex-row justify-between items-center my-[20px] lg:my-[30px] ">
                    <div className="relative  ">
                      <div className="border-[15px] md:border-[25px] lg:border-[32px] inline-block rounded-full relative border-secondary z-0">
                        <div className="absolute -top-[20px] md:-top-[50px] -left-[30px] md:-left-[60px] z-20 w-[70px] md:w-[170px] lg:w-[200px] h-[70px] md:h-[170px] lg:h-[200px] rounded-full bg-secondary shadow-2xl"></div>
                        <div className="relative z-50">
                          <Image
                            height={676}
                            width={1200}
                            alt="reviewer"
                            className="rounded-full w-[70px] md:w-[170px] lg:w-[200px] h-[70px] md:h-[170px] lg:h-[200px] border-[7px] border-white"
                            src={
                              review?.userImage ||
                              "https://i.postimg.cc/xTmfVLXn/download-black-male-user-profile-icon-png-701751695035033bwdeymrpov.png"
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="max-w-md ">
                      <div className="relative">
                        <Image
                          className="hidden md:absolute left-[-20px] md:left-[-33px] lg:left-[-40px] top-[-30px] md:top-[-37] lg:top-[-50px] h-[100px] w-[50px] "
                          src="https://i.ibb.co.com/3cyCFkB/Comma.png"
                          alt="cuttation"
                          height={44}
                          width={500}
                        ></Image>
                        <Image
                          className="hidden md:absolute right-[-20px] md:right-[-33px] lg:right-[-40px] bottom-[-30px] md:bottom-[-37] lg:bottom-[-50px] rotate-180 h-[100px] w-[50px] "
                          src="https://i.ibb.co.com/3cyCFkB/Comma.png"
                          alt="cuttation"
                          height={44}
                          width={500}
                        ></Image>
                        <p className="mb-3 md:mb-5 text-[17px] md:text-[22px] lg:text-[27px] text-gray-500 ">
                          {review?.comment?.slice(0, 60) ||
                            "Nice book with a comprehensive approach!"}
                        </p>
                      </div>
                      <p>
                        <div className="rating rating-lg ">
                          <input
                            type="radio"
                            name="rating-9"
                            className="rating-hidden bg-orange-500"
                          />
                          <input
                            type="radio"
                            name="rating-9"
                            className="mask mask-star-2 bg-orange-500"
                          />
                          <input
                            type="radio"
                            name="rating-9"
                            className="mask mask-star-2 bg-orange-500"
                            defaultChecked
                          />
                          <input
                            type="radio"
                            name="rating-9"
                            className="mask mask-star-2 bg-orange-500"
                          />
                          <input
                            type="radio"
                            name="rating-9"
                            className="mask mask-star-2 bg-orange-500"
                          />
                          <input
                            type="radio"
                            name="rating-9"
                            className="mask mask-star-2 bg-orange-500"
                          />
                        </div>
                      </p>
                      <h1 className="text-[22px] md:text-[30px] lg:text-4xl pb-7 font-bold">
                        {review?.user || "Anonymus"}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Review;
